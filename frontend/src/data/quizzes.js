/**
 * Quiz questions for each god, by the id in the web address (/quiz/zeus).
 * era picks the background (Nora's SelectionParallax). Each question has 3 choices;
 * answer is the number of the right one (0, 1 or 2) and fact is shown after answering.
 * TODO BACKEND: GET /api/quiz?god=zeus should send these (without the answers) so players
 * can't look them up in the browser; the server marks them (Nick's quiz tables).
 */
const quizzes = {
  aphrodite: {
    era: 'Olympians',
    questions: [
      {
        question: 'What is Aphrodite the goddess of?',
        choices: ['War', 'Love and beauty', 'The harvest'],
        answer: 1,
        fact: 'The Romans called her Venus, and the planet Venus is named after her.',
      },
      {
        question: 'How was Aphrodite born?',
        choices: ['From the foam of the sea', "From Zeus's head", 'From a golden egg'],
        answer: 0,
        fact: 'Many stories say she came ashore on the island of Cyprus. A famous painting shows her standing on a giant seashell.',
      },
      {
        question: 'Which bird is special to Aphrodite?',
        choices: ['The eagle', 'The owl', 'The dove'],
        answer: 2,
        fact: 'Doves were her birds, and she was often shown with roses too.',
      },
      {
        question: 'What prize did Aphrodite win in a contest that led to the Trojan War?',
        choices: ['A golden apple', 'A silver crown', 'A magic sword'],
        answer: 0,
        fact: 'Paris, a prince of Troy, gave her the apple after she promised him Helen, the most beautiful woman in the world.',
      },
    ],
  },

  athena: {
    era: 'Olympians',
    questions: [
      {
        question: 'What is Athena the goddess of?',
        choices: ['Wisdom and clever planning', 'The sea', 'The Underworld'],
        answer: 0,
        fact: 'She was also the goddess of crafts like weaving, and of war won with clever plans.',
      },
      {
        question: 'How was Athena born?',
        choices: ['She hatched from an egg', "She sprang from Zeus's head", 'She rose from the sea'],
        answer: 1,
        fact: 'She came out fully grown and wearing armour, after Zeus had a terrible headache.',
      },
      {
        question: 'Which city is named after Athena?',
        choices: ['Sparta', 'Troy', 'Athens'],
        answer: 2,
        fact: "She won the city by giving its people an olive tree. Poseidon's gift was a saltwater spring.",
      },
      {
        question: "Which animal is Athena's symbol?",
        choices: ['The owl', 'The swan', 'The raven'],
        answer: 0,
        fact: 'Because of her, the owl became a symbol of wisdom. Coins from ancient Athens had an owl on them.',
      },
    ],
  },

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

  poseidon: {
    era: 'Olympians',
    questions: [
      {
        question: 'What is Poseidon the god of?',
        choices: ['The sky', 'The sea', 'The sun'],
        answer: 1,
        fact: 'He was also the god of earthquakes and horses. The Romans called him Neptune.',
      },
      {
        question: 'What does Poseidon carry?',
        choices: ['A bow and arrows', 'A thunderbolt', 'A trident'],
        answer: 2,
        fact: "A trident is a spear with three points. The Cyclopes made it for him, just as they made Zeus's thunderbolts.",
      },
      {
        question: 'Which land animal is Poseidon linked with?',
        choices: ['The horse', 'The cat', 'The bear'],
        answer: 0,
        fact: 'Some stories say he made the first horse, and he rode a chariot pulled by horses across the waves.',
      },
      {
        question: 'Which hero did Poseidon stop from getting home for ten years?',
        choices: ['Heracles', 'Odysseus', 'Perseus'],
        answer: 1,
        fact: "Odysseus blinded Poseidon's son, the Cyclops Polyphemus, so Poseidon sent storms to wreck his ships.",
      },
    ],
  },
  atlas: {
    era: 'Titans',
    questions: [
      {
        question: 'What punishment did Zeus give Atlas?',
        choices: ['Holding up the sky', 'Rolling a rock uphill forever', 'Being chained to a mountain'],
        answer: 0,
        fact: 'Rolling a rock uphill was the punishment of a king called Sisyphus, and Prometheus was the one chained to a mountain.',
      },
      {
        question: 'Which side did Atlas fight on in the war between the Titans and the gods?',
        choices: ['The Olympian gods', 'The Titans', 'Neither side'],
        answer: 1,
        fact: 'He led the Titans in battle, which is why Zeus gave him such a heavy punishment.',
      },
      {
        question: 'In famous statues, what does Atlas carry on his shoulders?',
        choices: ['A mountain', 'A giant globe of the sky', 'A ship'],
        answer: 1,
        fact: 'The Farnese Atlas, a statue almost 2,000 years old, shows him holding the sky as a globe covered in stars.',
      },
      {
        question: 'Which hero tricked Atlas into taking the sky back?',
        choices: ['Heracles', 'Perseus', 'Jason'],
        answer: 0,
        fact: 'Atlas fetched the golden apples of the Hesperides for Heracles, who then tricked him into holding the sky again.',
      },
    ],
  },

  hyperion: {
    era: 'Titans',
    questions: [
      {
        question: 'What is Hyperion the Titan of?',
        choices: ['The sea', 'Heavenly light', 'Sleep'],
        answer: 1,
        fact: 'His name means "the one who goes above", like the sun crossing the sky.',
      },
      {
        question: "Who are Hyperion's children?",
        choices: ['The Sun, the Moon and the Dawn', 'Apollo and Artemis', 'The nine Muses'],
        answer: 0,
        fact: 'Their names are Helios (the Sun), Selene (the Moon) and Eos (the Dawn).',
      },
      {
        question: "Who were Hyperion's parents?",
        choices: ['Kronos and Rhea', 'Zeus and Hera', 'Gaia and Ouranos'],
        answer: 2,
        fact: 'Like all twelve Titans, he was a child of the Earth (Gaia) and the Sky (Ouranos).',
      },
      {
        question: 'Who was Hyperion married to?',
        choices: ['Theia', 'Rhea', 'Hera'],
        answer: 0,
        fact: 'Theia was the Titan goddess of sight and shining light, a perfect match for him.',
      },
    ],
  },

  kronos: {
    era: 'Titans',
    questions: [
      {
        question: 'What did Kronos do to his children?',
        choices: ['Hid them in a cave', 'Swallowed them', 'Sent them across the sea'],
        answer: 1,
        fact: 'A prophecy said one of his children would overthrow him, so he swallowed each one as soon as it was born.',
      },
      {
        question: 'What did Rhea give Kronos to swallow instead of baby Zeus?',
        choices: ['A stone wrapped in cloth', 'A golden apple', 'A loaf of bread'],
        answer: 0,
        fact: 'Years later, Zeus made Kronos cough up the stone and all of his brothers and sisters.',
      },
      {
        question: 'What did Kronos use to overthrow his father Ouranos?',
        choices: ['A trident', 'A bow', 'A sickle'],
        answer: 2,
        fact: 'His mother Gaia made the great sickle and gave it to him.',
      },
      {
        question: 'What did the poet Hesiod call the time when Kronos ruled?',
        choices: ['The Bronze Age', 'The Golden Age', 'The Iron Age'],
        answer: 1,
        fact: 'People in the Golden Age were said to live in peace, without hard work or illness.',
      },
    ],
  },

  prometheus: {
    era: 'Titans',
    questions: [
      {
        question: 'What did Prometheus steal from the gods to give to humans?',
        choices: ['Fire', 'Gold', 'Ambrosia'],
        answer: 0,
        fact: 'He hid the fire inside a hollow fennel stalk to carry it down to people.',
      },
      {
        question: 'How did Zeus punish Prometheus?',
        choices: ['He turned him to stone', 'He chained him to a mountain, where an eagle visited every day', 'He sent him to the bottom of the sea'],
        answer: 1,
        fact: 'After many years, the hero Heracles shot the eagle and set Prometheus free.',
      },
      {
        question: 'What does the name Prometheus mean?',
        choices: ['Fire-bringer', 'Forethought', 'Strength'],
        answer: 1,
        fact: "His brother's name, Epimetheus, means \"afterthought\", because he always thought too late.",
      },
      {
        question: 'In some myths, what did Prometheus make the first humans from?',
        choices: ['Clay', 'Gold', 'Sea foam'],
        answer: 0,
        fact: 'In those stories, Athena breathed life into the clay figures he shaped.',
      },
    ],
  },

  rhea: {
    era: 'Titans',
    questions: [
      {
        question: 'Who is Rhea the mother of?',
        choices: ['The Olympian gods', 'The Cyclopes', 'The Muses'],
        answer: 0,
        fact: 'Her children were Hestia, Demeter, Hera, Hades, Poseidon and Zeus.',
      },
      {
        question: 'Where did Rhea hide baby Zeus?',
        choices: ['Mount Olympus', 'The island of Crete', 'The Underworld'],
        answer: 1,
        fact: "Warriors called the Kouretes clashed their shields so Kronos wouldn't hear the baby cry.",
      },
      {
        question: "Which animals are often shown with Rhea, sometimes pulling her chariot?",
        choices: ['Horses', 'Peacocks', 'Lions'],
        answer: 2,
        fact: 'Lions showed her strength as a powerful mother goddess.',
      },
      {
        question: 'Who was Rhea married to?',
        choices: ['Kronos', 'Ouranos', 'Atlas'],
        answer: 0,
        fact: 'She tricked him into swallowing a stone instead of baby Zeus.',
      },
    ],
  },

  themis: {
    era: 'Titans',
    questions: [
      {
        question: 'What is Themis the goddess of?',
        choices: ['Justice and fair laws', 'War', 'The harvest'],
        answer: 0,
        fact: 'She advised Zeus and helped keep order among the gods.',
      },
      {
        question: 'What does Themis often hold in statues?',
        choices: ['A bow and arrows', 'A pair of scales', 'A flaming torch'],
        answer: 1,
        fact: 'The statues of "Lady Justice" outside courts today come from her. The scales weigh up both sides of an argument.',
      },
      {
        question: 'Which famous oracle did Themis look after before Apollo?',
        choices: ['The oracle at Dodona', 'The oracle at Siwa', 'The oracle at Delphi'],
        answer: 2,
        fact: 'In one story she passed it to her sister Phoebe, who gave it to Apollo as a birthday present.',
      },
      {
        question: 'Which goddesses of the seasons were Themis\'s daughters?',
        choices: ['The Horae', 'The Muses', 'The Graces'],
        answer: 0,
        fact: 'In some stories, the three Fates were her daughters too.',
      },
    ],
  },
};

export default quizzes;
