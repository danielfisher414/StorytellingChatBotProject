import React, { useState, Component, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Dimensions, ViewStyle, Image, Button } from 'react-native';
import MirkwoodStory from './screens/MirkwoodStory';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { CloseCircleOutlined, CloseCircleFilled, DownCircleFilled} from '@ant-design/icons';


export default function App() {






  const [userInput, setUserInput] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const [messages, setMessages] = useState([]);
  const [location, setLocation] = useState('bag end');
  const [mirkwoodStory, setMirkwoodStory] = useState(false);
  const messagesListRef = useRef(null);
  const video = useRef(null);
  const [storyButtonClicked, setStoryButtonClicked] = useState(false);
  const [bagEndStoryBtn, setBagEndStoryBtn] = useState(false);
  const [mirkwoodStoryBtn, setMirkwoodStoryBtn] = useState(false);

  const [currentScrollPos, setCurrentScrollPos] = useState(0);
  const [currentMaxHeight, setMaxHeight] = useState(0);
  // const {maxScrollPos, setMaxScrollPos} = useState(0);

  function handleBtnScrollToEnd(width, height) {
    

  
   
      messagesListRef.current.scrollToOffset({ offset: height });

  }

  function handleScrollToEnd(width, height) {


  
    if(height !== undefined){
      console.log('undefined here: ')
      setMaxHeight(height);
      
    }else{
      // setCurrentScrollPos(currentMaxHeight);
      height=currentMaxHeight;
      messagesListRef.current.scrollToOffset({ offset: height });
    }

    

    console.log('height:', height);
    console.log('currentScrollPos:', currentScrollPos);

 

    if (currentScrollPos >= height - 1000 && messagesListRef.current) {
      messagesListRef.current.scrollToOffset({ offset: height });
    }else if (currentScrollPos >= height - 1000 && messagesListRef.current) {
      messagesListRef.current.scrollToOffset({ offset: height });
    }
  }
  
  function onScroll(event){
    const scrollOffset = event.nativeEvent.contentOffset.y;
    console.log('scrollposition:', scrollOffset + 318);
    setCurrentScrollPos(scrollOffset + 318);
  }
  

  // function handleScrollToEnd(event) {
  //   console.log(event)

  //   }
  // }

  const handleClearInput = () => {
    setUserInput('');
  };
  const scrollToEnd = () => {
    handleScrollToEnd();
  };

  function handleBagEndStoryBtn() {
    setBagEndStoryBtn(true);
  }
  function handleMirkwoodStoryBtn() {
    setMirkwoodStoryBtn(true);
  }


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
          const wordsToColor = ['Bag', 'End', 'Hobbiton', 'Mirkwood', 'Lonely', 'Mountain', 'Mountains','Elvenking','Halls','Misty','Enchanted','River','Erebor','Middle-earth','Woodland','Realm',];
          const enemyCharToColor = ['Smaug'];
          const characterWordsToColor = ['Thorin','Gandalf','Thorin','Wood-elves','Thranduil','Oakenshield','Bilbo','Baggins','Legolas','Bard',];
          
          const formattedResponse = data.response.split(' ').map((word, index, words) => {
            let punctuation = '';

            // Remove any punctuation from the word and save it in a separate variable
            const wordWithoutPunctuation = word.replace(/[^a-zA-Z0-9'"]/g, '');
            punctuation = word.slice(wordWithoutPunctuation.length);
            word = wordWithoutPunctuation;

            // Check if the current word should be colored gold
            const shouldColor = wordsToColor.includes(word)
            const shouldColor2 = enemyCharToColor.includes(word)
            const shouldColor3 = characterWordsToColor.includes(word)


            console.log(wordsToColor);


            // Return the word with or without gold color, as appropriate

          

            return (
              <Text key={index} style={shouldColor ? { color: 'gold' } : shouldColor2 ? {color: 'red'}: shouldColor3 ? {color: 'blue'}: {}}>
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
          // scrollToBottom();
        }
      })
      .catch(error => console.error(error));
      // scrollToBottom();
  };



  function activateMirkwoodStory() {
    handleMirkwoodStoryBtn();
    setMirkwoodStory(!mirkwoodStory);
  }

  function activateBagEndStory() {
    handleBagEndStoryBtn();
    // setBagEndStoryBtn(!bagEndStoryBtn);
  }
  // handleBagEndStoryBtn
  function handlePressSuggestionBtn(suggestionText) {
    setUserInput(suggestionText);
    this.handlePress();
  }


  return (

    // Start of Background
    // VIEW LOCATION PICTURE/VIDEO as background
    <View style={styles.container}>

      {mirkwoodStory ? (
        <MirkwoodStory exitMirkwoodStory={() => setMirkwoodStory(false)} />
      ) : (
        location !== 'Mirkwood' ? (
          <Video
            ref={video}
            style={styles.video}
            resizeMode="cover"
            source={require("./assets/videos/bilbo_House.mp4")}
            isLooping
            shouldPlay
            styleProp
          />
        ) : (
          <Image
            style={{
              position: 'absolute',
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
            source={require('./assets/pictures/HobbitMirkwood.jpg')}
            onError={(e) => console.log(e)}
          />
        )
      )}


      {/* End of Background */}

      {/* Selecting what the background location should be */}
      {/* If the location is Bag End the location title will change */}

      {!mirkwoodStory && location !== 'mirkwood' && (
        <View style={styles.locationTitle}>
          {location === 'bag end' ? (
            <>
              <View> Hobbiton </View>
              <View> Bag End </View>
            </>
          ) : (
            <View> {location} </View>
          )}
        </View>
      )}

      {/* MESSAGE BOX of bot messages and user messages */}
      {/* The message Box has to reach a certain length of messages to show. Helps by improving the design */}
      {messages.length > 1 && !mirkwoodStory ? (
        <View style={styles.messagesBox}>
  

         
          <FlatList
             onScroll={(event)=>onScroll(event)}
            ref={messagesListRef}
            data={messages}
            renderItem={({ item }) => (

              // styling either the bot message or the user message with their seperate styling
              <View style={item.sentBy === 'bot' ? styles.botMessage : styles.userMessage}>
                {/* Displaying the message text on to the message box */}
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
              
            
            )}
            // onContentSizeChange={() => messagesListRef.current.scrollToEnd()}
            // onContentSizeChange={() => scrollRef.current.scrollToEnd()}
            // keyExtractor={(item, index) => index.toString()}
          onContentSizeChange={handleScrollToEnd}
          />
        </View>
        // End of Message Box
        // tet234
      ) : (
        <View />
      )}

      {/* Input components (i.e. text input and submit button for the user to input their message and send it to the chatbot) */}
      <View>
      </View>
      {/* The Input components will not show if a Story is currently activated */}
      {!mirkwoodStory ? (
        <View>
<View>
  <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 14, marginRight: 4 }}>
    <View style={{ flex: 1 }}>
    <TextInput
  style={[styles.input]}
  onChangeText={text => setUserInput(text)}
  value={userInput}
  onSubmitEditing={handlePress}
/>
{userInput ? (
  <TouchableOpacity style={{ position: 'absolute', right: 4, top: 7 }} onPress={handleClearInput}>
    <CloseCircleFilled style={{ color: '#d7d7d7', fontSize: 24, borderRadius:20 }} />
  </TouchableOpacity>
) : null}


      {messages.length > 2 && (currentScrollPos !== currentMaxHeight) ?(
   
      <TouchableOpacity style={{ position: 'absolute', right: -17, top: -43 }} onPress={handleScrollToEnd}>
        <DownCircleFilled style={{ color: '#d7d7d7', fontSize: 25, borderRadius:20 }} />
      </TouchableOpacity>
     
      ):null}
    </View>

    <View style={{ marginLeft: 10 }}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

          {/* End Of Input Components  */}

          {/* suggestion buttons. Each location has different suggestion buttons*/}
          {/* Start of location 'Bag end' suggestion buttons */}
          {location === 'bag end' ? (
            <View style={{ flex: 1 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <View>
                  <TouchableOpacity
                    onPress={() => handlePressSuggestionBtn('Who are you?')}

                  >
                    <Text style={styles.suggestionButton}>Who are you?</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => handlePressSuggestionBtn('Can you tell me about your adventure')}
                  >
                    <Text style={styles.suggestionButton}>Can you tell me about your adventure</Text>
                  </TouchableOpacity>
                </View>

                          {/* Story Button (i.e. each location will have a different story,
            involving current location the user are in)*/}



             
<View style={{ alignItems: 'center' }}>
                <View style={{flex:1,margin:0}}>
                  <TouchableOpacity onPress={activateBagEndStory} style={styles.mkButton}>
                    <Text style={styles.mkbuttonText}>{"Bag End Story"}</Text>
                  </TouchableOpacity>
                </View>
                </View>
               


            {/* END OF Story Button */}


          
                {bagEndStoryBtn == true && location !== 'Mirkwood' ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handlePressSuggestionBtn('Go to Mirkwood')}
                    >
                      <Text style={styles.suggestionGoToButton}>Go to Mirkwood</Text>
                    </TouchableOpacity>
                  </View>
                ) : null
                }
              </View>
            </View>
            // End Of - location 'Bag End' suggestion buttons 
          ) : <View>

            {/* Start of location 'Mirkwood' suggestion buttons */}

            <View style={{ flex: 1 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <View>
                  <TouchableOpacity
                    onPress={() => handlePressSuggestionBtn('Tell me about Mirkwood?')}

                  >
                    <Text style={styles.suggestionButton}>Tell me about Mirkwood?</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => handlePressSuggestionBtn('Has anyone explored Mirkwood?')}
                  >
                    <Text style={styles.suggestionButton}>Has anyone explored Mirkwood?</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
          
          <View style={{marginTop:8}}>

            <TouchableOpacity onPress={activateMirkwoodStory} style={styles.mkButton}>
              <Text style={styles.mkbuttonText}>{"Mirkwood Story"}</Text>
            </TouchableOpacity>

          </View>
          </View>
                <View>
                  <TouchableOpacity
                    onPress={() => handlePressSuggestionBtn('Go to Bag End')}
                  >
                    <Text style={styles.suggestionGoToButton}>Go to Bag End</Text>
                  </TouchableOpacity>
                </View>
                {mirkwoodStoryBtn == true && location !== 'bag end' ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handlePressSuggestionBtn('')}
                    >
                      <Text style={styles.suggestionGoToButton}>Go to ElvenKing's Halls</Text>
                    </TouchableOpacity>
                  </View>
                ) : null
                }
              </View>
            </View>
            {/* End of location 'Mirkwood' suggestion buttons */}
          </View>};


          {/* Story Button (i.e. each location will have a different story,
            involving current location the user are in)*/}



        </View>
      ) : (
        <View />)}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  video: {
    position: 'absolute',
    overflow: 'hidden', /* Hide vertical scrollbar */
    color: 'blue',
    width: '100%',
    height: '100%',

  },
  input: {
    // flex: 1,
    borderRadius: 10,
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
    // marginRight:20
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
    backgroundColor: 'rgba(79, 195, 247, 0.77)',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 5,
    maxWidth: '70%',
  },
  botMessage: {
    flex: 1,
    backgroundColor: 'rgba(124, 118, 237, 0.77)',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 5,
    maxWidth: '70%',
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
  locationTitle: {
    color: 'gold',
    textAlign: 'center',
    margin: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadow: '3px 3px 3px rgba(0, 0, 0, 1)'
  },
  suggestionButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontWeight: 'bold',
    margin: 5,

  },
  suggestionGoToButton: {
    backgroundColor: '#d1892a',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    fontWeight: 'bold',
    // margin: 5,
    fontSize:16
  },
  mkButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mkbuttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight:'bold'
  },

});