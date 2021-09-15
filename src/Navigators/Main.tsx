import React, { useState ,useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScrren } from '@/Containers'
import {  Image,Input,Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import { View ,Text,FlatList, Alert,TouchableOpacity} from 'react-native';
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

  const [randomshit,setrd]=useState(1);
  const [listeningDB,setListeningDB] =useState(false);
  useEffect(() => {
    if(listeningDB==false){
      dosomeShit();
      setListeningDB(true);
    }
  });//listening db once load




 
  const [data,setData]=useState([] as any);
  const [stt,setStt]= useState("");

  async function onResult(QuerySnapshot:any) {
    const user = auth().currentUser?.uid  as any;
  //  console.log('Got Users collection updates.');
    var temp=[]as any;
    var liker_list={} as any;
    QuerySnapshot.forEach(async (documentSnapshot: { id: any; data: () => any; })=> {
      var liked=0;
      var like_count=0;
    //  console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
   try{
   //  console.log(documentSnapshot.id);
   const post_likers = await firestore().collection('post-likers').doc(documentSnapshot.id).collection("0").doc(user).get();
   const post_likers_count = await firestore().collection('post-likers').doc(documentSnapshot.id).collection("0").get();
  
   console.log(liker_list);
   like_count=post_likers_count.size;

   
   if(post_likers.data()===undefined){
  //  console.log(post_likers)

   }else{
    liker_list= JSON.parse( JSON.stringify(post_likers.data())); 
    
    
    if (liker_list['liked']=="1"){
      liked=1
    }


 /*
   if (user in liker_list){
    if (liker_list[user]==1){
    }
    }
*/
   }
 //  console.log(liker_list);
    }catch(err){
      console.log(err);
    }
      temp.push({"id":documentSnapshot.id,
      "content": documentSnapshot.data().content,
      "timestamp":documentSnapshot.data().timestamp,
      "ownerId":documentSnapshot.data().ownerId,
      "ownerName": documentSnapshot.data().ownerName,
      "ownerProfilePicture":documentSnapshot.data().ownerProfilePicture,
      "liked":liked,
      "liker_list":liker_list,
      "likecount":like_count





    });
      setData(temp);
      
    });
    
  }
  
  function onError(error:any) {
    console.error(error);
  }
  
  
  var dosomeShit=async()=>{
    accessToken= await AccessToken.getCurrentAccessToken();
    firestore().collection('posts').orderBy('timestamp','desc').limit(20).onSnapshot(onResult, onError);
   
  
  }


   var addFieldToDB=async()=>{
    firestore()
    .collection('users').doc(auth().currentUser?.uid).collection("info").doc("0")
    .set({
      name: auth().currentUser?.displayName,
      verifiedEmail:auth().currentUser?.email,
      photoURL:auth().currentUser?.photoURL,
      uid:auth().currentUser?.uid,
      phoneNumber:auth().currentUser?.phoneNumber
    })
    .then(() => {
      console.log('User info added into firestore!');
    });
    +new Date
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
     setStt("");
      console.log('Post added!');
    });
   }
   function timeDifference(current:any, previous:any) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;
    if (elapsed < 0) {
      return 'just now';   
 }
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


      var sendLikeToPost= async(id:string,like:number)=>{
       var uid= await  auth().currentUser?.uid as any; 
        firestore()
    .collection("post-likers").doc(id).collection("0").doc(uid)
    .set({
     "liked":like==1?1:0,
    })
    .then(() => {
      console.log('sent like!');
    });
      }


 var updateLiked=( id:string,like:number)=>{
   var tempList=data;
  
   var index =0;
  for(var i=0;i<tempList.length;i++){
     if(tempList[i].id==id){
      
      tempList[i].liked=like==0?1:0;
      tempList[i].likecount+= like==0?1:-1;

      //console.log(tempList[i].likecount)
      setData(tempList);
      +new Date
      setrd( Date.now);//dont know why flatlist wont update so i decided to do some weird thing to update itself
     // console.log(data);
      return;
     }
     
   }
   
   
 }

  const renderItem = ({item}:any) => {
    var iconName="heart-outline";
    var iconColor="#636363"
   if(item.liked==1){
     iconName="heart-circle-outline";
     iconColor="#f41e42"
   }
    
   
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

     <Text style={{fontStyle:"italic",marginBottom:2}}>{timeDifference( Date.now(),item.timestamp)}</Text>
     </View>
     </View>
     <Text  style={{marginTop:5,fontSize:15}}>{item.content + item.likecount}</Text>
     <View  style={{marginTop:5,marginBottom:3,width:"100%",height:2,backgroundColor:"#cdccd2",alignSelf:"center"}}/>


     
  <View  style={{width:"100%",height:30,flexDirection:"row" ,justifyContent:"space-around"}}>
      
 <TouchableOpacity
 
 style={{paddingLeft:20,paddingRight:20}}
  onPress={()=>{
    // console.log(item.liked);
     updateLiked(item.id,item.liked);
      sendLikeToPost(item.id,item.liked);
  }
    //console.log(liked)
    }
 >
  <Icon style={{margin:0}} name= {iconName} color={iconColor}  size={27} />

  
  </TouchableOpacity>
  <TouchableOpacity
 
 style={{paddingLeft:20,paddingRight:20}}
  onPress={()=>{
   
  }
    //console.log(liked)
    }
 >
  <Icon  name="chatbox-ellipses-outline" color="#636363"  size={27} />
  </TouchableOpacity>
  <TouchableOpacity
 
 style={{paddingLeft:20,paddingRight:20}}
  onPress={()=>{
    // console.log(item.liked);
     updateLiked(item.id,item.liked);
      sendLikeToPost(item.id,item.liked);
  }
    //console.log(liked)
    }
 >
  <Icon  name="share-social-outline" color="#636363"  size={27} />
  </TouchableOpacity>


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
onPress={()=>{auth().signOut().then(() => {
 navigation.navigate("Login")
LoginManager.logOut()


  }
);
}}
></Button>
      
       
       


      </View>

    
        <FlatList
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={
          <View style={{flexDirection:"row",}}>
          <Input
          containerStyle={{flex:8}}
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
        <Button
          buttonStyle={{ width: 80,height:80}}
          containerStyle={{ margin: 4 ,flex:2,justifyContent:"center" }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F"
          }}
          disabledTitleStyle={{ color: "#00F" }}
          iconContainerStyle={{ backgroundColor: "#000" }}
          loadingProps={{ animating: true }}
          onPress={() => {
          //  var data2=data;
          //  data2[0].content="lzo";
           // setData(data2);
             addFieldToDB() 


          }
            
           
          }
          title="Share now"
          titleStyle={{ marginHorizontal: 10 }}
        />
    
    
    </View>

        }
        data={data}
        extraData={randomshit}
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


