/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// OAUTH2 Class
class OAUTH2 {
  public static _exchange = async <T>(
    url: string,
    body: Record<string, string>
  ): Promise<T> => <T>await(await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(body).toString()
  })).json();
}

export default OAUTH2;