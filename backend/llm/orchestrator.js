const {openai, model, sendMessage} = require('./apiConnection');
const {buildPrompt} = require('./promptBuilder');
const {saveUserMessage, saveGodMessage} = require('./dbConnection')
const {getFallbackResponse} = require('./placeholderFallback')

// Gets the message from server.js

// sends userID, godID and message to dbConnection
// dbConnection saves conversation history
// dbConnection gets - gods name, personality, favour score, previous 5 messages

// sends information to promptBuilder

// promptBuilder returns prompt

// Sends to openai using apiConnection.js

// response received, send to replyCheck

// replyCheck true = send to server.js, update db
// replyCheck false = fallbackPlaceholder.js


// message recieved:

const fakeData = {
    userID: 123,
    godID: 1,
    message: "Tell me about your greatest battle.",
    gift: 0

};


// this is the built message from dbConnection
const promptData = {
    godName: 'Zeus',
    godDesc: 'King of the gods and ruler of the sky and thunder.',
    godPersonality: 'Aloof, Almighty',
    godDomain: 'Sky & Thunder',

    favourScore: 100,
    previousMessages: [
        { role: 'user', content: 'How are you?' },
        { role: 'assistant', content: "I'm good." },
        { role: 'user', content: 'Who are you?' },
        { role: 'assistant', content: 'I am Zeus.' },
        { role: 'user', content: 'What are you the king of?' },
        { role: 'assistant', content: 'I am the king of Olympus.' }
    ],
    newMessage: 'What do you think of Posiedon?'
}


async function runPrompt(promptData) {
    if (promptData.newMessage.trim() === '' || promptData.newMessage.length > 200) {
        // fallback here
    }
    else {
        const completedPrompt = buildPrompt(promptData);
        const returnedMessage = await sendMessage(completedPrompt)
        console.log(returnedMessage.output_text)
    }
}

runPrompt(promptData);

// console.log(completedPrompt)