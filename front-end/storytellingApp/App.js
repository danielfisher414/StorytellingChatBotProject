import React, { useState,Component,useEffect,useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList,Dimensions,ViewStyle     } from 'react-native';
// import {Video} from 'expo-av';
// import { requireNativeComponent } from 'react-native';
// import { Platform } from 'react-native';
// import video from './assets/videos/9878-background-full-screen.mp4'
// import { createElement } from 'react-native-web';
// import { Image } from 'react-native-web';
// import Video from 'react-native-web';
import { Video } from 'expo-av';

// const videoStyle: ViewStyle = {
//   width: 200,
//   height: 200,
//   alignSelf: 'center',
//   marginTop: 20,
//   borderRadius: 10,
// };

export default function App() {

  // const { width, height } = Dimensions.get('window');

  // const styles = StyleSheet.create({
  //   backgroundVideo: {
  //     width: width * 0.8,
  //     height: height * 0.5,
  //   },
  // });

  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState([]);
  
  // const [video, setVideo] = useState(null);

  const video = useRef(null);



  // useEffect(() => {
  //   async function loadVideo() {
  //     const { status } = await Video.requestPermissionsAsync();
  //     if (status !== 'granted') return;
  
  //     const videoObject = new Video.Player();
  //     videoObject.setOnPlaybackStatusUpdate((playbackStatus) => {
  //       if (playbackStatus.didJustFinish) {
  //         videoObject.replayAsync();
  //       }
  //     });
  //     await videoObject.loadAsync(require('./assets/videos/9878-background-full-screen.mp4'), {}, true);
  //     setVideo(videoObject);
  //   }
  
  //   loadVideo();
  // }, []);

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

{/* <View style={{position:'absolute',width:'100%', height:'100%',}}> */}
      <Video
        ref={video}
        style={styles.video}
        resizeMode="cover"
        source={require("./assets/videos/bilbo_House.mp4")}
        isLooping
        shouldPlay
        styleProp
        
      />
    
    {/* </View> */}
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
    {/* check */}
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
    // padding: 20,
    backgroundColor: 'red',
  },
  video: {
    position:'absolute',
    overflow: 'hidden', /* Hide vertical scrollbar */
    // overflow-x: 'hidden', /* Hide horizontal scrollbar *
    color:'blue',
    width: '100%',
    height: '100%',
    // transform:[{translateX:'-50%'}]
    // position: 'absolute',
    // width: '100%',
    // height: '100%',
    // right: 720,
    // resizeMode:'cover'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    color:'white',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight:'bold',
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
