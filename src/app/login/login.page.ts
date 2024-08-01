import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 loginForm:  FormGroup;
  validation_message = {
    email: [
      {type: "required", message: "Email es obligatorio"},
      {type: "email", message: "Email no válido"}
    ],
    pass: [
      {type: "required", message: "Contraseña es obligatoria"},
      {type: "minlength", message: "Longitud minima 6 caracteres"}
    ]
  }
  errorMessage: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticateService, private navCtrl: NavController, private alertController: AlertController, private storage: Storage) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      pass: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    })
  }

  ngOnInit() {
  }
  loginUser(dataLogin: any){
    console.log(dataLogin)
    this.authService.loginUser(dataLogin).then(res => {
      this.errorMessage = '';
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/menu/home")
    }).catch(err =>{
      this.errorMessage = err;
      this.presentAlert(this.errorMessage);
    })
  }

  async presentAlert(mss: string) {
    const alert = await this.alertController.create({
      header: 'Error de autenticación',
      message: mss,
      buttons: ['OK'],
    });

    await alert.present();
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register')
  }


}
