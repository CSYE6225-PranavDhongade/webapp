const { add } = require('../math');

// Test case 1
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

// Test case 2
test('adds -1 + 1 to equal 0', () => {
  expect(add(-1, 1)).toBe(0);
});