import { Injectable } from '@angular/core';

declare var firebase;
@Injectable()
export class FirebaseConnectionProvider {
authnticate = firebase.auth()

  constructor() {
    console.log('Hello FirebaseConnectionProvider Provider');
  }
login(email,password){
  return new Promise((accept,reject) =>{
    this.authnticate.signInWithEmailAndPassword(email, password).then(() =>{
      accept("Success")
    }, Error =>{
      reject(Error.message)
    })
  })
}
}
