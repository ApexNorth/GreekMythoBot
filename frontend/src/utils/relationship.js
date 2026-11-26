/**
 * Turns a god's favour (0-100, `favor` in the database) into the words shown on the page.
 * 0 or less means the god is angry and won't talk (Gifts flowchart). No level = not met yet.
 * Used by Profile and Quiz so both pages say the same thing.
 */
export function describeRelationship(level){
  if (level === undefined) {return {word: 'Not met yet', mood: 'new'};}
  if (level <= 0) {return {word: "Angry: won't talk to you", mood: 'angry'};}
  if (level <= 33) {return {word: 'Dislikes you', mood: 'dislike'};}
  if (level <= 66) {return {word: 'Neutral', mood: 'neutral'};}
  return {word: 'Likes you', mood: 'like'};
}
