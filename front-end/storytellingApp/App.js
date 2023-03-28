import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-web';


export default function App() {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

 

  const handlePress = () => {
    fetch(`http://127.0.0.1:5000/get?msg=${userInput}`, { mode: 'cors' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then(data => setBotResponse(data.response))
    .catch(error => console.error(error));

  };

  return (
    <View style={styles.container}>
      <div id='imgBox'>
      {/* <img
      src='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71UmqXwHWfL._AC_SL1024_.jpg'
    /> */}
      </div>

      <TextInput
        style={styles.input}
        onChangeText={text => setUserInput(text)}
        value={userInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <Text style={styles.response}>{botResponse}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  response: {
    marginTop: 10,
    fontSize: 18,
  },
});
