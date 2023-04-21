<div align="center">
    <h1><img src="https://i.imgur.com/eId0hE3.png" width="300px"><br />oauth</h1>
    <p>OAUTH middleware's for nhttp written in TypeScript</p>
</div>

> ### Example ✨
```ts

import { NHttp } from "https://deno.land/x/nhttp@1.1.18/mod.ts";
import { BaseController, Controller, Get, addControllers, Wares } from "https://deno.land/x/nhttp_controller@0.7.0/mod.ts";

import { Auth, DiscordMiddleware } from "@src";
import { type RequestEvent } from "@src/types";

Auth.init({
  discord: {
    client_id: "",
    client_secret: "",
    redirect_uri: "http://localhost:3000/oauth/discord"
  }
});

@Controller("/")
class RootController extends BaseController {
  @Wares(DiscordMiddleware)
  @Get("/oauth/discord")
  get_index({ response: res, request: req }: RequestEvent) {
    return res.status(200).json({
      data: req.discord
    });
  }
}

class Application extends NHttp {
  constructor() {
    super();

    this.use(addControllers([ RootController ]));
  }
}

new Application().listen(3000);
```
```
> ### Contributing ✨
#### If you'd like to contribute, feel free to open a PR