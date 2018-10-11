import { Injectable } from '@angular/core';
import * as moment from 'moment'

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
  database = firebase.database();
  authenticate = firebase.auth();
  state ;

  dbRef;
  currentUserName;
  currentUserImage;
  currentUserPath;
  fetch = new Array();
  comments = new Array();
  defaultImages = ['../../assets/imgs/pic.jpg','../../assets/imgs/pic23.jpg','../../assets/imgs/pic24.jpg', '../../assets/imgs/pic22.jpg','../../assets/imgs/pic25.jpg']
  constructor() {
  }

  registerUser(email,password,userName){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;
        var img = '../../assets/imgs/pic23.jpg';
        this.dbRef = 'users/' + userName + ":" + user.uid;
        this.database.ref(this.dbRef).push({
          Username: userName,
          img : this.defaultImages[Math.floor(Math.random() * 4)]
        })
        accpt("user Registered")
      },Error => {
        rej(Error.message);
      })
    })
  }

  registerBusiness(email,password,userName,companyName,location){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;
        this.dbRef = 'users/' + userName + ":" + user.uid;
        this.database.ref(this.dbRef).push({
          CompanyName: companyName,
          Location: location
        })
        accpt("success!");
      },Error =>{
        rej(Error.message);
        console.log(Error.message);
      })
    })
  }

  forgotPassword(email:any){
    return this.authenticate.sendPasswordResetEmail(email);
  }

  getUserSatate(){
    return new Promise ((accpt, rej) =>{ 
      this.authenticate.onAuthStateChanged(user =>{ 
        if (user != null){
          this.state = 1;
        }
        else{
        this.state = 0;
        }
        accpt(this.state);
       });
    })
  }

login(email,password){
  return new Promise((accept,reject) =>{
    this.authenticate.signInWithEmailAndPassword(email, password).then(() =>{
      accept("Success")
    }, Error =>{
      reject(Error.message);
      console.log(Error.message);
    })
  })
}

getAlldata(){
return new Promise ((accept,reject) => {
this.fetch.length = 0;
this.database.ref('events/').on('value', (data: any) => {
  var users = data.val();
  var userIDs = Object.keys(users);
  for(var i = 0; i < userIDs.length;i++){
    var k2 = userIDs[i];
    var y = 'events/' + k2;
    console.log(y)
    this.database.ref(y).on('value', (data2:any) =>{
      var events = data2.val();
      console.log(events);
      var keys = Object.keys(events);
      for(var a = 0;a < keys.length;a++){
        var k = keys[a];
        let obj = {
          date: events[k].date,
          endTIme: events[k].endTIme,
          eventDesc: events[k].eventDesc,
          eventName: events[k].eventName,
          fee: events[k].fee,
          key : k,
          hostname: k2,
          img: events[k].img,
          location: events[k].location,
          startTIme: events[k].startTIme,
          going: events[k].going
        }
        this.fetch.push(obj)
      }
      accept(this.fetch);
      console.log(this.fetch)
    })
  }

}, Error => {
  reject(Error.message);
})
  })
}

going(key, name, going){
  var numGoing = going + 1;
  return new Promise((accpt, rej) =>{
  this.database.ref('events/' + name + '/' + key).update({going: numGoing})
})
}

getuser(){
 //this.authenticate.signOut();
  this.database.ref('users').on('value', (data: any) => {
    var users =  data.val();
    var user = firebase.auth().currentUser;
    var  userIDs = Object.keys(users);
    for (var x = 0; x < userIDs.length; x++){
      var str1 = new String( userIDs[x]); 
      var index = str1.indexOf( ":" ); 
      var currentUserID = userIDs[x].substr(index + 1);
      if (user.uid == currentUserID){
        this.database.ref('users/' + userIDs[x]).on('value', (data: any) => {
          var Userdetails = data.val(); 
          var keys2:any = Object.keys(Userdetails);
          this.storeCurrentUserImage(Userdetails[keys2[0]].img);
          this.storeCurrentUsername(Userdetails[keys2[0]].Username);
          this.storeCurrentUserPath(userIDs[x])
        })
        break;
      }
    }
  })
}

storeCurrentUsername(username){
this.currentUserName =  username;
}

storeCurrentUserImage(img){
this.currentUserImage = img;
}

storeCurrentUserPath(path){
this.currentUserPath = path;
}

comment(text,key){
  return new Promise((accpt, rej) =>{
    var day = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.database.ref('comments/' +  key).push({
      text:text,
      username: this.currentUserName,
      date : day,
      img : this.currentUserImage
    })
    accpt("comment added")
  })
}


getComments(key){
  return new Promise ((accpt,rej) =>{
    this.comments.length = 0;
    this.database.ref('comments/' + key).on('value', (data2: any) => {
      var details = data2.val();
      if (details != null ||  details != undefined){
        this.comments.length = 0;
        var keys = Object.keys(details) 
        for (var x =0; x < keys.length; x++){
          var key = keys[x];
          let obj = {
            date :moment( details[key].date,'MMMM Do YYYY, h:mm:ss a').startOf('minutes').fromNow(),
            text :  details[key].text,
            name : details[key].username,
            img: details[key].img
          }
          this.comments.push(obj)
        }
          accpt(this.comments);
          console.log(this.comments);
      }
      })
  })
}

addNumComments(key, numComments, user){
  var num =  numComments  + 1;
  this.database.ref('events/' + user+ "/"+ key).update({comments: num});
  console.log("comment number added")
}

}