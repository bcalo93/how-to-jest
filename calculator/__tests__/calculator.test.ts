import Calculator from "..";

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('sum', () => {
    it('should sum two numbers', () => {
      const result = calculator.sum(2, 8);
      expect(result).toBe(10);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      const result = calculator.subtract(10, 8);
      expect(result).toBe(2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      const result = calculator.multiply(2, 8);
      expect(result).toBe(16);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      const result = calculator.divide(10, 5);
      expect(result).toBe(2);
    });

    it('should throw an error if b is 0', () => {
      expect(() => calculator.divide(10, 0)).toThrowError('b cannot be 0');
    });
  });
});
