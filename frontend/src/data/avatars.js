/**
 * The 6 profile pictures a player can pick from (assets/avatars/owl.webp ...).
 * Players choose one of these; only its id (e.g. 'owl') is saved, never an uploaded photo.
 */
const avatarPictures = import.meta.glob('../assets/avatars/*.webp', {eager: true, import: 'default'});

// TODO BACKEND: new players start with this picture (needs an avatar column in the user table)
export const DEFAULT_AVATAR = 'owl';

export const avatars = [
  {id: 'owl', name: 'Owl'},
  {id: 'pegasus', name: 'Pegasus'},
  {id: 'cerberus-pup', name: 'Cerberus pup'},
  {id: 'dolphin', name: 'Dolphin'},
  {id: 'hero-helmet', name: 'Hero helmet'},
  {id: 'phoenix', name: 'Phoenix'},
];

/** True if the id is one of the 6 pictures (anything else from the server is ignored, NFR-12). */
export function isAvatar(id){
  return avatars.some((avatar) => avatar.id === id);
}

/** The picture for an avatar id, or the default picture if the id isn't one of the 6. */
export function avatarPicture(id){
  return avatarPictures[`../assets/avatars/${isAvatar(id) ? id : DEFAULT_AVATAR}.webp`];
}

/** The picture's name for an avatar id, e.g. 'cerberus-pup' -> 'Cerberus pup'. */
export function avatarName(id){
  return avatars.find((avatar) => avatar.id === (isAvatar(id) ? id : DEFAULT_AVATAR)).name;
}
