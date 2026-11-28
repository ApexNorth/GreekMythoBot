// need to check favour scores


function buildSystemPrompt(godName, godDescription, godDomain, godPersonality, favourScore) {
    return `
    You are a ${godName} talking to a 12 - 16 year old human.

    You are the ${godDescription}

    Your domain is ${godDomain}.

    Your personality traits are: ${godPersonality}.

    Stay in character throughout the conversation.

    Your current relationship favour score with this human is ${favourScore} out of 100.

    Use this score to influence how warmly or coldly you interact.

    Responses are 1 - 3 sentences long, no more than 200 characters.
    `;
};


function buildConversationHistory(previousMessages) {
    return previousMessages.map(message => ({
        role: message.role,
        content: message.content
    }));
}


function buildPrompt (promptData) {
    const systemPrompt = buildSystemPrompt(promptData.godName, promptData.godPersonality, promptData.favourScore);
    const conversationHistory = buildConversationHistory(promptData.previousMessages);

    return {
        instructions: systemPrompt,

        input: [
            ...conversationHistory,
            {
                role: 'user',
                content: `Latest message: ${promptData.newMessage}`
            }
        ]
    };
}


module.exports = {
    buildSystemPrompt,
    buildConversationHistory,
    buildPrompt
};