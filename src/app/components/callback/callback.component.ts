import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify-service/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
      private activatedRoute: ActivatedRoute,
      public spotifyService: SpotifyService
    ) { 
      this.activatedRoute.queryParams.subscribe(
        res => this.spotifyService.authorisation_code = res['code']
      )
  }

  ngOnInit(): void {
  }

}
