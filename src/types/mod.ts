/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Interfaces
export interface Tokens {
  access_token?: string,
  refresh_token?: string
}

export interface DiscordExchange extends Tokens {
  error?: string,
  token_type?: string,
  scope?: string,
  expires_in?: number,
  scopes: string[], // We convert scope -> scopes in `Discord.exchange()` 
}

// Types
export type Config = {
  discord?: DiscordConfig
}

export type DiscordConfig = {
  client_id: string,
  client_secret: string,
  redirect_uri: string
}

// External Types
export type { RequestEvent, Handler, NextFunction } from "https://deno.land/x/nhttp@1.2.11/mod.ts";