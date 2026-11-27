// Gift pictures (assets/gifts/worn-copper-coin.webp ...), one for each of Alex's gifts.
// Shared by Profile (the player's gifts) and the Quiz (the gift a player wins).
const pictures = import.meta.glob('../assets/gifts/*.webp', {eager: true, import: 'default'});

/** Turns a gift name into its picture's file name, e.g. "Worn Copper Coin" -> "worn-copper-coin". */
function toFileName(name){
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** The picture for a gift, or undefined if there isn't one (pages show a gift box instead). */
export function giftPicture(name){
  return pictures[`../assets/gifts/${toFileName(name)}.webp`];
}
