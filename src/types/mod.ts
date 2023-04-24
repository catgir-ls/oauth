/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Interfaces
export interface Tokens {
  access_token: string,
  refresh_token: string
}

export interface BaseConfig {
  client_id: string,
  client_secret: string,
  redirect_uri: string
}

export interface DiscordExchange extends Tokens {
  error?: string,
  token_type?: string,
  scope?: string,
  expires_in?: number,
  scopes: string[], // We convert scope -> scopes in `Discord.exchange()` 
}

export interface TwitchExchange extends Tokens {
  error?: string,
  scopes: string[]
}

export interface DiscordConfig extends BaseConfig { }
export interface TwitchConfig extends BaseConfig { }

// Types
export type Config = {
  discord?: DiscordConfig,
  twitch?: TwitchConfig
}

export type TwitchUser = {
  id: number,
  login: string,
  display_name: string,
  type: string,
  broadcaster_type: string,
  description: string,
  profile_image_url: string,
  offline_image_url: string,
  view_count: number,
  created_at: string
}

// External Types
export type { RequestEvent, Handler, NextFunction } from "https://deno.land/x/nhttp@1.2.11/mod.ts";