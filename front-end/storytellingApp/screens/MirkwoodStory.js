import React, {Component} from "react";
import {View, Text,Button,Image,TouchableOpacity} from "react-native";

const images =[{
        photo:'test1',
        text:'Texttest1'
        
    },
    {
        photo:'test2',
        text:'Texttest2'
    
    },
    {
        photo:'test3',
        text:'Texttest3'
    
    },
    {
        photo:'test4',
        text:'Texttest4'
    
    },
    {
        photo:'test5',
        text:'Texttest5'
    
    },
    {
        photo:'test6',
        text:'Texttest6'
    
    },
    
];

export default class MirkwoodStory extends Component{
    constructor(props){
    super(props);
    this.state ={currentImageIndex:0,};
        
}

    nextPictureImage =(direction)=>{
        if(direction=="Continue"){
        this.setState({currentImageIndex:this.state.currentImageIndex+=1})
        console.log(this.state.currentImageIndex)
        }else if(direction=="Left"){
            this.setState({currentImageIndex:1});
            console.log("Left");
        }else if(direction=="Right"){
            this.setState({currentImageIndex:2});
            console.log("Right");
        }
    };


    render(){
        return(
            <View>
                {/* <Text>Test</Text> */}
                {/* <Image source={{ uri: images[currentImageIndex].uri }} /> */}
                <Text>{images[this.state.currentImageIndex].text}</Text>
                {/* <TouchableOpacity onPress={this.nextPictureImage}>
        <Text>Continue</Text>
      </TouchableOpacity> */}
                <Button onPress={this.props.exitMirkwoodStory} title="Exit Mirkwood Story" />
                {this.state.currentImageIndex==0 ? (
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button onPress={()=> this.nextPictureImage("Left")} title="Left" />
                <Button onPress={()=> this.nextPictureImage("Right")} title="Right" />
                </div>
                ):this.state.currentImageIndex<5 ? (<Button onPress={()=> this.nextPictureImage("Continue")} title="Continue" />):
                (<View></View>)}
                
            </View>
        );
    }

}

