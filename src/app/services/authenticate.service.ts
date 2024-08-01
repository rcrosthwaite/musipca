import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }
  loginUser(credentials: any){
    return new Promise ((accept, reject)=>{
      if (
        credentials.email == "renealfcros@hotmail.com"
        &&
        credentials.pass == "123456"
      ){
        accept("Login Correcto")
      }else{
        reject("Usuario o contraseña incorrectos")
      }

    })
  }
  registerUser(registerData: any){
    registerData.pass = btoa(registerData.pass)
    registerData.passconfirm = btoa(registerData.passconfirm)
    return this.storage.set("user", registerData);
  }
}
