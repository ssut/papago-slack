import got, { Got } from 'got';

export class Papago {
  private client: Got;

  public constructor(
    public readonly clientId: string,
    public readonly clientSecret: string,
  ) {
    this.init();
  }

  private init() {
    this.client = got.extend({
      prefixUrl: 'https://openapi.naver.com',
      headers: {
        'X-Naver-Client-Id': this.clientId,
        'X-Naver-Client-Secret': this.clientSecret,
      },
      responseType: 'json',
    });
  }

  public async translate(source: string, target: string, text: string) {
    const response = await this.client.post<any>('v1/papago/n2mt', {
      form: {
        source,
        target,
        text,
      },
    });
    console.info(response.body);

    return (response.body.message?.result?.translatedText ?? null) as
      | string
      | null;
  }

  public async detect(text: string) {
    const response = await this.client.post<{ langCode: string }>(
      'v1/papago/detectLangs',
      {
        form: {
          query: text,
        },
      },
    );

    return response.body.langCode;
  }
}
