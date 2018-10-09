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

  getAlldata(user){
    return new Promise ((accept,reject) => {
  this.database.ref('events/').on('value', (data: any) => {
    var users = data.val()
    var userIDs = Object.keys(users);
    console.log(userIDs)
    var things = Object.keys(userIDs);
    console.log(things)
    for (var x = 0; x < userIDs.length; x++){
      var str1 = new String(userIDs[x]);
      var index = str1.indexOf(":");
      var username = userIDs[x].substr(0,index);
     
  
      if (user == username){
        this.database.ref('events/' + userIDs[x]).on('value', (data1: any) => {
          var userFound = data1.val();
          var keys:any = Object.keys(userFound);
  
          for (var q = 0; q < keys.length; q++){
            var k = keys[q];
            let obj = {
              eventName: userFound[k].name,
              img: userFound[k].imageURL,
              eventDesc: userFound[k].desc,
              location: userFound[k].location,
              date: userFound[k].date,
              startTime: userFound[k].startTime,
              fee: userFound[k].fee,
              endTime: userFound[k].endTime
            }
          };
        })
        break;
      }
    }
  }, Error => {
    reject(Error.message);
  })
    })
  }  

}
