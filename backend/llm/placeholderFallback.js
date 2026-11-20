// This file stores and sends backup responses if any failures or timeouts occur with the LLM


const fallbackResponses = {
  "aphrodite": [
    "Oh, darling, it seems something has interrupted us. Send me another message and we shall continue.",
    "Even love encounters obstacles. Try speaking to me again, my dear.",
    "Do not let this silence trouble your heart. Send me another message, darling."
  ],

  "ares": [
    "The silence is unacceptable! Send your message again, warrior!",
    "Do not surrender so easily. Try speaking to me once more!",
    "Our conversation is not over. Send another message and let us continue!"
  ],

  "athena": [
    "A moment of reflection is required. Please send your message again, mortal.",
    "Wisdom requires patience. Try presenting your question to me once more.",
    "The answer remains elusive. Send another message and I shall reconsider."
  ],

  "hermes": [
    "Well, that message seems to have gone astray! Send it again and I'll get right on it!",
    "Looks like your words got lost along the way. Try sending them once more!",
    "A little delay on my end! Send me another message and we'll be back on track."
  ],

  "poseidon": [
    "Your words have been lost beneath the waves. Send another message and try again.",
    "The seas are restless today. Speak to me once more, mortal.",
    "A disturbance in the waters has interrupted us. Send your message again."
  ],

  "zeus": [
    "Even the king of Olympus encounters interruptions. Speak again, mortal!",
    "The heavens have fallen silent for a moment. Send your message once more.",
    "My attention has been diverted. Try again, and I shall hear your words."
  ],

  "atlas": [
    "The weight of the heavens distracts me. Send your message again, mortal.",
    "Even I must occasionally pause beneath the weight of the world. Try speaking again.",
    "Do not lose patience. Send another message and I shall answer."
  ],

  "hyperion": [
    "The light has momentarily faded. Send your message again and let us continue.",
    "Even the sun encounters darkness. Speak to me once more, mortal.",
    "The dawn will return. Send another message and try again."
  ],

  "kronos": [
    "Time is not yours to command, mortal. Send your message again.",
    "This moment has slipped through the ages. Try speaking to me once more.",
    "Even time encounters interruptions. Send another message and we shall continue."
  ],

  "prometheus": [
    "Even great discoveries encounter obstacles. Send your message again and persevere.",
    "The flame of knowledge still burns. Try asking me once more.",
    "Do not abandon your curiosity. Send another message and seek your answer."
  ],

  "rhea": [
    "Patience, child. Send your message again and we shall continue.",
    "Do not let this silence trouble you. Speak to me once more.",
    "All things come in their own time. Try sending your message again."
  ],

  "themis": [
    "Justice requires patience. Please submit your message once more.",
    "Order must be restored before we can continue. Try speaking again, mortal.",
    "Your matter deserves attention. Send your message again and I shall listen."
  ],

  "chaos": [
    "From the void comes silence. Send another message and disturb the nothingness.",
    "All things emerge from chaos. Try speaking again and see what follows.",
    "The void has swallowed your words. Send them again, if you dare."
  ],

  "chronos": [
    "Time flows endlessly, yet this moment has stalled. Send your message again.",
    "Your words have been lost in the passage of time. Try speaking once more.",
    "Time waits for no one, mortal. Send another message and continue."
  ],

  "gaia": [
    "The earth is quiet for now. Send your message again when you are ready.",
    "All things grow in their own time. Speak to me once more, child.",
    "Even nature must pause. Try sending your message again."
  ],

  "nyx": [
    "The night holds its secrets for now. Send another message and seek the darkness.",
    "Silence is the language of the night. Speak to me once more, mortal.",
    "Do not fear the quiet. Send your message again and let the night listen."
  ],

  "tartarus": [
    "Your words have fallen into the abyss. Send them again if you wish to be heard.",
    "The depths remain silent. Try reaching me with another message.",
    "The abyss has swallowed your words. Speak again, if you dare."
  ],

  "uranus": [
    "Your words have not reached the heavens. Send your message again, mortal.",
    "Even the endless sky has moments of silence. Speak to me once more.",
    "The stars remain quiet for now. Try sending another message."
  ]
};



// Function to choose a random response
function getFallbackResponse(god) {
    const responses = fallbackResponses[god.toLowerCase()];

    if (!responses || responses.length === 0) {
        return 'The Gods are unable to respond. Please try again.';
    }

    const randomIndex = Math.floor(Math.random() * responses.length)
    return responses[randomIndex]
}

module.exports = {getFallbackResponse};