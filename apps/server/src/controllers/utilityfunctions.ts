import { Request, Response } from 'express';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

import { Course } from '../models/courseModels';
import { Content } from '../models/contentModels';
import { DiscussionThread, DiscussionReply } from '../models/discussionModels';
import { Announcement } from '../models/announcementModels';
import { openAIEmbedding } from '../main';

const openai = new OpenAI();

export const chunkText = (text: string, chunkSize = 3000) => {
    const chunks = [];
    let start = 0;

    while (start < text.length) {
        let end = start + chunkSize;
        if (end > text.length) end = text.length;

        chunks.push(text.slice(start, end));
        start = end;
    }

    return chunks;
};


export const extractTextFromFile = async (file, ext) => {
    const { originalname, buffer } = file;
    let text = '';

    if (ext === 'pdf') {
        const data = await pdfParse(buffer);
        text = data.text;
    } else if (ext === 'docx') {
        const data = await mammoth.extractRawText({ buffer });
        text = data.value;
    } else if (ext === 'txt') {
        text = buffer.toString('utf-8');
    }

    return text;
};


export const scrapeUrl = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let textContent = '';
        $('p, h1, h2, h3').each((i, elem) => {
            textContent += $(elem).text() + ' ';
        });

        // return textContent.trim()
        return cleanText(textContent)
    } catch (error) {
        console.error(`Error scraping URL ${url}`);
        return '';
    }
};

const cleanText = (text: string) => {
    // Remove common unwanted phrases like Sign up Listen Share")
    const unwantedPhrases = [
        'Sign up', 'Sign in', 'Share', 'Help', 'Status', 'About', 'Careers', 'Press', 'Blog', 'Privacy', 'Terms',
        '--', 'Text to speech', 'Teams'
    ];

    let cleanedText = text;
    unwantedPhrases.forEach(phrase => {
        const regex = new RegExp(phrase, 'gi');
        cleanedText = cleanedText.replace(regex, '');
    });

    cleanedText = cleanedText.replace(/\s\s+/g, ' ').trim();

    cleanedText = cleanedText.replace(/[^a-zA-Z0-9., ]/g, '');

    return cleanedText;
};

export const createChatMessage = async (content: any, query: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a knowledgeable assistant. Your job is to answer questions by quoting and referring only to the provided content. Please ensure that your answers are formatted in valid Markdown, using headings (##), bold (**), italics (*), and bullet points where necessary.`,
            },
            {
                role: "assistant",
                content: `Here is the course content you must refer to for answering: ${content}`,
            },
            {
                role: "user",
                content: query,
            },
        ],
    });

    return completion.choices[0].message.content;
};

export const createChatMessageWithWeb = async (content: any, query: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a knowledgeable assistant. Your job is to answer questions by quoting and optionally referring to the provided content. Please ensure that your answers are formatted in valid Markdown, using headings (##), bold (**), italics (*), and bullet points where necessary.`,
            },
            {
                role: "assistant",
                content: `Here is the course content you may refer to for answering: ${content}`,
            },
            {
                role: "user",
                content: query,
            },
        ],
    });

    return completion.choices[0].message.content;
};

export const filterByQuery = async (query: string) => {
    try {
        const queryEmbedding = await openAIEmbedding.embedQuery(query);
        const MIN_SIMILARITY_THRESHOLD = 0.75;

        const courses = await Course.find();

        const courseResults = courses.map(course => ({
            type: 'course',
            content: course.toObject(),
            similarity: cosineSimilarity(queryEmbedding, course.embedding)
        }));

        const contents = await Content.find();
        const contentResults = contents.map(content => {
            const maxSimilarity = Math.max(
                ...content.embeddings.toObject().map(embedding => cosineSimilarity(queryEmbedding, embedding))
            );

            return {
                type: 'content',
                content: content.toObject(),
                similarity: maxSimilarity
            };
        });

        // Fetch and compare for Announcements
        const announcements = await Announcement.find();
        const announcementResults = announcements.map(announcement => ({
            type: 'announcement',
            content: announcement.toObject(),
            similarity: cosineSimilarity(queryEmbedding, announcement.embedding)
        }));

        // Fetch and compare for Discussion Threads
        const discussionThreads = await DiscussionThread.find();
        const threadResults = discussionThreads.map(thread => ({
            type: 'discussionThread',
            content: thread.toObject(),
            similarity: cosineSimilarity(queryEmbedding, thread.embedding)
        }));

        // Fetch and compare for Discussion Replies
        const discussionReplies = await DiscussionReply.find();
        const replyResults = discussionReplies.map(reply => ({
            type: 'discussionReply',
            content: reply.toObject(),
            similarity: cosineSimilarity(queryEmbedding, reply.embedding)
        }));

        // Combine all results
        let allResults = [
            ...courseResults,
            ...contentResults,
            ...announcementResults,
            ...threadResults,
            ...replyResults
        ];

        
        const filteredResults = allResults.filter(result => result.similarity >= MIN_SIMILARITY_THRESHOLD);
        
        filteredResults.forEach(result => {
            result.content['embeddings'] ? delete result.content['embeddings'] : delete result.content['embedding']
        });
        
        const sortedResults = filteredResults.sort((a, b) => b.similarity - a.similarity);
        return sortedResults;
    } catch (error) {
        console.error('Error during search:', error);
        throw new Error('Search error');
    }
};

export const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};