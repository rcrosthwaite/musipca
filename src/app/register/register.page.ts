import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticateService } from '../services/authenticate.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validation_message = {
    email: [
      {type: "required", message: "El Email es obligatorio"},
      {type: "email", message: "Email no válido"}
    ],
    pass: [
      {type: "required", message: "El campo contraseña es obligatorio"},
      {type: "minlength", message: "Longitud minima 6 caracteres"}
    ],
    passconfirm: [
      {type: "required", message: "El campo contraseña es obligatorio"},
      {type: "minlength", message: "Longitud minima 6 caracteres"}
    ],
    name: [
      {type: "required", message: "El nombre es obligatorio"},
      {type: "minlength", message: "Longitud minima 2 caracteres"}
    ],
    lastName: [
      {type: "required", message: "El apellido es obligatorio"},
      {type: "minlength", message: "Longitud minima 2 caracteres"}
    ]
  }
  errorMessage: any;
  constructor(private formBuilder:FormBuilder,private navCtrl: NavController, private storage: Storage, private authService: AuthenticateService) {

    this.registerForm = this.formBuilder.group({
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
      ),

        passconfirm: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6)
          ])
        ),


      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength (2)
        ])
      ),
      lastName: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength (2)
        ])
      )
    })
   }

  ngOnInit() {
  }

  goToLogin(){
    this.navCtrl.navigateBack('/login');
  }
  register(registerData: any){
    console.log(registerData);
    this.authService.registerUser(registerData).then(res =>{
      this.navCtrl.navigateBack('/login')
    })
  }

}
