// AudioPlayer.js
import Sound from 'react-native-sound';

const AudioPlayer = {
  sound: null, // Reference to the Sound instance

    // Function to set the volume
  setVolume: (newVolume) => {
    volume = newVolume;
  },

  play: (audioURL) => {
    // Check if a sound is already playing
    if (AudioPlayer.sound && AudioPlayer.sound.isPlaying()) {
      // Stop and release the currently playing sound
      AudioPlayer.sound.stop();
      AudioPlayer.sound.release();
    }

    // Initialize a new Sound instance
    AudioPlayer.sound = new Sound(audioURL, null, (error) => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }

      // Play the loaded sound
      AudioPlayer.sound.play((success) => {
        if (success) {
          console.log('Audio playback successful');
        } else {
          console.log('Audio playback failed');
        }
      });
    });
  },

  stop: () => {
    // Check if a sound is currently playing
    if (AudioPlayer.sound && AudioPlayer.sound.isPlaying()) {
      // Stop and release the currently playing sound
      AudioPlayer.sound.stop();
      AudioPlayer.sound.release();
    }
  },

  mute: () => {
    if (AudioPlayer.sound) {
      AudioPlayer.sound.setVolume(0); // Set volume to 0 to mute the sound
      AudioPlayer.isMuted = true;
    }
  },

  unmute: () => {
    if (AudioPlayer.sound) {
      AudioPlayer.sound.setVolume(1); // Set volume to 1 to unmute the sound
      AudioPlayer.isMuted = false;
    }
  }
};

export default AudioPlayer;
