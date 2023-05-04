import React, { Component } from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
// lord+of+the+rings+places+mirkwood.png
const images = [{
  image: require('../assets/pictures/lord+of+the+rings+places+mirkwood.jpg'),
  text: 'As Bilbo Baggins and his group venture into the Mirkwood forest with the goal of reaching the other side.\n\n The group comes across a fork in the path with two paths leading in different directions.\n\nOne path veers to the left, while the other leads off to the right.\n\nBilbo must now decide which of these paths to follow on to his journey.'

},
{
  image: require('../assets/pictures/Thranduils+Halls+Mirkwood+Lord+of+the+Rings.jpg'),
  text: 'As Bilbo and the group took the left path, they notice through the bushes, the Thranduil’s Halls bridge that leads into the mountain. Some elves could be seen walking on the bridge.\n\nThe group curious about what lay inside across the bridge they continue through the forest.'

},
{
  image: require('../assets/pictures/mirkwoodBridge.jpg'),
  text: 'Bilbo and the group taking the right path they walk further along the dirt path, they come across a broken bridge over the Enchanted River. The river was black and rumoured to be cursed.\n\n But finding a boat they cross it. Unfortunately Bombur fell in the river and was knocked unconscious, causing the group to carry Bombur through the forest'

},
{
  image: require('../assets/pictures/wvxaukoh5ka41.jpg'),
  text: 'As Bilbo continues in front of the group, he suddenly notices his dwarf companions have vanished.\n\n Following a footpath Bilbo is led to a shadowy spider\'s nest - and there, he sees his friends, ensnared and helpless, surrounded by spiders.'

},
{
  image: require('../assets/pictures/22SPIDERS1_SPAN-superJumbo.jpg'),
  text: 'Bilbo launch a daring assault on the swarms of spiders, to save his Dwarf friends. Luckily he managed to rescue his friends, and together they make a desperate dash for safety out of the spider\'s nest.'

},
{
  image: require('../assets/pictures/2cbe2c04df1414d71ef89f4826124caf.jpg'),
  text: 'After Bilbo\'s triumphant escape from the clutches of the spiders, all of the group settle down around a crackling campfire, basking in the warmth of the group hard-earned victory.\n\n As Bilbo anticipates another long journey, a mysterious feeling creeps over him, as if some unknown presence is silently observing Bilbo\'s every move...'

},

];

export default class MirkwoodStory extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImageIndex: 0, isLoading: false, };

  }

  nextPictureImage = (direction) => {
    console.log(this.state.currentImageIndex);
    if (this.state.currentImageIndex === 1) {
      this.setState({ currentImageIndex: 3 }, () => {
        console.log("hello");
        console.log(this.state.currentImageIndex);
      });
    }
    if (direction == "Continue" && this.state.currentImageIndex !== 1) {
      this.setState({ currentImageIndex: this.state.currentImageIndex += 1 })
      console.log(this.state.currentImageIndex)
    } else if (direction == "Left") {
      this.setState({ currentImageIndex: 1 });

      console.log(this.state.currentImageIndex);

    } else if (direction == "Right") {
      this.setState({ currentImageIndex: 2 });
      console.log("Right");
    }
  };

  handleImageLoadStart = () => {
    this.setState({ isLoading: true });
  };

  handleImageLoadEnd = () => {
    this.setState({ isLoading: false });
  };


  render() {
    const { currentImageIndex, isLoading } = this.state;
    const currentImage = images[currentImageIndex];

    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          // resizeMode="cover"
          resizeMode="fast"
          source={currentImage.image}
          onLoadStart={this.handleImageLoadStart}
          onLoadEnd={this.handleImageLoadEnd}
          onError={(e) => console.log(e)}
        />

        <View
          style={{

            alignContent: "center",
            alignItems: "center",
            justifyContent: "start",
            flex: 1,
            // margin: 100,
          }}
        >
          <View
            style={{
              marginTop: 60,
              color: "white",
              marginBottom: 40,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "white",
              padding: 20,
            }}
          >
            <Text style={styles.storyText}>{currentImage.text}</Text>
          </View>
          {currentImageIndex === 0 ? (
            <View style={{
              position: 'absolute',
              bottom: 90
            }}>
              <View style={{ display: "flex", flexDirection: "row", margin: 10, justifyContent: 'space-evenly' }}>
                <View>
                  <TouchableOpacity onPress={() => this.nextPictureImage("Left")} style={styles.mkButton}>
                    <Text style={styles.mkbuttonText}>{"Left"}</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.nextPictureImage("Right")} style={styles.mkButton}>
                    <Text style={styles.mkbuttonText}>{"Right"}</Text>
                  </TouchableOpacity>
                </View>
                {/* <Button onPress={() => this.nextPictureImage("Left")} title="Left" /> */}
                {/* <Button onPress={() => this.nextPictureImage("Right")} title="Right" /> */}
              </View>
              <View>
                <TouchableOpacity onPress={this.props.exitMirkwoodStory} style={styles.mkButton}>
                  <Text style={styles.mkbuttonText}>{"Exit Mirkwood Story"}</Text>
                </TouchableOpacity>
              </View>
              {/* <View>
                <Button onPress={this.props.exitMirkwoodStory} title="Exit Mirkwood Story" />
              </View> */}

            </View>
          ) : currentImageIndex < images.length - 1 ? (
            <View style={{
              position: 'absolute',
              bottom: 90,
              
            }}>
              <View style={{ margin: 10}}>
                <TouchableOpacity onPress={() => this.nextPictureImage("Continue")} style={styles.mkButton}>
                  <Text style={styles.mkbuttonText}>{"Continue"}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={this.props.exitMirkwoodStory} style={styles.mkButton}>
                  <Text style={styles.mkbuttonText}>{"Exit Mirkwood Story"}</Text>
                </TouchableOpacity>
              </View>
              {/* <Button onPress={() => this.nextPictureImage("Continue")} title="Continue" /> */}
              {/* <Button onPress={this.props.exitMirkwoodStory} title="Exit Mirkwood Story" /> */}
            </View>
          ) : (
            <View style={{
              position: 'absolute',
              bottom: 100
            }}>
              <View>
                <TouchableOpacity onPress={this.props.exitMirkwoodStory} style={styles.mkButton}>
                  <Text style={styles.mkbuttonText}>{"Exit Mirkwood Story"}</Text>
                </TouchableOpacity>
              </View>
              {/* <Button onPress={this.props.exitMirkwoodStory} title="Exit Mirkwood Story" /> */}
            </View>
          )}

        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    //   backgroundColor: 'red',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',

  },
  storyText: {
    color: 'white',
    // fontSize: 20,
    // lineHeight: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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
  },


});