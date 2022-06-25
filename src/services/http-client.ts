export interface IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>;
  get(parameters: IHttpClientRequestParameters<string>): Promise<string>;
  post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>;
}

export interface IHttpClientRequestParameters<T> {
  url: string;
  requiresToken: boolean;
  responseType?: 'string' | 'json';
  payload?: T;
}

export const createHttpClient = (): IHttpClient => ({
  get,
  post,
});

const get = async <T>(
  parameters: IHttpClientRequestParameters<T>,
): Promise<T | string> => {
  const { url, responseType } = parameters;

  const response = await fetch(url);

  if (responseType === 'string') {
    return response.text();
  }
  return response.json();
};

const post = async <T>(
  parameters: IHttpClientRequestParameters<T>,
): Promise<T> => {
  const { url, payload } = parameters;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.json();
};
