import { Request, Response } from 'express';

import { createChatMessage, createChatMessageWithWeb, filterByQuery } from '../utility';

import { User } from '../models';

export const filterAndAnswer = async (req: Request, res: Response) => {
    try {
        const { userId, query, searchWeb } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query and searchWeb Toggle is required' });
        }

        const searchResults = await filterByQuery(query);

        const content = searchResults.map(result => {
            if (result.type === 'course') {
                return `Course: ${result.content['name']} - ${result.content['description']}`;
            }

            if (result.type === 'content') {
                return `Content: ${result.content['document']} - ${JSON.stringify(result.content['parsedFiles'])} - ${JSON.stringify(result.content['parsedLinks'])}`;
            }

            if (result.type === 'announcement') {
                return `Announcement: ${result.content['title']} - ${result.content['message']}`;
            }

            if (result.type === 'discussionThread') {
                return `Discussion Thread: ${result.content['title']} - ${result.content['message']}`;
            }

            if (result.type === 'discussionReply') {
                return `Discussion Reply: ${result.content['message']}`;
            }

            return 'Unknown content';
        }).join('\n\n');

        const truncatedContent = content.length > 10000 ? content.substring(0, 10000) + '...' : content;

        let response = ""

        if (searchWeb) {
            response = await createChatMessageWithWeb(truncatedContent, query)

        } else {
            response = await createChatMessage(truncatedContent, query)
        }

        const user = await User.findById(userId);
        if (user) {
            user.chatHistory.push({ query, response });
            await user.save();
        }

        res.status(200).json(response);

    } catch (error) {
        console.error('Error during search and answer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};