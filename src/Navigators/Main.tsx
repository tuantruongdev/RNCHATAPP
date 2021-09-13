import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScrren } from '@/Containers'
import {  Image,Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { View ,Text,Button,FlatList, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { any, string } from 'prop-types';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { loremIpsum } from 'react-lorem-ipsum';

const usersCollection = firestore().collection('users');
const Tab = createBottomTabNavigator()
var accessToken:any;


const HomeScreen=({navigation}:any)=>{

  const [iconName,setIconName]= useState("heart-outline")
  const [count,setCount]=useState(1);
  const [data,setData]=useState([] as any);
  const [stt,setStt]= useState("");
  function onResult(QuerySnapshot:any) {
    console.log('Got Users collection updates.');
    var temp=[]as any;
    QuerySnapshot.forEach((documentSnapshot: { id: any; data: () => any; })=> {
    //  console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
   
      temp.push({"id":documentSnapshot.id,
      "content": documentSnapshot.data().content,
      "timestamp":documentSnapshot.data().timestamp,
      "ownerId":documentSnapshot.data().ownerId,
      "ownerName": documentSnapshot.data().ownerName,
      "ownerProfilePicture":documentSnapshot.data().ownerProfilePicture
    
    });
      setData(temp);
      
    });
    
  }
  
  function onError(error:any) {
    console.error(error);
  }
  
  
  var dosomeShit=async()=>{
    accessToken= await AccessToken.getCurrentAccessToken();
    firestore().collection('posts').onSnapshot(onResult, onError);
   
  
  }


   var addFieldToDB=async()=>{
  
    /*
   firestore()
    .collection('posts').doc(auth().currentUser?.uid)
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.data.length);
    })

*/
   

    firestore()
    .collection('users').doc(auth().currentUser?.uid).collection("info").doc("0")
    .set({
      
      name: auth().currentUser?.displayName,
      phone:"0362785203"
    })
    .then(() => {
     setCount(count+1);
      console.log('User added!');
    });
/*
   match /{documents=**}{
			allow read;
     allow write;
    }
*/


    +new Date
    const Jabber = require('jabber');
    const jabber = new Jabber();
    firestore()
    .collection('posts')
    .add({
      
      content:stt,
      timestamp:Date.now(),
      ownerId: auth().currentUser?.uid,
      ownerName: auth().currentUser?.displayName,
      ownerProfilePicture:auth().currentUser?.photoURL,
      likeCount: 0
    })
    .then(() => {
     setCount(count+1);
      console.log('User added!');
    });

    setStt("");
   }
   function timeDifference(current:any, previous:any) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}


   var addFieldToDB2=async()=>{
    firestore()
    .collection('users').doc(auth().currentUser?.uid)
    .set({
      id: auth().currentUser?.photoURL ,
      content: auth().currentUser?.displayName,
    })
    .then(() => {
     setCount(count+1);
      console.log('User added!');
    });
   }
  const renderItem = ({item}:any) => {
    
    +new Date
  //  console.log(  item.ownerProfilePicture+"?access_token=" +accessToken.accessToken);
   // var iconT=  "heart-outline";

  //  "heart-circle-outline"
    return (
      <View>
   <View style={{margin:15,marginBottom:5}}>
     <View style={{flexDirection:"row",alignContent:"center"}}>
     <Image
      containerStyle={{}}
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onPress()")}
      placeholderStyle={{}}
      transitionDuration={1000}
      source={{
        uri:
          item.ownerProfilePicture+"?access_token=" +accessToken.accessToken
      }}
      style={{ width: 39, height: 39 }}
    />
    <View  style={{alignSelf:"center",marginLeft:10}}>
     <Text style={{fontWeight:"bold",fontSize:15}}>{item.ownerName}</Text>

     <Text style={{fontStyle:"italic"}}>{timeDifference( Date.now(),item.timestamp)}</Text>
     </View>
     </View>
     <Text  style={{marginTop:5,fontSize:15}}>{item.content}</Text>
     <View  style={{marginTop:5,marginBottom:3,width:"100%",height:2,backgroundColor:"#cdccd2",alignSelf:"center"}}/>


     
  <View  style={{width:"100%",height:30,flexDirection:"row" ,justifyContent:"space-around"}}>
      
 
  <Icon  name= {iconName} color="#636363"  size={27}  onPress={()=>{
  if(iconName==="heart-outline"){
    setIconName("heart-circle-outline")
  }else{
    setIconName("heart-outline")
  }
  
}
  //console.log(liked)
  }/>
  <Icon  name="chatbox-ellipses-outline" color="#636363"  size={27} />
  <Icon  name="share-social-outline" color="#636363"  size={27} />

  </View>
   </View>
    <View style={{width:"100%",height:5,backgroundColor:"#cdccd2"}}></View>
    </View>
    );
  };

  return(
    <View>
<View style={{flexDirection:"row",justifyContent:"space-around"}}>
<Button
title={auth().currentUser?.displayName?.toString()!=null?auth().currentUser?.displayName?.toString():"Bạn chưa đăng nhập"}
onPress={()=>{auth().signOut().then(() => {navigation.navigate("Login")

LoginManager.logOut()

  }
);
}}
></Button>
      <Button
      title={"listen database"}
      onPress={()=>{
        dosomeShit()

      }}
      ></Button>
       <Button
      title={"add field"}
      onPress={()=>{
        addFieldToDB()

      }}
      ></Button>
      </View>
      <Input
      containerStyle={{}}
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      inputContainerStyle={{}}
      value={stt}

      inputStyle={{}}
      label="What on your mind?"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="happy-outline" size={20} />}
      leftIconContainerStyle={{}}
      multiline={true}
      numberOfLines={3}
      onChangeText={text=>{
        setStt(text);


      }}
      placeholder="Post something on newfeed"
    />


        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
       // extraData={selectedId}
      />



  
  </View>
  )
}
// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (

          <Icon name="home" color="#FF0000"  size={30} />
          ),
         
        }}
      name="Home" component={HomeScreen} />
    </Tab.Navigator>
  )
}

export default MainNavigator


