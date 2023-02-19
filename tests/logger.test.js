import test from 'ava';
import { spy } from 'sinon';

import logger from '../src/helpers/logger.js';
import Colors from "../src/constants/colors.js";

test('logger.warn should print warning message in yellow color', (t) => {
  const consoleWarnSpy = spy(console, 'warn');
  logger.warn('Test warning message');
  t.true(consoleWarnSpy.calledOnce);
  t.true(consoleWarnSpy.calledWith(Colors.Yellow, '[WARN] Test warning message'));
});

test('logger.info should print info message in white color', (t) => {
  const consoleLogSpy = spy(console, 'log');
  logger.info('Test info message');
  t.true(consoleLogSpy.calledOnce);
  t.true(consoleLogSpy.calledWith(Colors.White, '[INFO] Test info message'));
  consoleLogSpy.restore();
});

test('logger.error should print error message in red color', (t) => {
  const consoleErrorSpy = spy(console, 'error');
  logger.error('Test error message');
  t.true(consoleErrorSpy.calledOnce);
  t.true(consoleErrorSpy.calledWith(Colors.Red, '[ERROR] Test error message'));
});

test('logger.success should print success message in green color', (t) => {
  const consoleLogSpy = spy(console, 'log');
  logger.success('Test success message');
  t.true(consoleLogSpy.calledOnce);
  t.true(consoleLogSpy.calledWith(Colors.Green, 'Test success message'));
});
