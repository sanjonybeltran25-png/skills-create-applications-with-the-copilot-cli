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

  let result;
  switch (op) {
    case 'add':
    case '+':
      result = a + b;
      break;
    case 'sub':
    case '-':
      result = a - b;
      break;
    case 'mul':
    case '*':
    case 'x':
    case 'X':
      result = a * b;
      break;
    case 'div':
    case '/':
      if (b === 0) {
        console.error('Error: division by zero.');
        process.exit(3);
      }
      result = a / b;
      break;
    default:
      console.error(`Error: unknown operation '${op}'.`);
      printHelp();
      process.exit(4);
  }

  console.log(formatResult(result));
}

if (require.main === module) {
  // slice off: node, script path; then args
  main(process.argv.slice(2));
}
