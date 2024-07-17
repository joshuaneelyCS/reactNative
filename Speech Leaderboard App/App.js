import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';


export default function App() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {}
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    // sends to the server
    const file1 = {uri: 'assets/Shrek.wav'};
    const file2 = {uri: 'assets/Shrek.wav'};

    compareAudioFiles(file1, file2)

    setRecordings(allRecordings);
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Recording #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([])
  }

  const [sound, setSound] = React.useState();
  
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Shrek.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

// -- TODO -- Function to compare audio files
const compareAudioFiles = async (file1, file2) => {
  const formData = new FormData();

  formData.append('file1', {
    uri: file1.uri,
    type: 'audio/wav',
    name: 'file1.wav',
  });
  formData.append('file2', {
    uri: file2.uri,
    type: 'audio/wav',
    name: 'file2.wav',
  });

  try {
    // Sending request to the server
    const response = await axios.post(
      'https://joshuaneely.pythonanywhere.com/compare', 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Handling the response
    handleComparisonResult(response.data);
  } catch (error) {
    console.error('Error comparing audio files:', error);
  }
};

// -- TODO -- Function to handle the comparison result
const handleComparisonResult = (data) => {
  if (data && data.score !== undefined) {
    setResult(data.score);
  } else {
    console.error('Invalid response:', data);
  }
};

  return (
    <View style={styles.container}>
      <Text>"No, layers! Onions have layers."</Text>
      <Button title='Play Sound' onPress={playSound}/>
      <Button title={recording ? 'Stop Recording' :  'Start Recording'} onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
      <Button title={recordings.length > 0 ? 'Clear Recordings' : ''} onPress={clearRecordings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40
  },
  fill: {
    flex: 1,
    margin: 15
  }
});