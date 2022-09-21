import { iEnvironment } from "./interfaces/environment";
import { spotify_app_client } from "./secrets/spotify_app_client";

export const environment: iEnvironment = {
  production: true,
  spotify_app_client: spotify_app_client
};
