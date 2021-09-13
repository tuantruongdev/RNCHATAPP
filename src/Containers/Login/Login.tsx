import React, { useState,useEffect, Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { Button,Input,Image  } from "react-native-elements";
import {

  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,

} from 'react-native'

import { Brand } from '@/Components'
import { useTheme } from '@/Theme'
import FetchOne from '@/Store/User/FetchOne'
import ChangeTheme from '@/Store/Theme/ChangeTheme'
import { useTranslation } from 'react-i18next'
import { UserState } from '@/Store/User'
import { ThemeState } from '@/Store/Theme'
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { Alert } from 'react-native';

function ButtonSocial(props:any){
  return(
    <View>
    <Button
    buttonStyle={{ width: props.width!=null?props.width:230,backgroundColor:props.buttonColor }}
    containerStyle={{ margin: 3 }}
    disabledStyle={{
      borderWidth: 2,
      borderColor: "#00F"
    }}
    disabledTitleStyle={{ color: "#00F" }}
    linearGradientProps={undefined}
    icon={
      <Icon name={props.icon} size={props.iconsize} color={props.color}/>
    }
    iconContainerStyle={{ backgroundColor: "#000" }}
    loadingProps={{ animating: true }}
    loadingStyle={{}}
    onPress={props.onPress}
    title={props.text}
    titleProps={{}}
    titleStyle={{
      marginHorizontal: 4,
      marginVertical: 3
    }}
  />
  </View>


  );

}



const LoginScreen=({navigation}:any)=>{
  function navigateTomain(){
    navigation.navigate("Main")
  }
    const [initializing, setInitializing] = useState(true);
    var [user, setUser]:any = useState(   {email:"gg"} );
 

    function onAuthStateChanged(user:any) {
        setUser(user);
        
         
        
        if (initializing) setInitializing(false);
      }

    async function onFacebookButtonPress() {
      try{
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
      
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        
        const info=await auth().signInWithCredential(facebookCredential);
        // Sign-in the user with the credential
      console.log("FB login was successfully")
     // navigateTomain()

        return  info ;
    }
    catch{

    }
      }
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
      if (initializing) return null;
    
     if(!user){
        return (
          <View style={{alignItems:"center",height:"100%"}}> 
          
          <View style={{height:"35%",justifyContent:"center"}}>
          <Image
      containerStyle={{}}
      onLongPress={() => console.log("onLongPress()")}
      onPress={() => console.log("onPress()")}
      placeholderStyle={{}}
      transitionDuration={1000}
      source={require("./icon.png")}
      style={{ width: 150, height: 150}}
    />
            
            </View>
          <Input
      containerStyle={{width:380}}
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      inputContainerStyle={{}}

      inputStyle={{marginLeft:10,fontSize:17,fontWeight:"bold"}}
      label="Tên đăng nhập"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="account-outline" size={20} />}
      leftIconContainerStyle={{}}
   
      placeholder="UserName của bạn"
    />
      
      <Input
      containerStyle={{width:380}}
      disabledInputStyle={{ backgroundColor: "#ddd" }}
      inputContainerStyle={{}}
      secureTextEntry={true}
      inputStyle={{marginLeft:10,fontSize:17,fontWeight:"bold"}}
      label="Mật khẩu"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="key-outline" size={20} />}
      leftIconContainerStyle={{}}
   
      placeholder="Password của bạn"
    />

      <ButtonSocial
          text="Đăng nhập với mật khẩu"
          buttonColor="#65b343"
          icon="key"
          iconsize={25}
          color="#FFF"
          onPress={ ()=>{Alert.alert("only facebook login allowed")}}
          width={280}
         />     

       <View style={{flexDirection:"row",height:30,width:"80%",justifyContent:"center",alignItems:"center"}}>
       <View style={{height:2,width:"35%",backgroundColor:"#AFAFAF"}}/>
          <Text style={{paddingLeft:10,paddingRight:10,fontSize:16,fontStyle:"italic",fontWeight:"800"}}>or</Text>
          <View style={{height:2,width:"35%",backgroundColor:"#AFAFAF"}}/>


       </View>
          <ButtonSocial
          text="Login with Facebook"
          buttonColor="#2089dc"
          icon="facebook"
          iconsize={25}
          color="#FFF"
          onPress={ onFacebookButtonPress}
         />
            <ButtonSocial
          text="Login with Google"
          buttonColor="#F33"
          icon="google"
          iconsize={25}
          onPress={navigateTomain}
          color="#FFF"
         />
          </View>
        );
          }
          else{
            navigateTomain()
          }
      
    

       //  auth().signOut().then(() => console.log('User signed out!'));
      
    return(
      
        <View style={{alignContent:"center",flex:1,width:"100%"}}>
    <Text style={{fontSize:20,fontWeight:"bold"}} >Chờ 1 tí ^^</Text>
    </View>
  
    );

}
export default LoginScreen;