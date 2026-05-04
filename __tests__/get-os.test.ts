import { getOS } from '../src/get-os';
import { describe, expect, test } from '@jest/globals';

describe('getOS()', () => {
  test('return expected OS name', () => {
    expect(getOS('linux')).toBe('unknown-linux-gnu');
    expect(getOS('darwin')).toBe('apple-darwin');
    expect(getOS('win32')).toBe('pc-windows-msvc');
  });

  test('return exception', () => {
    expect(() => {
      getOS('centos');
    }).toThrow('centos is not supported');
  });
});
