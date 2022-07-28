export const createHttpClient = (): Services.Http.Client => ({
  get,
  post,
});

const get = async <T>(
  parameters: Services.Http.RequestParameters<T>,
): Promise<T | string> => {
  const { url, responseType } = parameters;

  const response = await fetch(url);

  if (responseType === 'string') {
    return response.text();
  }
  return response.json();
};

const post = async <T>(
  parameters: Services.Http.RequestParameters<T>,
): Promise<T> => {
  const { url, payload } = parameters;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.json();
};
