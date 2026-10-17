import assert from 'node:assert/strict';
import test from 'node:test';
import { readingProgress } from '../assets/js/reading-coffee.mjs';

test('an article is full before its body reaches the viewport top', () => {
  assert.equal(readingProgress(320, 1520, 800), 0);
  assert.equal(readingProgress(0, 1200, 800), 0);
});

test('half of the scrollable body consumes half the cup', () => {
  assert.equal(readingProgress(-200, 1000, 800), 0.5);
});

test('reaching the final body line finishes before the site footer', () => {
  assert.equal(readingProgress(-400, 800, 800), 1);
  assert.equal(readingProgress(-900, 300, 800), 1);
});

test('the pinned reading bar is excluded from usable reading space', () => {
  assert.equal(readingProgress(44, 1244, 800, 44), 0);
  assert.equal(readingProgress(-178, 1022, 800, 44), 0.5);
  assert.equal(readingProgress(-400, 800, 800, 44), 1);
});

test('a short article finishes once the entire body is visible', () => {
  assert.equal(readingProgress(600, 900, 800), 0);
  assert.equal(readingProgress(200, 500, 800), 1);
  assert.equal(readingProgress(-100, 200, 800), 1);
});

test('empty content and unavailable viewport sizes stay at zero', () => {
  assert.equal(readingProgress(100, 100, 800), 0);
  assert.equal(readingProgress(0, 1000, 0), 0);
});
