import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slides = [
    { 
        title: "Gato",
        icon: "game-controller-outline",
        avatar: "https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg",
        image: "https://scontent-bog2-2.xx.fbcdn.net/v/t39.30808-1/255068823_273708308099261_9158662997824923348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGwwOLN1A1kR3_qhuEaXd_aX8Lrztk6ASVfwuvO2ToBJcd8coVwbigCLNvjXOoRXrw&_nc_ohc=NBEdAJZn-L0Q7kNvgGlMF-U&_nc_ht=scontent-bog2-2.xx&oh=00_AYC0hAozP0ohRHdNRMR9bj_Os9YKJmSJ12kTP6Web5wMZw&oe=6697881C",
        description: "es un gato",
     },
     { 
      title: "Slide 2",
      icon: "game-controller-outline",
      avatar: "https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg",
      image: "https://elcuartoplayer.com/wp-content/uploads/2021/05/resident-evil-village-barney-el-dinosaurio-mod.jpg",
      description: "Es el slide 2",
   },
   { 
    title: "Perro",
    icon: "game-controller-outline",
    avatar: "https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg",
    image: "https://elcuartoplayer.com/wp-content/uploads/2020/10/perro-disfrazado-de-magikarp.jpg",
    description: "Es un perro",
  }
  ]
  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }
  close(){
    this.storage.set("isIntroShowe", true)
    this.router.navigateByUrl("/home")
  } 
}
