/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 * 
 * TODO: types, `join()`
 */

// Depednencies
import { Auth, OAUTH2 } from "../mod.ts";

// Errors
import { DiscordError } from "../errors/mod.ts";

// Types
import { DiscordExchange } from "../types/mod.ts";

// Constants
const BASE_URL = "https://discord.com/api/v10";

// Discord Class
class Discord extends OAUTH2 {
  public static exchange = async (
    code: string
  ): Promise<DiscordExchange> => {
    const response = <DiscordExchange>await this._exchange(`${BASE_URL}/oauth2/token`, {
      ...Auth.get("discord"),
      grant_type: "authorization_code",
      code
    });

    if(response.error)
      throw new DiscordError(response.error);

    if(!response.access_token || !response.refresh_token)
      throw new DiscordError("Unable to exchange - please try again later!");

    return {
      ...response,
      scopes: response.scope!.split(" ")
    };
  }

  public static getUser = async (access_token: string) => {
    const response = await fetch(`${BASE_URL}/users/@me`, {
      headers: { "Authorization": `Bearer ${access_token}` }
    }), body = await response.json();

    if(body.message)
      throw new DiscordError(body.message);

    return body;
  }

  public static connect = async (access_token: string, data: Record<string, any>) => {
    const { client_id } = Auth.get("discord")!;
    
    const response = await fetch(`${BASE_URL}/users/@me/applications/${client_id}/role-connection`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }), body = await response.json();

    if(body.message)
      throw new DiscordError(body.message);

    return body;
  }
}

export default Discord;