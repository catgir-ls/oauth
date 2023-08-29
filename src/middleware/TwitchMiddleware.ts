/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Auth
import { Twitch } from "../auth/mod.ts";

// Errors
import { TwitchError } from "../errors/mod.ts";

// Types
import {
  type Handler,
  type RequestEvent,
  type NextFunction
} from "../types/mod.ts";

const TwitchMiddleware: Handler = async ({
  response: res,
  request: req,
  query
}: RequestEvent, next: NextFunction) => {
  const { code, state } = query;

  if(!code || !state)
    return res.status(400).json({
      status: 400,
      message: "Please provide the \"code\" & \"state\" parameters!",
      data: { }
    });

  try {
    const { access_token, refresh_token, scopes } = await Twitch.exchange(code);

    req.twitch = {
      access_token,
      refresh_token,
      scopes: scopes || [ ],
      state
    };

    next();
  } catch(e) {
    if(e instanceof TwitchError)
      return res.status(400).json({
        status: 400,
        message: e.toString(),
        data: { }
      });

    throw e;
  }
}

export default TwitchMiddleware;