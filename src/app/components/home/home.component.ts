import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify-service/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public spotifyService: SpotifyService) { }

}
