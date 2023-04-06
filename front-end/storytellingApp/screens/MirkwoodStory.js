import React, { Component } from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";
// lord+of+the+rings+places+mirkwood.png
const images = [{
    image: require('../assets/pictures/lord+of+the+rings+places+mirkwood.png'),
    text: 'Texttest1'

},
{
    image: require('../assets/pictures/Thranduils+Halls+Mirkwood+Lord+of+the+Rings.jpg'),
    text: 'Texttest2'

},
{
    image: require('../assets/pictures/d2c08vv-1c6666c7-0014-4250-8fc3-23de605870d8.jpg'),
    text: 'Texttest3'

},
{
    image: require('../assets/pictures/wvxaukoh5ka41.jpg'),
    text: 'Texttest4'

},
{
    image: require('../assets/pictures/22SPIDERS1_SPAN-superJumbo.jpg'),
    text: 'Texttest5'

},
{
    image: require('../assets/pictures/2cbe2c04df1414d71ef89f4826124caf.jpg'),
    text: 'Texttest6'

},

];

export default class MirkwoodStory extends Component {
    constructor(props) {
        super(props);
        this.state = { currentImageIndex: 0, };

    }

    nextPictureImage = (direction) => {
        console.log(this.state.currentImageIndex);
        if (this.state.currentImageIndex === 1) {
            this.setState({ currentImageIndex: 3}, () => {
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
                <View style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'end',
                    flex: 1,
                    margin: 100
                }}>
                    <View style={{ color: 'white', marginBottom: 80, borderWidth: 2, borderStyle: 'solid', borderColor: 'white', padding: 50 }}>
                        <Text style={{ color: 'white' }}>{images[this.state.currentImageIndex].text}</Text>
                    </View>
                    {this.state.currentImageIndex == 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'row', margin: 10, }}>
                            <Button onPress={() => this.nextPictureImage("Left")} title="Left" />
                            <Button onPress={() => this.nextPictureImage("Right")} title="Right" />
                        </div>
                    ) : this.state.currentImageIndex < 5 ? (
                        <View style={{ margin: 10 }}><Button onPress={() => this.nextPictureImage("Continue")} title="Continue" /></View>) :
                        (<View></View>)}
                    <Button onPress={this.props.exitMirkwoodStory} title="Exit Mirkwood Story" />
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
});