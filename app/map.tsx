import { Location } from '@/types';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Audio } from 'expo-av';

// Directly require all sound files
const locations: Location[] = [
  { title: 'Southern Water Tribe', latitude: -75.250973, longitude: -0.071389, sound: require('../assets/sounds/boxed-like-a-fish-101soundboards.mp3') },
  { title: 'Ba Sing Se', latitude: 39.9042, longitude: 116.4074, sound: require('../assets/sounds/do-nothing-101soundboards.mp3') },
  { title: 'Fire Nation Capital', latitude: 35.6895, longitude: 139.6917, sound: require('../assets/sounds/hard-to-get-101soundboards.mp3') },
  { title: 'Northern Water Tribe', latitude: 78.2232, longitude: 15.6469, sound: require('../assets/sounds/it-do-be-like-that-101soundboards.mp3') },
  { title: 'Omashu', latitude: 29.9792, longitude: 31.1342, sound: require('../assets/sounds/it-is-called-the-sea-of-chi-uncle-iroh-101soundboards.mp3') },
  { title: 'Kyoshi Island', latitude: 34.6937, longitude: 135.5023, sound: require('../assets/sounds/luffy-101soundboards.mp3') },
  { title: 'Western Air Temple', latitude: 27.1751, longitude: 78.0421, sound: require('../assets/sounds/one-piece-is-real-101soundboards.mp3') },
  { title: 'Eastern Air Temple', latitude: 28.3949, longitude: 84.1240, sound: require('../assets/sounds/penguin-avatar-thelastairbender-penguin-cuteanimals-101soundboards.mp3') },
  { title: 'Southern Air Temple', latitude: 27.9881, longitude: 86.9250, sound: require('../assets/sounds/treat-yourself-101soundboards.mp3') },
  { title: 'Northern Air Temple', latitude: 45.4215, longitude: -75.6972, sound: require('../assets/sounds/water-earth-fire-air-long-ago-batangas-thrived-as-a-land-of-natural-beauty-rich-culture-and-strong-traditions-home-to-brave-warriors-skilled-fishermen-and-proud-batanguenos-its-people-101soundboards.mp3') },
];

const Map = () => {
  const [currentSound, setCurrentSound] = useState<any>(null);

  const playSound = async (soundFile: any): Promise<void> => {
    try {
      if (currentSound) {
        await currentSound.stopAsync();  
        await currentSound.unloadAsync();  
      }

      const { sound } = await Audio.Sound.createAsync(
        soundFile,
        { shouldPlay: true }
      );
      
      setCurrentSound(sound); 

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          sound.unloadAsync(); 
          setCurrentSound(null); 
        }
      });
    } catch (error) {
      console.error('Error loading or playing sound:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            onPress={() => playSound(location.sound)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
