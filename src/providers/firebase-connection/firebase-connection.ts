import { Injectable } from '@angular/core';

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
  database = firebase.database();
  authenticate = firebase.auth();

  dbRef;
  currentUserID;

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
forgotUserPassword(email:any){
  return this.authenticate.sendPasswordResetEmail(email);
}
}