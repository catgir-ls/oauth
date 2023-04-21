/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

const GenericError = (name: string) => class extends Error {
  constructor(message: string) {
    super(message);

    this.name = name;
    this.stack = (<Error>new Error()).stack;
  }
}

export const DiscordError = GenericError("DiscordError");