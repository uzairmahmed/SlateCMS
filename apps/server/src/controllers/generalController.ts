import { Request, Response } from 'express';
import { createChatMessage, filterByQuery } from './utilityfunctions';

export const filterAndAnswer = async (req: Request, res: Response) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const searchResults = await filterByQuery(query);

        const content = searchResults.map(result => {
            if (result.type === 'course' && 'name' in result.content && 'description' in result.content) {
                return `Course: ${result.content.name || 'Untitled'} - ${result.content.description || 'No description'}`;
            }

            if (result.type === 'content' && 'title' in result.content && 'document' in result.content) {
                return `Content: ${result.content.title} - ${result.content.document}`;
            }

            if (result.type === 'announcement' && 'title' in result.content && 'message' in result.content) {
                return `Announcement: ${result.content.title} - ${result.content.message}`;
            }

            if (result.type === 'discussionThread' && 'title' in result.content && 'message' in result.content) {
                return `Discussion Thread: ${result.content.title || 'Untitled'} - ${result.content.message || 'No message'}`;
            }

            if (result.type === 'discussionReply' && 'uid' in result.content && 'message' in result.content) {
                return `Discussion Reply: ${result.content.uid || 'No UID'} - ${result.content.message || 'No message'}`;
            }

            return 'Unknown content';
        }).join('\n\n');

        const response = await createChatMessage(content, query)

        res.status(200).json(response);

    } catch (error) {
        console.error('Error during search and answer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};