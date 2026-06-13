const { operate, parseNumber, formatResult } = require('../calculator');

describe('calculator operate()', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(operate('+', 2, 3)).toBe(5);
    expect(operate('add', 2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(operate('-', 10, 4)).toBe(6);
    expect(operate('sub', 10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(operate('*', 45, 2)).toBe(90);
    expect(operate('mul', 45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(operate('/', 20, 5)).toBe(4);
    expect(operate('div', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => operate('/', 1, 0)).toThrow('division-by-zero');
  });

  test('unknown operation throws', () => {
    expect(() => operate('pow', 2, 3)).toThrow('unknown-op');
  });

  test('invalid numbers throw', () => {
    expect(() => operate('+', NaN, 2)).toThrow('invalid-number');
    expect(() => operate('+', 1, Infinity)).toThrow('invalid-number');
  });
});

describe('parseNumber()', () => {
  test('parses valid numbers', () => {
    expect(parseNumber('3.14')).toBeCloseTo(3.14);
    expect(parseNumber('2')).toBe(2);
    expect(Number.isNaN(parseNumber('abc'))).toBe(true);
  });
});

describe('formatResult()', () => {
  test('formats finite numbers without scientific notation', () => {
    expect(formatResult(1.2345678901234)).toMatch(/1.23456789012/);
  });
});
