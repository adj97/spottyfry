import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private httpClient: HttpClient) { }

  authorisation_code: string = ""
  redirect_uri: string = "http://localhost:4200/callback"
  client_id: string = "9b609df3c42f4b278a3dd060723f39be"
  client_secret: string = "c9122e919d4249e1b4a64df9354aa1f3"
  scope: string = "user-read-private user-read-email"

  access_token: string = ""
  access_token_expiry: string = ""
  token_type: string = ""

  auth_code(){
    let url = "https://accounts.spotify.com/authorize?"
    url += `client_id=${this.client_id}`
    url += `&redirect_uri=${this.redirect_uri}`
    url += "&response_type=code"
    url += `&scope=${this.scope}`
    url += "&state=esreiuhger98363bgreiu"

    window.location.href = url;
  }

  async access_code(){
    let url = "https://accounts.spotify.com/api/token"
    let body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('redirect_uri', this.redirect_uri)
      .set('code', this.authorisation_code);
    let headers = new HttpHeaders()
      .set( 'Authorization', 'Basic ' + window.btoa(this.client_id + ':' + this.client_secret))
      .set('Content-Type', 'application/x-www-form-urlencoded')

    await firstValueFrom(
      this.httpClient.post(url, body.toString(), {headers})
    ).then(
      (res: any) => {
        this.access_token = res.access_token
        this.access_token_expiry = res.expires_in
        this.token_type = res.token_type
        console.log(res)
      }
    );
  }
}
