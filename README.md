<div align="center">
    <h1>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/sxR2H0t.png">
        <source media="(prefers-color-scheme: light)" srcset="https://i.imgur.com/jTBbQKX.png">
        <img alt="logo" src="https://i.imgur.com/sxR2H0t.png" width="300px">
      </picture>
      <br />
      oauth
    </h1>
    <p>🔐 OAUTH middlewares for nhttp written in TypeScript</p>
</div>

> ### Example ✨
```ts
import { NHttp } from "https://deno.land/x/nhttp@1.2.11/mod.ts";
import { Controller, Get, Post, Wares } from "https://deno.land/x/nhttp@1.2.11/lib/controller.ts";

import {
  Auth,
  DiscordMiddleware
  
  type RequestEvent
} from "./src/mod.ts";

Auth.init({
  discord: {
    client_id: "",
    client_secret: "",
    redirect_uri: "http://localhost:3000/oauth/discord"
  }
});

@Controller("/oauth")
class OAUTHController {
  @Wares(DiscordMiddleware)
  @Get("/discord")
  get_index({ response: res, request: req }: RequestEvent) {
    return res.status(200).json({
      data: req.discord
    });
  }
}

class Application extends NHttp {
  constructor() {
    super();

    this.use("/", [
      new OAUTHController()
    ]);
  }
}

new Application().listen(3000);
```
> ### Contributing ✨
#### If you'd like to contribute, feel free to open a PR