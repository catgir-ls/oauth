/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Depednencies
import { Auth, OAUTH2 } from "@src";

// Errors
import { DiscordError } from "@src/errors";

// Types
import { DiscordExchange } from "@src/types";

// Constants
const BASE_URL = "https://discord.com/api/v10";

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

  public static getUser = () => true;
}

export default Discord;