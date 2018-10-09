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

}
