
/*README: Place all sounds into the frontend/public/sound
All Sounds MUST be in .mp3, use online/offline software to convert, don't just change the file extension!
*/

// Create a key followed by the exact filename of the sound.
export const sound_lib = {
  "test": "test_sound.mp3"
}

export async function playSound(sound_to_play, bLoop = false) {
  /// Plays the desired sound or warns if the sound cannot be played.
  // param sound_to_play: Sound filename.
  // param bLoop: Should the sound loop?

  if (!(sound_to_play in sound_lib)) {
    console.warn('AUDIO: Key does not exist');
    return;
  }

  const beat = new Audio(`/sound/${sound_lib[sound_to_play]}`);
  beat.loop = bLoop;
  
  try {
    await beat.play();
  } catch (err) {
    console.error("Playback failed:", err);
  }
}





