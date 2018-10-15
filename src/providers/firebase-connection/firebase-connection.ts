import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { unescapeIdentifier } from '@angular/compiler';

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
  username;
  userKey;
  img;
  fetch = new Array();
  comments = new Array();
  newEvents =  new Array();
  profile = new Array();
  currentUserID;
  defaultImages = ['../../assets/imgs/pic.jpg','../../assets/imgs/pic23.jpg','../../assets/imgs/pic24.jpg', '../../assets/imgs/pic22.jpg','../../assets/imgs/pic25.jpg']
  constructor() {
  }

  registerUser(email,password,Username){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;
        this.dbRef = 'users/' + user.uid;
        this.database.ref(this.dbRef).push({
          Username: Username,
          img : this.defaultImages[Math.floor(Math.random() * 4)],
          userType: "User"
        })
        accpt("user Registered")
      },Error => {
        rej(Error.message);
      })
    })
  }


  UpdateProfile(Username,img){
    return new Promise ((accpt,rej) =>{
      var path = 'users/' + this.currentUserID + '/' + this.userKey;
      console.log(path)
      this.database.ref(path).update({
        Username: Username,
        img: img
      })
      accpt('succes!')
    })
  }


  logout(){
    console.log('exit')
    this.authenticate.signOut();
  }


  getALlGoings(){
    return new Promise((accept,reject) => {
      this.fetch.length = 0;
      var user = firebase.auth().currentUser;
      this.database.ref('goings/' + user.uid).on('value', (data: any) => {
        if (data.val() != undefined){
          var events =  data.val();
          var eventKeys = Object.keys(events);
          for (var i = 0; i < eventKeys.length; i++){
            var favEventKey = eventKeys[i];
            this.database.ref('events/' + events[favEventKey].hostname + '/' + events[favEventKey].key).on('value', (data2: any) => {
              var fav = data2.val();
              console.log(fav.endTIme)
                    let obj = {
                      endTIme: fav.endTIme,
                      eventDesc: fav.eventDesc,
                      eventName: fav.eventName,
                      fee: fav.fee,
                      img: fav.img,
                      location: fav.location,
                      startTIme: fav.startTIme,
                      date: moment(fav.date).format('MMM Do, YYYY'),
                      hostimg : fav.hostImg,
                      key : favEventKey,
                      hostname : events[favEventKey].hostname,
                      enddate : moment(fav.endDate).format('MMM Do, YYYY')
                    }
                    this.fetch.push(obj)
                  console.log(this.fetch)
                  accept(this.fetch);
            }, Error =>{
              reject(Error.message);
            })  
          }
        }
      }, Error => {
        reject(Error.message);
      })
    })
  }
  

  registerBusiness(email,password,userName,companyName,location, img){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;
        this.dbRef = 'users/' + user.uid;
        this.database.ref(this.dbRef).push({
          CompanyName: companyName,
          companyOwner : userName,
          location: location,
          img : img
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

getColourState(key){
  return new Promise ((accpt,rej) =>{
    var user = firebase.auth().currentUser;
    this.database.ref('goings/' + user.uid).on('value', (data2: any) => {
      var details = data2.val();
      if (details != null ||  details != undefined){
        var keys =  Object.keys(details);
        var size = keys.length;
        var results = "";
        for (var x = 0; x < size; x++){
          this.database.ref('goings/' + user.uid + '/' + keys[x]).on('value', (data: any) => {
          var events =  data.val();
          if (events != undefined){
            if (events.key == key){
              results = "found";
              accpt(results);
            }
            else{
              results = "not found";
            }
          }
        })
          }
          accpt(results);
      }
      else{
      
        results = "not found";
        accpt(results);
      }
    })
  })
}

removeFromFav(key){
  console.log('its me')
  return new Promise ((accpt,rej) =>{
    var user = firebase.auth().currentUser;
    this.database.ref('goings/' + user.uid).on('value', (data2: any) => {
      var details = data2.val();
      if (details != null ||  details != undefined){
        var keys =  Object.keys(details);
        var size = keys.length;
        for (var x = 0; x < size; x++){
          this.database.ref('goings/' + user.uid + '/' + keys[x]).on('value', (data: any) => {
          if (data.val() != undefined){
            var events =  data.val();
            if (events.key == key){
              this.database.ref('goings/' + user.uid + '/' + keys[x]).remove();
            }
          }
          })
        }
        accpt('removed');
      }
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
    this.database.ref(y).on('value', (data2:any) =>{
      var events = data2.val();
      var keys = Object.keys(events);
      for(var a = 0;a < keys.length;a++){
        var k = keys[a];
        let obj = {
          date: moment(events[k].date).format('MMM Do, YYYY'),
          endTIme: events[k].endTIme,
          eventDesc: events[k].eventDesc,
          eventName: events[k].eventName,
          fee: events[k].fee,
          key : k,
          hostname: k2,
          img: events[k].img,
          location: events[k].location,
          startTIme: events[k].startTIme,
          going: events[k].going,
          comments: events[k].comments,
          hostimg : events[k].hostImg,
          enddate : moment(events[k].endDate).format('MMM Do, YYYY')
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






getNewEvents(){
  return new Promise((accpt,rej) =>{
    this.database.ref('NewEvents/').on('value', (data:any) =>{
      if (data.val() != null || data.val() != undefined){
        var events =  data.val();
        var keys = Object.keys(data.val());
        for (var x = 0; x < keys.length; x++){
          var k = keys[x];
          let obj = {
            date : events[k].date,
            name :  events[k].name,
            eventName : events[k].eventName,
            key :  k,
            img : events[k].img
          }
          this.newEvents.push(obj)
        }
        console.log(this.newEvents)
        accpt(this.newEvents)
      }
      else{
        rej('no new ')
      }
    })
  })
 }

 storeUserName(name){
  this.username = name;
  }

  getuser(){
    return new Promise ((accpt,rej)=>{
      this.username = "";
      this.img = "";
      this.database.ref('users').on('value', (data: any) => {
        var users =  data.val();
        var user = firebase.auth().currentUser;
        var  userIDs = Object.keys(users);
        for (var x = 0; x < userIDs.length; x++){
          var str1 = new String( userIDs[x]); 
          var index = str1.indexOf( ":" ); 
          var currentUserID = userIDs[x].substr(index + 1);
          if (user.uid == currentUserID){


            this.storeUsername(userIDs[x].substr(0,index));
            this.database.ref('users/' + userIDs[x]).on('value', (data: any) => {
              var Userdetails = data.val(); 
              this.storeUserID(userIDs[x]);
              var keys2:any = Object.keys(Userdetails);
              var user = firebase.auth().currentUser;
              this.storeCurrentUserImage(Userdetails[keys2[0]].img);
              this.storeCurrentUsername(Userdetails[keys2[0]].Username);
              this.storeUserKey(keys2[0])
              this.storeCurrentUserPath(userIDs[x])
              accpt(Userdetails[keys2])
            })
            break
          }
        }
      })
    })
   }

   storeUsername(username){


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

   storeUserKey(key){
    this.userKey = key
   }

   storeUserID(uid){
    this.currentUserID = uid;
  }

getProfile(){
  return new Promise((accpt,rej)=>{
    this.profile.length = 0;
    console.log(this.currentUserID);
    this.database.ref('users/' + this.currentUserID ).on('value',(data2:any)=>{
      var details = data2.val();
      console.log(details)
      var keys = Object.keys(details);
      console.log(keys)
      for (var x = 0;x < keys.length;x++){
        var k = keys[x];
        console.log(k)
        let obj ={
          username: details[k].Username,
          img: details[k].img,
          userType: details[k].userType,
          key: k
        }
        this.profile.push(obj);
      }
      accpt(this.profile)
      console.log(this.profile)
    })
  })
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
Goings(eventName, eventKey){
  var user = firebase.auth().currentUser;
  firebase.database().ref('goings/' + user.uid).push({
        key :  eventKey,
        hostname :  eventName
  });
} 

}