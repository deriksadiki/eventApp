import { Injectable } from '@angular/core';

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
  database = firebase.database();
  authenticate = firebase.auth();

  username;
  dbRef;
  goings = new Array();
  currentUserID;
  fetch = new Array();
  go = new Array();
  image;
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

  Goings(eventName,eventDesc,startTIme,endTIme,date,location,img,fee){
    var user = firebase.auth().currentUser;
    firebase.database().ref('goings/' + user.uid).push({
  amount:fee,
  day:date,
  desc: eventDesc,
  name: eventName,
  end: endTIme,
  start: startTIme,
  venue:location,
  image:img


    });
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
this.go.length = 0;
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
          end: events[k].endTIme,
          desc: events[k].eventDesc,
          eventName: events[k].eventName,
          amount: events[k].fee,
          img: events[k].img,
          location: events[k].location,
          start: events[k].startTIme
        }
        this.go.push(obj)
      }
      accept(this.go);
      console.log(this.go)
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

getALlGoings(){
  return new Promise((accept,reject) => {
    this.fetch.length = 0;
    this.database.ref('goings/').on('value', (data: any) => {
      var users = data.val();
      var userIDs = Object.keys(users);
      for(var i = 0; i < userIDs.length; i++){
        var k = userIDs[i];
        var n = 'goings/' + k;
        console.log(n);

        this.database.ref(n).on('value', (data2:any) =>{
          var fav = data2.val();
          console.log(fav);
          var keys = Object.keys(fav);
          for(var a = 0;a < keys.length;a++){
            var k = keys[a];

            let obj = {
              end: fav[k].end,
              desc: fav[k].desc,
              eventName: fav[k].name,
              amount: fav[k].amount,
              img: fav[k].image,
              location: fav[k].venue,
              start: fav[k].start,
              date: fav[k].day
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
}