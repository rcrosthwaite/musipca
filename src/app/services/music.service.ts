import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as dataArtist from "./artists.json";

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  urlServer = "https://music.fly.dev"
  httpHeaders = { headers: new HttpHeaders({"Content-Type":"application/json"})};
  constructor( 
    private http: HttpClient 
  ) { }

  getArtistsJson(){
    return dataArtist;
  }

  getArtists(){
    //return this.http.get(`${this.urlServer}/artists`, this.httpHeaders) //alternativa 1
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json() //alternativa 2
    )
  }
  getTracks(artistas_id:number){
    return fetch(`${this.urlServer}/tracks/artist/${artistas_id}`).then(
      response => response.json()
    )
  }
}

