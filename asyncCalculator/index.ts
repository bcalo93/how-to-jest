export default class AsyncCalculator {
  sum(a: number, b: number): Promise<number> {
    return new Promise(resolve => resolve(a + b));
  }

  subtract(a: number, b: number): Promise<number> {
    return new Promise(resolve => resolve(a - b));
  }

  multiply(a: number, b: number): Promise<number> {
    return new Promise(resolve => resolve(a * b));
  }

  divide(a: number, b: number): Promise<number> {
    return new Promise((resolve, reject) => {
      if (b === 0) {
        reject(new Error('b cannot be 0'));
        return;
      }
      resolve(a / b)
    });
  }
}
