import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { SongModalPage } from '../song-modal/song-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  slides = [
    { 
        title: "Ángel - Romeo Santos",
        image: "https://static9.claromusica.com/fotos/60536116.jpg",
        album: "ÁNGEL",
        genero: 'Bachata, Música tropical',
     },
     { 
      title: "SERIO CON ESE Q - Anuel Aa"    ,
      image: "https://static7.claromusica.com/fotos/60503968.jpg",
      album: "SERIO CON ESE Q",
      genero: "Reggaetón ",
   },
   { 
    title: "Te doy las gracias - Santiago Cruz",
    image: "https://static1.claromusica.com/fotos/59842928.jpg",
    album: "Te doy las gracias",
    genero: "Pop",
  },
  { 
    title: "Habits - Eminem",
    image: "https://static0.claromusica.com/fotos/59666973.jpg",
    album: "The Death of Slim Shady (Coup De Grâce)",
    genero: "Hip-hop/rap",
  }
  ]


  actoresJson: any
  artistas: any
  song = {
    name : '',
    playing: false,
    preview_url: ''
  }
  currentSong: any = {};
  newTime: any;
  constructor(private modalController: ModalController, private router:Router, private navCtrl: NavController, private musicService: MusicService) {}
  
  goToLogin(){
    this.navCtrl.navigateBack('/login');
  }

  ngOnInit(){
    this.actoresJson = this.musicService.getArtistsJson().artists;
    console.log("Json",this.actoresJson.artists)
  /*  this.musicService.getArtists().subscribe((data:any)=>{
      this.artistas = data
      console.log(this.artistas) //alternativa 1
    }
   )*/
    this.musicService.getArtists().then(data=> {
      this.artistas=data;
      console.log(data) //alternativa 2

  })
}

 async showSongs(artistas:any){
    console.log(artistas)
    const songs = await this.musicService.getTracks(artistas.id);
    const modal = await this.modalController.create(

      {

        component: SongModalPage,
        componentProps: {
          name: artistas.name,
          id: artistas.id,
          songs: songs
        }

      }
    );
    modal.onDidDismiss().then(dataReturned => {
      this.song = dataReturned.data;
    })
    modal.present();
  }
  play(){
    this.currentSong = new Audio (this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate",()=>{
      this.newTime = (1/this.currentSong.duration) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

parseTime(time = "0.00"){
  if(time){
    const parTime = parseInt(time.toString().split(".")[0],10);
    let minutes = Math.floor(parTime/60).toString();
    if (minutes.length == 1){
      minutes = "0"+minutes;
    }
    let seconds = (parTime % 60).toString();
    if (seconds.length == 1){
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds
  }
  return null
}


}