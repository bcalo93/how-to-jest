export const DEFAULT_TIMEOUT = 200;

export default function debounce(callback: Function, timeout = DEFAULT_TIMEOUT) {
  let timer: number;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  }
}
