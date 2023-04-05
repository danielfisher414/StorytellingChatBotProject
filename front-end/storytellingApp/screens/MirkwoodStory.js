import React, { Component } from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";
// lord+of+the+rings+places+mirkwood.png
const images = [{
    image: require('../assets/pictures/lord+of+the+rings+places+mirkwood.png'),
    text: 'Texttest1'

},
{
    photo: 'test2',
    text: 'Texttest2'

},
{
    photo: 'test3',
    text: 'Texttest3'

},
{
    photo: 'test4',
    text: 'Texttest4'

},
{
    photo: 'test5',
    text: 'Texttest5'

},
{
    photo: 'test6',
    text: 'Texttest6'

},

];

export default class MirkwoodStory extends Component {
    constructor(props) {
        super(props);
        this.state = { currentImageIndex: 0, };

    }

    nextPictureImage = (direction) => {
        if (direction == "Continue") {
            this.setState({ currentImageIndex: this.state.currentImageIndex += 1 })
            console.log(this.state.currentImageIndex)
        } else if (direction == "Left") {
            this.setState({ currentImageIndex: 1 });
            console.log("Left");
        } else if (direction == "Right") {
            this.setState({ currentImageIndex: 2 });
            console.log("Right");
        }
    };


    render() {
        return (
            <View style={styles.container}>
                {/* <Text>Test</Text> */}
                {/* <Image source={{ uri: images[currentImageIndex].uri }} /> */}
                {/* <Text>{images[this.state.currentImageIndex].text}</Text> */}
                {/* <TouchableOpacity onPress={this.nextPictureImage}>
                    <Text>Continue</Text>
                </TouchableOpacity> */}

                {/* <Image style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                }}
                   resizeMode="cover"
                    source={images[this.state.currentImageIndex].image}
                    onError={(e) => console.log(e)}
                /> */}
                <Image style={styles.backgroundImage} resizeMode="cover" source={images[this.state.currentImageIndex].image} />
                <View>
                    <Button onPress={this.props.exitMirkwoodStory} title="Exit Mirkwood Story" />
                    {this.state.currentImageIndex == 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button onPress={() => this.nextPictureImage("Left")} title="Left" />
                            <Button onPress={() => this.nextPictureImage("Right")} title="Right" />
                        </div>
                    ) : this.state.currentImageIndex < 5 ? (<Button onPress={() => this.nextPictureImage("Continue")} title="Continue" />) :
                        (<View></View>)}
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      display:'flex',
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
      width:'100%',
      height:'100%',

    },
  });