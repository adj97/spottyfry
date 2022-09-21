import { iAppClient } from "./appclient";

export interface iEnvironment {
    production: Boolean,
    spotify_app_client: iAppClient
}