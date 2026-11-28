require('dotenv').config();

// Loading openai module
const OpenAI = require('openai');

// Creating client with key
const openai = new OpenAI({
    apiKey: process.env.apiKey
});

const model = 'gpt-5.5';


async function sendMessage(completedPrompt) {
    try {
        const response = await openai.responses.create({
            model: model,
            instructions: completedPrompt.instructions,
            input: completedPrompt.input
        });

        return response;
        
    } catch (error) {
        console.error('ChatGPT error:', error.message)
    }
}

module.exports = {
    openai,
    model,
    sendMessage
};