import React, { useState, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Dimensions, ViewStyle, Image, Button } from 'react-native';
import MirkwoodStory from './screens/MirkwoodStory';
// import {Video} from 'expo-av';
// import { requireNativeComponent } from 'react-native';
// import { Platform } from 'react-native';
// import video from './assets/videos/9878-background-full-screen.mp4'
// import { createElement } from 'react-native-web';
// import { Image } from 'react-native-web';
// import Videofrom 'react-native-web';
import { Video } from 'expo-av';



export default function App() {


  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState([]);
  const [location, setLocation] = useState('');
  const [mirkwoodStory, setMirkwoodStory] = useState(false);
  const [exitMirkwoodStory, setexitMirkwoodStory] = useState(false);
  // const [video, setVideo] = useState(null);
  const messagesListRef = useRef(null);
  const video = useRef(null);

  function handleScrollToEnd(width, height) {
    if (messagesListRef.current) {
      messagesListRef.current.scrollToOffset({ offset: height });
    }
  }

  useEffect(() => {
    console.log(location)
  })

  const handlePress = () => {

    fetch(`http://127.0.0.1:5000/get?msg=${userInput}`, { mode: 'cors' })
      .then(response => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }


        return response.json()
      })
      .then(data => {
        setBotResponse(data.response)
        setMessages([...messages, { message: userInput, sentBy: 'user' }, { message: data.response, sentBy: 'bot' }]);
        if (userInput.toLowerCase().includes('mirkwood')) {
          // console.log("contains Mirkwood");
          setLocation('Mirkwood');
          // console.log(location);
        } else if (userInput.toLowerCase().includes('bag end')) {
          // console.log("contains Mirkwood");
          setLocation('bag end');
          // console.log(location);
        }


      })

      .catch(error => console.error(error));

  };

  function activateMirkwoodStory() {
    setMirkwoodStory(!mirkwoodStory);
  }

  return (
    // VIEW LOCATION PICTURE/VIDEO
    <View style={styles.container}>

      {mirkwoodStory ? (<MirkwoodStory exitMirkwoodStory={()=>setMirkwoodStory(false)}/>) : location != 'Mirkwood' ? (

        // BAG END LOCATION
        <Video
          ref={video}
          style={styles.video}
          resizeMode="cover"
          source={require("./assets/videos/bilbo_House.mp4")}
          isLooping
          shouldPlay
          styleProp

        />
      ) :
        // <View>
        // MIRKWOOD LOCATION PIC
        <Image style={{
          position: 'absolute',
          overflow: 'hidden', /* Hide vertical scrollbar */
          width: '100%',
          height: '100%',
        }}
          resizeMode="cover"
          source={require('./assets/pictures/HobbitMirkwood.jpg')}
          onError={(e) => console.log(e)}
        />




      }

      {/* MESSAGE BOX IF Statement */}
      {messages.length > 1 && !mirkwoodStory ? (
        <View style={styles.messagesBox}>
          <FlatList
            ref={messagesListRef}
            data={messages}
            renderItem={({ item }) => (
              // console.log(messages),
              <View style={item.sentBy === 'bot' ? styles.botMessage : styles.userMessage}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={handleScrollToEnd}
          />
        </View>
      ) : (
        <View />
      )}
      <View style={styles.imgBox}>

        {/* <img
      src='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71UmqXwHWfL._AC_SL1024_.jpg'
    /> */}
        {/* check1 */}
      </View>
      {!mirkwoodStory ? (
        <View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.input}
                onChangeText={text => setUserInput(text)}
                value={userInput}
              />
            </View>
            <View style={{ marginLeft: 10, }}>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
              >
                <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Story Mirkwood */}
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            {location == 'Mirkwood' ? (<View><Button onPress={activateMirkwoodStory} title='mirkwood Story' /></View>) : (<View></View>)}
          </View>
          {/* END OF Story Mirkwood */}
        </View>
      ) : (
        <View />)}



      {/* <Text style={styles.response}>{botResponse}</Text> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
    backgroundColor: 'red',
  },
  video: {
    position: 'absolute',
    overflow: 'hidden', /* Hide vertical scrollbar */
    color: 'blue',
    width: '100%',
    height: '100%',

  },
  input: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadow: '2px 2px 2px rgba(0, 0, 0, 1)',
    height: 40,
    width: '100%',
    borderColor: 'white',
    color: 'white',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
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
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 10,
    width: '80%',
    height: 340,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userMessage: {
    flex: 1,
    // backgroundColor: '#4fc3f7',
    backgroundColor: 'rgba(79, 195, 247, 0.77)',
    // opacity: 0.8,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 5,
    maxWidth: '70%',
  },
  botMessage: {
    flex: 1,
    backgroundColor: 'rgba(124, 118, 237, 0.77)',
    // backgroundColor: '#7c76ed',
    // borderWidth:6,
    // borderStyle:'solid',
    // borderColor:'purple',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
    maxWidth: '70%',
    // opacity: 0.8,
  },
  messageText: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadow: '1px 1px 1px rgba(0, 0, 0, 1)'
  },
});
