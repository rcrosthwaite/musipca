import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.page.html',
  styleUrls: ['./song-modal.page.scss'],
})
export class SongModalPage implements OnInit {
  artistas_name: any;
  artistas_id: any;
  songs: any;
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.artistas_name = this.navParams.get('name');
    this.artistas_id = this.navParams.get('id');
    this.songs = this.navParams.get('songs');
    console.log("canciones",this.songs);
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async selectSong(song:any){
    await this.modalController.dismiss(song);
  }

}
