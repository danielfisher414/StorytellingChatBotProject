import React, { useState, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Dimensions, ViewStyle, Image, Button } from 'react-native';
import MirkwoodStory from './screens/MirkwoodStory';
import { Video } from 'expo-av';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Dimensions, ViewStyle, Image, Button } from 'react-native';


export default function App() {
 const [mirkwoodStory, setMirkwoodStory] = useState(false);
 const [location, setLocation] = useState('mirkwood');
   const handlePress = () => {
    fetch(`http://127.0.0.1:5000/get?msg=${userInput}`, { mode: 'cors' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then(data => {
        if (data.response) {
          console.log(data.response)
          const wordsToColor = ['Bag', 'End', 'Hobbiton','Mirkwood' ,'Lonely', 'Mountain', 'Mountains'];
          const formattedResponse = data.response.split(' ').map((word, index, words) => {
            let punctuation = '';

            // Remove any punctuation from the word and save it in a separate variable
            const wordWithoutPunctuation = word.replace(/[^a-zA-Z0-9'"]/g, '');
            punctuation = word.slice(wordWithoutPunctuation.length);
            word = wordWithoutPunctuation;

            // Check if the current word should be colored gold
            const shouldColor = wordsToColor.includes(word)


            console.log(wordsToColor);


            // Return the word with or without gold color, as appropriate
            return (
              <Text key={index} style={shouldColor ? { color: 'gold' } : {}}>
                {word}{punctuation}{' '}
              </Text>
            );
          });

          if (userInput.toLowerCase().includes('go to mirkwood')) {
            setLocation('Mirkwood');

          } else if (userInput.toLowerCase().includes('go to bag end')) {
            setLocation('bag end');
           
          } else {
            setBotResponse(formattedResponse);
            setMessages([...messages, { message: userInput, sentBy: 'user' }, { message: formattedResponse, sentBy: 'bot' }]);
          }
        }
      })
      .catch(error => console.error(error));
  };
  return (
<View style={styles.container}>

    
</View>
  );
};