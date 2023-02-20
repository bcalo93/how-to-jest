import { ApiError, fetchGithubUser } from '..';
import { githubUser, notFound } from './mocks';

const mockJson = jest.fn();
const mockFetch = jest.fn();

jest.mock('node-fetch', () => (
...args: [url: RequestInfo, init?: RequestInit]
) => mockFetch(...args));

describe('githubService', () => {
  describe('fetchGithubUser', () => {
    const testUsername = 'pepegrillo';
    const expectedFetchUrl = `https://api.github.com/users/${testUsername}`;

    describe('success', () => {
      beforeAll(() => {
        mockFetch.mockResolvedValue({
          ok: true,
          status: 200,
          json: mockJson
        });

        mockJson.mockResolvedValue(githubUser);
      });

      it('should resolve with the user\'s data', async () => {
        expect.assertions(4);
        const userData = await fetchGithubUser(testUsername);
        expect(userData).toEqual(githubUser);
        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(expectedFetchUrl);
        expect(mockJson).toBeCalledTimes(1);
      });
    });

    describe('errors', () => {
      it('should throw an ApiError if the status is not ok', () => {
        expect.assertions(6);
        const expectedStatus = 404;
        mockFetch.mockResolvedValue({
          ok: false,
          status: expectedStatus,
          json: mockJson
        });

        mockJson.mockResolvedValue(notFound);

        return fetchGithubUser(testUsername)
          .catch(error => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error).toHaveProperty('message', notFound.message);
            expect(error).toHaveProperty('statusCode', expectedStatus);
          }).finally(() => {
            expect(mockFetch).toBeCalledTimes(1);
            expect(mockFetch).toBeCalledWith(expectedFetchUrl);
            expect(mockJson).toBeCalledTimes(1);
          });
      });

      it('should throw an ApiError if json rejects', () => {
        expect.assertions(6);

        const expectedMessage = 'Failed to fetch';
        mockFetch.mockRejectedValue(new TypeError(expectedMessage));

        return fetchGithubUser(testUsername)
          .catch(error => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error).toHaveProperty('message', expectedMessage);
            expect(error).toHaveProperty('statusCode', undefined);
          }).finally(() => {
            expect(mockFetch).toBeCalledTimes(1);
            expect(mockFetch).toBeCalledWith(expectedFetchUrl);
            expect(mockJson).not.toBeCalled();
          });
      });

      it('should throw an ApiError if json call rejects', () => {
        expect.assertions(6);
        mockFetch.mockResolvedValue({
          ok: true,
          status: 200,
          json: mockJson
        });

        const expectedMessage = 'Cannot parse JSON';
        mockJson.mockRejectedValue(new TypeError(expectedMessage));
        return fetchGithubUser(testUsername)
          .catch(error => {
            expect(error).toBeInstanceOf(ApiError);
            expect(error).toHaveProperty('message',expectedMessage);
            expect(error).toHaveProperty('statusCode', undefined);
          }).finally(() => {
            expect(mockFetch).toBeCalledTimes(1);
            expect(mockFetch).toBeCalledWith(expectedFetchUrl);
            expect(mockJson).toBeCalledTimes(1);
          });
      });

    });
  });
});
