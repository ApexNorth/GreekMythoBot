/**
 * Quiz questions for each god, by the id in the web address (/quiz/zeus).
 * era picks the background (Nora's SelectionParallax). Each question has 3 choices;
 * answer is the number of the right one (0, 1 or 2) and fact is shown after answering.
 * TODO BACKEND: GET /api/quiz?god=zeus should send these (without the answers) so players
 * can't look them up in the browser; the server marks them (Nick's quiz tables).
 */
const quizzes = {
  zeus: {
    era: 'Olympians',
    questions: [
      {
        question: 'What does Zeus throw when he is angry?',
        choices: ['A trident', 'A thunderbolt', 'A golden apple'],
        answer: 1,
        fact: "The Cyclopes made Zeus's thunderbolts as a thank-you for setting them free.",
      },
      {
        question: 'Where do Zeus and the Olympian gods live?',
        choices: ['Mount Olympus', 'The Underworld', 'Atlantis'],
        answer: 0,
        fact: "Mount Olympus is a real place: it's the highest mountain in Greece.",
      },
      {
        question: "Which bird is Zeus's special animal?",
        choices: ['The owl', 'The peacock', 'The eagle'],
        answer: 2,
        fact: 'The owl belongs to Athena, and the peacock to Hera, the wife of Zeus.',
      },
      {
        question: "Who was Zeus's father?",
        choices: ['Poseidon', 'Kronos', 'Hermes'],
        answer: 1,
        fact: 'Kronos swallowed his children, but their mother Rhea hid baby Zeus on the island of Crete.',
      },
    ],
  },

  ares: {
    era: 'Olympians',
    questions: [
      {
        question: 'What is Ares the god of?',
        choices: ['The sea', 'War', 'Wisdom'],
        answer: 1,
        fact: 'Athena was a goddess of war too, but of clever planning. Ares loved the fighting itself.',
      },
      {
        question: "Who are Ares's parents?",
        choices: ['Zeus and Hera', 'Kronos and Rhea', 'Gaia and Ouranos'],
        answer: 0,
        fact: 'Even his own father, Zeus, told Ares he was the god he liked least.',
      },
      {
        question: 'Which animal is often shown with Ares?',
        choices: ['A dove', 'An owl', 'A dog'],
        answer: 2,
        fact: "Dogs and vultures were Ares's animals. The dove belongs to Aphrodite and the owl to Athena.",
      },
      {
        question: 'What did the Romans call Ares?',
        choices: ['Mars', 'Jupiter', 'Neptune'],
        answer: 0,
        fact: 'The red planet Mars is named after him, because red is the colour of war.',
      },
    ],
  },

  hermes: {
    era: 'Olympians',
    questions: [
      {
        question: 'What helps Hermes fly so fast?',
        choices: ['A golden chariot', 'Winged sandals', 'A flying horse'],
        answer: 1,
        fact: 'He often wears a winged hat too, which makes him easy to spot in old paintings.',
      },
      {
        question: "What is Hermes's main job for the gods?",
        choices: ['Making weapons', 'Judging the dead', 'Carrying messages'],
        answer: 2,
        fact: 'Hephaestus makes the weapons. Hermes also guides the souls of the dead to the Underworld.',
      },
      {
        question: 'What did Hermes steal on the day he was born?',
        choices: ["Apollo's cattle", "Zeus's thunderbolt", "Poseidon's trident"],
        answer: 0,
        fact: 'To say sorry, he gave Apollo the first lyre, which he made from a tortoise shell.',
      },
      {
        question: "What is the name of Hermes's staff with two snakes wrapped around it?",
        choices: ['The aegis', 'The caduceus', 'The trident'],
        answer: 1,
        fact: 'The aegis is the shield of Zeus and Athena, and the trident belongs to Poseidon.',
      },
    ],
  },
};

export default quizzes;
