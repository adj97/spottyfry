import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify-service/spotify.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor(
    public spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
  }

}
