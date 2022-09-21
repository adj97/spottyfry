import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private httpClient: HttpClient) { }

  authorisation_code: string = ""
  redirect_uri: string = "http://localhost:4200/callback"
  client_id: string = environment.spotify_app_client.id
  client_secret: string = environment.spotify_app_client.secret
  scopes: string[] = ["user-read-private", "user-read-email"]

  access_token: string = ""
  access_token_expiry: string = ""
  token_type: string = ""
  refresh_token: string = ""

  auth_code(){
    let url = "https://accounts.spotify.com/authorize?"
    url += `client_id=${this.client_id}`
    url += `&redirect_uri=${this.redirect_uri}`
    url += "&response_type=code"
    url += `&scope=${this.scopes.join(" ")}`
    url += '&state=3n8sh3bc7f49'

    window.location.href = url;
  }

  async access_code(){
    let url = "https://accounts.spotify.com/api/token"
    let body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', this.redirect_uri)
      .set('code', this.authorisation_code);
    let headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + window.btoa(this.client_id + ':' + this.client_secret))
      .set('Content-Type', 'application/x-www-form-urlencoded')

    await firstValueFrom(
      this.httpClient.post(url, body.toString(), {headers})
    ).then(
      (res: any) => {
        this.access_token = res.access_token
        this.access_token_expiry = res.expires_in
        this.token_type = res.token_type
        this.refresh_token = res.refresh_token
      }
    );
  }

  current_user!: object
  playlists!: object

  async get_user(){
    let url = "https://api.spotify.com/v1/me"
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token)

    await firstValueFrom(
      this.httpClient.get(url, {headers})
    ).then(
      (res) => {
        this.current_user = res
      }
    )
  }

  async get_user_playlists(){
    let url = "https://api.spotify.com/v1/me/playlists"
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token)

    await firstValueFrom(
      this.httpClient.get(url, {headers})
    ).then(
      (res) => {
        this.playlists = res
      }
    )
  }
}
