/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Types
import { DiscordExchange, type RequestEvent } from "@src/types";

declare global {
  interface Request extends RequestEvent {
    discord: DiscordExchange
  }
}