/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Depednencies
import { Auth, OAUTH2 } from "../mod.ts";

// Errors
import { TwitchError } from "../errors/mod.ts";

// Types
import { TwitchExchange, TwitchUser } from "../types/mod.ts";

// Constants
const OAUTH_BASE_URL = "https://id.twitch.tv";
const API_BASE_URL = "https://api.twitch.tv";

// Twitch Class
class Twitch extends OAUTH2 {
  public static exchange = async (code: string): Promise<TwitchExchange> => {
    const { client_id, client_secret, redirect_uri, scopes } = Auth.get("twitch")!;

    const response = <TwitchExchange>await this._exchange(`${OAUTH_BASE_URL}/oauth2/token`, {
      grant_type: "authorization_code",
      client_id, client_secret, redirect_uri,
      code
    });

    if(response.error)
      throw new TwitchError(response.error);

    if(!response.access_token || !response.refresh_token)
      throw new TwitchError("Unable to exchange - please try again later!");

    const _scopes = response.scopes;

    if(!scopes.every((scope: string) => _scopes.indexOf(scope) !== -1))
      throw new TwitchError("Please ensure you've provided a valid scope!")

    return response;
  }

  public static getUser = async (access_token: string): Promise<TwitchUser | null> => {
    const response = await fetch(`${API_BASE_URL}/helix/users`, {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Client-ID": (Auth.get("twitch"))!.client_id,
      }
    }), body = await response.json();

    const [ user ] = body.data;

    if(!user)
      return null;

    return user;
  }
}

export default Twitch;