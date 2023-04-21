/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Dependencies
import OAUTH2 from "./OAUTH2.ts";

// Types
import { type Config } from "@src/types";

// Auth Class
class Auth {
  public static config: Config = { };

  public static init = (config: Config) => this.config = config;
  public static get = (config: keyof Config) => this.config[config];
}

export { Auth, OAUTH2 };
export * from "@src/middleware";