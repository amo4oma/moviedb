import React, {useState} from 'react';
import axios from 'axios';
import { ImageBackground,StyleSheet, Text, View,TextInput, ScrollView, Image, TouchableHighlight, Modal, Button, Linking  } from 'react-native';


const image = { uri: "https://i.pinimg.com/474x/ec/1f/71/ec1f713f49cc6d6556184969ac9d2efd.jpg" };
export default function App() {
  //The Api i use to fech the movies database
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=aa2402c1";
  const [state, setState] = useState({
    input: "Enter the movie name..",
    results : [],
    selected: {},
    u: "https://www.linkedin.com/in/ahmed-obad-6b4b7274/"
  });

  const search =() => {
    //I used axios to  make a request for a movie with input input movie nama
    axios( apiurl + "&s=" + state.input).then(({ data }) => {
     let results = data.Search;
    // handle the result 
      setState(prevState => {
        return { ...prevState, results: results}
      })
    })
  }
// ()=> to open a new screen with the information of the movie once its clicked by the user
  const openPopup = imdbID => {
    axios(apiurl + "&=" + imdbID).then(({ data }) =>{
      let result= data;
      console.log(data);
      setState(prevState => {
        return {...prevState, selected: result }
      });
    });
  }
  return (
    <View style={styles.container}>
           
           <Image style={{width:500,
             height:50,
            marginTop:-1,
             marginBottom:10}} source={{uri:'https://miro.medium.com/max/18708/1*WgMZ_JII2WFKMIEtbWeTHg.jpeg'}}/>
  
      
     
      <Text style={styles.h1}>Enter the movie name 👇</Text>
      
      <TextInput
      style={styles.searchbox}
      onChangeText={text => setState(prevState => {
        return {...prevState, input:text}
      })}
      onSubmitEditing={search}
      value ={state.s}
      />
      <ScrollView style={styles.results}>
      {state.results.map(result => (
        <TouchableHighlight
         key={result.imdbID} 
        onPress={()=> openPopup(result.imdbID)}
        >
        
        <View  style={styles.result}>
         
          <Image
          source={{uri: result.Poster}}
          style={{
            width:'100%',
            height:300
          
          }}
          resizeMode="cover"
          />
          
          <Text style={styles.heading}>{result.Title}</Text>
            
        </View>
        </TouchableHighlight>
      ))}
      </ScrollView>
      
      <Modal
      animationType="fade"
      transparent={false}
      visible={(typeof state.selected.Title !="undefined" ) ? true : false}
      >
             <View style={styles.popup}> 
             <Image style={{width: 500,
             height:300,
             paddingTop:1,
             marginBottom:10}} 
              source={{uri:'https://lh3.googleusercontent.com/sb30umyAPj9A4ixl4jnPJO15ET-mo4TihKOI0xwFzRbxOfZo6fozeKmAjf8Lhl3mqHY'}}/>

            
           <Text style={styles.poptitle}>{state.selected.Title}</Text>
           <Text style={{marginBottom:50}}>Rating : {state.selected.imdbIDRating}</Text>
           <Text>{state.selected.Plot}</Text>
           
        </View>
       
       
 <TouchableHighlight
        onPress={()=> setState(prevState=>{
          return{...prevState,selected: {}}
        })}
        >
          <Text style={styles.closeBtn}>Close</Text>
        </TouchableHighlight>
      </Modal>
    
      <Button  style={styles.footer} title="made by Ahmed Obad for the Pre-interview for RM 'Click' to view resume"  onPress={ ()=>{Linking.openURL('https://amo4oma.github.io/amo-cv/')}} />
     
    </View>
  
  ); 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12343b',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop : 70,
    paddingHorizontal:20
  },
  
  
  title: {
    color : '#FFF',
    fontSize: 32,
    fontWeight : '700',
    textAlign: 'center',
    marginBottom: 20,
  backgroundColor: '#12343b'
  },
  h1:{
    color : '#FFF',
    fontSize: 22,
    fontWeight : '700',
    textAlign: 'center',
    marginBottom: 20,
  backgroundColor: '#12343b'
  },
  searchbox:{
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width :'100%',
    backgroundColor : '#FFF',
    borderRadius : 8,
    marginBottom: 40
  },
  results:{
    flex: 1
  },

  result:{
    flex: 1,
    width: '100%',
    marginBottom:20
  },
  heading :{
    color : '#fff',
    fontSize: 32,
    fontWeight : '600',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#7c677f'
  },
  popup:{
    flex: 1,
    backgroundColor: '#f5c518',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop : 70,
    paddingHorizontal:20
   
  },
  poptitle:{
    fontSize:20,
    
    fontWeight:'700',
    marginBottom:20
  },
  closeBtn:{
    padding:20,
    
    fontSize:20,
   
    color:'#FFF',
    fontWeight:'700',
    backgroundColor:'#2484C4',
    marginVertical: 8,
    marginTop:0,
    paddingBottom:30,
   
    
  },
  footer:{
    color : '#8888',
    fontSize: 13,
    fontWeight : '600',
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#000000'
  }
 
});
