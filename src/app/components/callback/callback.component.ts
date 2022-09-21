import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify-service/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
      private activatedRoute: ActivatedRoute,
      public spotifyService: SpotifyService,
      private router: Router
    ) { 
      this.activatedRoute.queryParams.subscribe(
        res => {
          this.spotifyService.authorisation_code = res['code'];
          this.spotifyService.access_code()
          this.router.navigate(['/api'])
        }
      )
  }

  ngOnInit(): void {
  }

}
