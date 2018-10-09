import { Injectable } from '@angular/core';
import moment from 'moment'; 

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
  database = firebase.database();
  authenticate = firebase.auth();

  dbRef;
  currentUserID;
  state;

  fetch = new Array();
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


  getUserState(){
    return new Promise((accpt, rej) =>{
      this.authenticate.onAuthStateChanged(user =>{
        if(user != null){
          this.state = 1;
        }
        else{
          this.state = 0;
        }
        accpt(this.state);
        console.log(this.state);
      });
    })
  }

  logout(){
    console.log('exit')
    // var user = firebase.auth().currentUser;
    // var day = moment().format('MMMM Do YYYY, h:mm:ss a');
    this.authenticate.signOut();
  }

  // getAlldata(user){
  //   return new Promise ((accept,reject) => {
  // this.database.ref('events/').on('value', (data: any) => {
  //   var users = data.val()
  //   var userIDs = Object.keys(users);
  //   console.log(userIDs)
  //   var things = Object.keys(userIDs);
  //   console.log(things)
  //   for (var x = 0; x < userIDs.length; x++){
  //     var str1 = new String(userIDs[x]);
  //     var index = str1.indexOf(":");
  //     var username = userIDs[x].substr(0,index);
     
  
  //     if (user == username){
  //       this.database.ref('events/' + userIDs[x]).on('value', (data1: any) => {
  //         var userFound = data1.val();
  //         var keys:any = Object.keys(userFound);
  
  //         for (var q = 0; q < keys.length; q++){
  //           var k = keys[q];
  //           let obj = {
  //             eventName: userFound[k].name,
  //             img: userFound[k].imageURL,
  //             eventDesc: userFound[k].desc,
  //             location: userFound[k].location,
  //             date: userFound[k].date,
  //             startTime: userFound[k].startTime,
  //             fee: userFound[k].fee,
  //             endTime: userFound[k].endTime
  //           }
  //         };
  //       })
  //       break;
  //     }
  //   }
  // }, Error => {
  //   reject(Error.message);
  // })
  //   })
  // }  

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

}