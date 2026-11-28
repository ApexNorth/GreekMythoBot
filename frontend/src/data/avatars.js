/**
 * The 6 profile pictures a player can pick from (assets/avatars/owl.webp ...).
 * Players choose one of these, never an uploaded photo. The pages use the id (e.g. 'owl');
 * the database stores a number in user.avatar (0 = owl ... 5 = phoenix), so convert at the server.
 */
const avatarPictures = import.meta.glob('../assets/avatars/*.webp', {eager: true, import: 'default'});

// New players start with the owl (user.avatar DEFAULT 0 in Alex's database)
export const DEFAULT_AVATAR = 'owl';

// number = what the database stores for this picture. Don't change these once players have saved them.
export const avatars = [
  {id: 'owl', number: 0, name: 'Owl'},
  {id: 'pegasus', number: 1, name: 'Pegasus'},
  {id: 'cerberus-pup', number: 2, name: 'Cerberus pup'},
  {id: 'dolphin', number: 3, name: 'Dolphin'},
  {id: 'hero-helmet', number: 4, name: 'Hero helmet'},
  {id: 'phoenix', number: 5, name: 'Phoenix'},
];

/** True if the id is one of the 6 pictures (anything else from the server is ignored, NFR-12). */
export function isAvatar(id){
  return avatars.some((avatar) => avatar.id === id);
}

/** The database number for a picture id, e.g. 'phoenix' -> 5 (the owl's 0 if the id isn't known). */
export function avatarToNumber(id){
  return (avatars.find((avatar) => avatar.id === id) ?? avatars[0]).number;
}

/** The picture id for a number from the database, e.g. 5 -> 'phoenix'. Anything else gives the owl (NFR-12). */
export function avatarFromNumber(number){
  return avatars.find((avatar) => avatar.number === number)?.id ?? DEFAULT_AVATAR;
}

/** The picture for an avatar id, or the default picture if the id isn't one of the 6. */
export function avatarPicture(id){
  return avatarPictures[`../assets/avatars/${isAvatar(id) ? id : DEFAULT_AVATAR}.webp`];
}

/** The picture's name for an avatar id, e.g. 'cerberus-pup' -> 'Cerberus pup'. */
export function avatarName(id){
  return avatars.find((avatar) => avatar.id === (isAvatar(id) ? id : DEFAULT_AVATAR)).name;
}
