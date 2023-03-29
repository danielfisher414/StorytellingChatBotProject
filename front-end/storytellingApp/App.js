import React, { useState,Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList  } from 'react-native';
// import { Image } from 'react-native-web';
// import Video from 'react-native-video';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [messages, setMessages] = useState([]);
  
 

  const handlePress = () => {
    fetch(`http://127.0.0.1:5000/get?msg=${userInput}`, { mode: 'cors' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        
        return response.json()
    })
    .then(data => {setBotResponse(data.response)
      setMessages([...messages, { message: userInput, sentBy: 'user' },{ message: data.response, sentBy: 'bot' }]);
      
    })
    .catch(error => console.error(error));

  };

  return (
<View style={styles.container}>



<video autoPlay muted loop playsInline>
          <source src="./assets/videos/9878-background-full-screen.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  {messages.length > 1 ? (
    <View style={styles.messagesBox}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          console.log(messages),
          <View style={item.sentBy === 'bot' ? styles.botMessage : styles.userMessage}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  ) : (
    <View />
  )}
  <View style={styles.imgBox}>
    {/* <img
      src='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71UmqXwHWfL._AC_SL1024_.jpg'
    /> */}
  </View>
  <View style={{ display: 'flex', flexDirection: 'row' }}>
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        onChangeText={text => setUserInput(text)}
        value={userInput}
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  </View>
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
  messagesBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '80%',
    height:150,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userMessage: {
    backgroundColor: '#4fc3f7',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 5,
    maxWidth: '70%',
  },
  botMessage: {
    backgroundColor: '#7c76ed',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
    maxWidth: '70%',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
