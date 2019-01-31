/**
 * @jest-environment node
 */

test('use node in this test file', () => {
  const AbstractModel = document.createElement('test');
  expect(AbstractModel).not.toBeNull();
});