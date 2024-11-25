import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { DataContext } from '@/datacontext';
import { Character } from '@/types';


const AddCharacterPage = () => {
  const { characters, setCharacters, theme } = useContext(DataContext);

  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [ethnicity, setEthnicity] = useState<string>('');
  const [eyeColor, setEyeColor] = useState<string>('');
  const [hairColor, setHairColor] = useState<string>('');
  const [skinColor, setSkinColor] = useState<string>('');
  const [allies, setAllies] = useState<string>('');
  const [enemies, setEnemies] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [predecessor, setPredecessor] = useState<string>('');
  const [successor, setSuccessor] = useState<string>('');
  const [affiliations, setAffiliations] = useState<string>('');
  const [born, setBorn] = useState<string>('');
  const [dead, setDead] = useState<string>('');
  const [voicedBy, setVoicedBy] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleAddCharacter = () => {
    
    if (isNaN(parseInt(age))) {
      setMessage('Age must be a number!');
      return;
    }
    if (!name || !ethnicity) {
      setMessage('Name and nationality are required!');
      return;
    }
    const newCharacter: Character = {
      id: characters.length + 1,
      name,
      image,
      bio: {
        nationality: '',
        ethnicity: ethnicity,
        ages: age,
        born: born,
        died: dead,
        alternativeNames: ''
      },
      physicalDescription: {
        gender: "male",
        eyeColor,
        hairColor,
        skinColor,
      },
      personalInformation: {
        allies: allies.split(','),
        enemies: enemies.split(','),
        weaponsOfChoice: [],
        fightingStyles: [],
      },
      politicalInformation: {
        profession: [profession],
        position: position || '',
        predecessor: predecessor || '',
        successor: successor || '',
        affiliations: affiliations || '',
      },
      chronologicalInformation: {
        firstAppearance: '',
        lastAppearance: '',
        voicedBy: voicedBy || '',
      },
    };

    fetch('https://sampleapis.assimilate.be/avatar/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDgyODZAYXAuYmUiLCJpYXQiOjE3MzI0NzQ0NDR9.7pS07hulgCyxF7P5DPXOv-Wj6_XJJWhXrW5v_ZmFeqU"
      },
      body: JSON.stringify(newCharacter),
    })
      .then((response) => response.json())
      .then((data) => {
        setCharacters([...characters, newCharacter]);
        setMessage('Character added successfully!');
      })
      .catch((error) => {
        console.error('Error adding character:', error);
        setMessage('Failed to add character.');
      });

    setName('');
    setImage('');
    setEthnicity('');
    setEyeColor('');
    setHairColor('');
    setSkinColor('');
    setAllies('');
    setEnemies('');
    setProfession('');
    setPosition('');
    setPredecessor('');
    setSuccessor('');
    setAffiliations('');
    setBorn('');
    setDead('');
    setVoicedBy('');
    setAge('');
  };

  return (
    <ImageBackground source={theme}
      style={styles.container}
      resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add New Character</Text>

          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter character name"
          />

          <Text>Image URL:</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="Enter image URL"
          />

          <Text>Ethnicity:</Text>
          <TextInput
            style={styles.input}
            value={ethnicity}
            onChangeText={setEthnicity}
            placeholder="Enter nationality"
          />

          <Text>Age:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
          />

          <Text>Eye Color:</Text>
          <TextInput
            style={styles.input}
            value={eyeColor}
            onChangeText={setEyeColor}
            placeholder="Enter eye color"
          />

          <Text>Hair Color:</Text>
          <TextInput
            style={styles.input}
            value={hairColor}
            onChangeText={setHairColor}
            placeholder="Enter hair color"
          />

          <Text>Skin Color:</Text>
          <TextInput
            style={styles.input}
            value={skinColor}
            onChangeText={setSkinColor}
            placeholder="Enter skin color"
          />

          <Text>Allies (comma separated):</Text>
          <TextInput
            style={styles.input}
            value={allies}
            onChangeText={setAllies}
            placeholder="Enter allies"
          />

          <Text>Enemies (comma separated):</Text>
          <TextInput
            style={styles.input}
            value={enemies}
            onChangeText={setEnemies}
            placeholder="Enter enemies"
          />

          <Text>Profession:</Text>
          <TextInput
            style={styles.input}
            value={profession}
            onChangeText={setProfession}
            placeholder="Enter profession"
          />

          <Text>Position:</Text>
          <TextInput
            style={styles.input}
            value={position}
            onChangeText={setPosition}
            placeholder="Enter position"
          />

          <Text>Predecessor:</Text>
          <TextInput
            style={styles.input}
            value={predecessor}
            onChangeText={setPredecessor}
            placeholder="Enter predecessor"
          />

          <Text>Successor:</Text>
          <TextInput
            style={styles.input}
            value={successor}
            onChangeText={setSuccessor}
            placeholder="Enter successor"
          />

          <Text>Affiliations:</Text>
          <TextInput
            style={styles.input}
            value={affiliations}
            onChangeText={setAffiliations}
            placeholder="Enter affiliations"
          />

          <Text>Born:</Text>
          <TextInput
            style={styles.input}
            value={born}
            onChangeText={setBorn}
            placeholder="Enter birthdate"
          />

          <Text>Dead:</Text>
          <TextInput
            style={styles.input}
            value={dead}
            onChangeText={setDead}
            placeholder="Enter last appearance"
          />

          <Text>Voiced By:</Text>
          <TextInput
            style={styles.input}
            value={voicedBy}
            onChangeText={setVoicedBy}
            placeholder="Enter voiced by"
          />

          <Button title="Add Character" onPress={handleAddCharacter} />
          {message && <Text style={[styles.message, {color: message === "Character added successfully!" ? "green" : "red"}] }>{message}</Text>}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
    color: '#141115',
    fontFamily: 'avatarock',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontFamily: 'avatarock',
    borderRadius: 5,
    fontSize: 20
  },
  message: {
    marginTop: 20,
    fontFamily: 'avatarock',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AddCharacterPage;
