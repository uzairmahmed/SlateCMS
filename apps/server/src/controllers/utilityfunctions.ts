import { Request, Response } from 'express';
import axios from 'axios';
import OpenAI from 'openai';

import { Course } from '../models/courseModels';
import { Content } from '../models/contentModels';
import { DiscussionThread, DiscussionReply } from '../models/discussionModels';
import { Announcement } from '../models/announcementModels';
import { openAIEmbedding } from '../main';

const openai = new OpenAI();

export const createChatMessage = async (content: any, query: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        "role": "system",
        "content": `You are a knowledgeable assistant. Your job is to answer questions by quoting and referring only to the provided content. When answering, if relevant, include direct quotes from the material and cite specific sections or phrases from it.`
      },
      {
        "role": "assistant",
        "content": `Here is the course content you must refer to for answering: ${content}`
      },
      {
        "role": "user",
        "content": query
      }
    ],
  });

  return completion.choices[0].message
}

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

    // Fetch and compare for Content
    const contents = await Content.find();
    const contentResults = contents.map(content => ({
      type: 'content',
      content: content.toObject(),
      similarity: cosineSimilarity(queryEmbedding, content.embedding)
    }));

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
      delete result.content.embedding;
    });

    const sortedResults = filteredResults.sort((a, b) => b.similarity - a.similarity);


    return sortedResults; // Return the sorted search results
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

export const updateEmbeddings = async (req: Request, res: Response) => {
  try {
    // 1. Update all Courses
    const courses = await Course.find();
    for (const course of courses) {
      const embedding = await openAIEmbedding.embedQuery(course.description || '');
      course.embedding = embedding;
      await course.save();
      console.log(`Updated embeddings for course: ${course.name}`);
    }

    // 2. Update all Content
    const contents = await Content.find();
    for (const content of contents) {
      const embedding = await openAIEmbedding.embedQuery(content.document || '');
      content.embedding = embedding;
      await content.save();
      console.log(`Updated embeddings for content: ${content.title}`);
    }

    // 3. Update all DiscussionThreads
    const discussionThreads = await DiscussionThread.find();
    for (const thread of discussionThreads) {
      const embedding = await openAIEmbedding.embedQuery(thread.message || '');
      thread.embedding = embedding;
      await thread.save();
      console.log(`Updated embeddings for discussion thread: ${thread.title}`);
    }

    // 4. Update all DiscussionReplies
    const discussionReplies = await DiscussionReply.find();
    for (const reply of discussionReplies) {
      const embedding = await openAIEmbedding.embedQuery(reply.message || '');
      reply.embedding = embedding;
      await reply.save();
      console.log(`Updated embeddings for discussion reply: ${reply.uid}`);
    }

    // 5. Update all Announcements
    const announcements = await Announcement.find();
    for (const announcement of announcements) {
      const embedding = await openAIEmbedding.embedQuery(announcement.message || '');
      announcement.embedding = embedding;
      await announcement.save();
      console.log(`Updated embeddings for announcement: ${announcement.title}`);
    }

    res.status(200).json("Bulk Update Completed Successfully");

  } catch (error) {
    console.error('Error updating embeddings:', error);
  }
};