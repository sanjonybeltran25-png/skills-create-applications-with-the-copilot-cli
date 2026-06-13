#!/usr/bin/env node

/**
 * calculator.js
 * Node.js CLI calculator
 * Supported operations (comments list):
 * - addition (add, +)
 * - subtraction (sub, -)
 * - multiplication (mul, *, x)
 * - division (div, /)
 *
 * Usage:
 *   node src/calculator.js <operation> <number1> <number2>
 * Examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js + 4.5 1.2
 */

function printHelp() {
  console.log(`Usage: node src/calculator.js <operation> <a> <b>

Operations:
  add, +       Addition
  sub, -       Subtraction
  mul, *, x    Multiplication
  div, /       Division

Examples:
  node src/calculator.js add 2 3
  node src/calculator.js / 10 2
`);
}

function parseNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function formatResult(n) {
  // Avoid scientific notation for typical results, limit to 12 significant digits
  if (!Number.isFinite(n)) return String(n);
  return Number(n.toPrecision(12)).toString();
}

/**
 * operate(op, a, b)
 * - op: operation string ('add','+','sub','-','mul','*','x','div','/')
 * - a, b: numeric operands
 * Returns numeric result or throws an Error for invalid operations (e.g., divide by zero)
 */
// New helper functions requested:
// 1. modulo(a, b) - returns the remainder of a divided by b
// 2. power(base, exponent) - returns base raised to the exponent
// 3. squareRoot(n) - returns the square root of n with error handling for negative numbers

function modulo(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('invalid-number');
  if (b === 0) throw new Error('division-by-zero');
  return a % b;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) throw new Error('invalid-number');
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (!Number.isFinite(n)) throw new Error('invalid-number');
  if (n < 0) throw new Error('negative-number');
  return Math.sqrt(n);
}

function operate(op, a, b) {
  // Allow undefined "b" for single-operand ops like sqrt
  if (op === 'sqrt') {
    // allow a to be the single operand
    if (!Number.isFinite(a)) throw new Error('invalid-number');
    return squareRoot(a);
  }

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('invalid-number');
  }

  switch (op) {
    case 'add':
    case '+':
      return a + b;
    case 'sub':
    case '-':
      return a - b;
    case 'mul':
    case '*':
    case 'x':
    case 'X':
      return a * b;
    case 'div':
    case '/':
      if (b === 0) throw new Error('division-by-zero');
      return a / b;
    case 'mod':
    case '%':
      return modulo(a, b);
    case 'pow':
    case '**':
    case '^':
      return power(a, b);
    default:
      throw new Error('unknown-op');
  }
}

function main(argv) {
  if (argv.length < 3) {
    printHelp();
    process.exit(1);
  }

  const op = argv[0];
  const aStr = argv[1];
  const bStr = argv[2];

  if (op === '--help' || op === '-h') {
    printHelp();
    return;
  }

  const a = parseNumber(aStr);
  const b = parseNumber(bStr);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(2);
  }

  try {
    const result = operate(op, a, b);
    console.log(formatResult(result));
  } catch (err) {
    if (err.message === 'division-by-zero') {
      console.error('Error: division by zero.');
      process.exit(3);
    }
    console.error(`Error: ${err.message}`);
    printHelp();
    process.exit(4);
  }
}

if (require.main === module) {
  // slice off: node, script path; then args
  main(process.argv.slice(2));
}

// Export functions for testing
module.exports = {
  parseNumber,
  operate,
  formatResult,
  // new helpers
  modulo,
  power,
  squareRoot,
};
