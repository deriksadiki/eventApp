import { Injectable } from '@angular/core';

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
  database = firebase.database();
  authenticate = firebase.auth();

  dbRef;
  currentUserID;
  fetch = new Array();
  newEvents = new Array();
  constructor() {
  }

  registerUser(email,password,userName){
    return new Promise((accpt,rej) =>{
      this.authenticate.createUserWithEmailAndPassword(email,password).then(() =>{
        var user = firebase.auth().currentUser;
        this.dbRef = 'users/' + userName + ":" + user.uid;
        this.database.ref(this.dbRef).push({
          Username: userName,
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
    var k = userIDs[i];
    var y = 'events/' + k;
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
          img: events[k].img,
          location: events[k].location,
          startTIme: events[k].startTIme
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
        var keys = Object.keys(data.val);
        for (var x = 0; x < keys.length; x++){
          var k = keys[x];
          let obj = {
            date : events[k].date,
            name :  events[k].name,
            eventName : events[k].eventName
          }
          this.newEvents.push(obj)
        }
        accpt(this.newEvents)
      }
      else{
        rej('no new events')
      }
    })
  })
}
}