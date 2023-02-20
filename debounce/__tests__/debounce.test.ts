import debounce, { DEFAULT_TIMEOUT } from "..";

describe('debounce', () => {
  const callbackMock = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('shouldn\'t run debounced function if timer isn\'t finished', () => {
    const debounceFunc = debounce(callbackMock);
    debounceFunc();
    jest.advanceTimersByTime(DEFAULT_TIMEOUT - 1);
    expect(callbackMock).not.toBeCalled();
  });

  it('should run debounced function once timer is finished', () => {
    const debounceFunc = debounce(callbackMock);
    debounceFunc();
    jest.advanceTimersByTime(DEFAULT_TIMEOUT);
    expect(callbackMock).toBeCalledTimes(1);
  });

  it('should accept a custom timeout and run when timer is completed', () => {
    const testTimeout = 5000;
    const debounceFunc = debounce(callbackMock, testTimeout);
    debounceFunc();
    jest.advanceTimersByTime(testTimeout);
    expect(callbackMock).toBeCalledTimes(1);
  });
});
