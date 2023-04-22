/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Auth
import { Discord } from "../auth/mod.ts";

// Errors
import { DiscordError } from "../errors/mod.ts";

// Types
import {
  type Handler,
  type RequestEvent,
  type NextFunction
} from "../types/mod.ts";

const DiscordMiddleware: Handler = async ({
  response: res,
  request: req,
  query
}: RequestEvent, next: NextFunction) => {
  const { code } = query;

  if(!code)
    return res.status(400).json({
      status: 400,
      message: "Please provide the \"code\" parameter!",
      data: { }
    });

  try {
    const { access_token, refresh_token, scopes } = await Discord.exchange(code);

    if(!scopes.includes("identify") || !scopes.includes("role_connections.write"))
      return res.status(400).json({
        status: 400,
        message: "Please ensure you've provided a valid scope!",
        data: {}
      });

    req.discord = {
      access_token,
      refresh_token,
      scopes
    }

    next();
  } catch(e) {
    if(e instanceof DiscordError)
      return res.status(400).json({
        status: 400,
        message: e.toString(),
        data: { }
      });

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: { }
    })
  }
}

export default DiscordMiddleware;