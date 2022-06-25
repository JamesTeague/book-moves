import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import createMocker from 'vitest-fetch-mock';
import { createHttpClient } from './http-client';
import faker from '@fakerjs/faker';

describe('HttpClient', () => {
  const fetchMock = createMocker(vi);
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.mockClear();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  describe('get', () => {
    it('given a responseType of string returns string', async () => {
      const httpClient = createHttpClient();

      fetchMock.mockResolvedValueOnce(new Response(faker().string()));

      const httpResponse = await httpClient.get({
        url: faker().url(),
        responseType: 'string',
        requiresToken: false,
      });

      expect(typeof httpResponse).toBe('string');
    });

    it('given a responseType of json returns object', async () => {
      const httpClient = createHttpClient();
      const response = new Response(JSON.stringify({ foo: 'bar' }));

      fetchMock.mockResolvedValueOnce(response);

      const httpResponse = await httpClient.get({
        url: faker().url(),
        responseType: 'json',
        requiresToken: false,
      });

      expect(typeof httpResponse).toBe('object');
    });

    it('returns json if no responseType is given', async () => {
      const httpClient = createHttpClient();
      const response = new Response(JSON.stringify({ foo: 'bar' }));

      fetchMock.mockResolvedValueOnce(response);

      const httpResponse = await httpClient.get({
        url: faker().url(),
        requiresToken: false,
      });

      expect(typeof httpResponse).toBe('object');
    });
  });

  describe('post', () => {
    it('given a responseType of string returns string', async () => {
      const fetchSpy = vi.spyOn(global, 'fetch');
      const httpClient = createHttpClient();
      const url = faker().url();
      const payload = faker().string();
      fetchMock.mockResolvedValueOnce(
        new Response(JSON.stringify({ foo: 'bar' })),
      );

      await httpClient.post({
        url,
        requiresToken: false,
        payload,
      });

      expect(fetchSpy).toHaveBeenCalledWith(url, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    });
  });
});
