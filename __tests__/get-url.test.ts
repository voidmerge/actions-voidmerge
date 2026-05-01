import { getURL } from '../src/get-url';
import { describe, expect, test } from '@jest/globals';

describe('getURL()', () => {
  test('return extected URL', () => {
    const testVersion: string = 'v0.3.5';
    const baseURL: string = `https://github.com/voidmerge/voidmerge/releases/download/${testVersion}/voidmerge-${testVersion}`;
    const urlLinux: string = `${baseURL}-x86_64-unknown-linux-gnu.tar.gz`;
    const urlMacOS: string = `${baseURL}-aarch64-apple-darwin.tar.gz`;
    const urlWindows: string = `${baseURL}-x86_64-pc-windows-msvc.zip`;
    expect(getURL('unknown-linux-gnu', 'v0.3.5')).toBe(urlLinux);
    expect(getURL('unknown-linux-gnu', 'v0.3.4')).not.toBe(urlLinux);
    expect(getURL('my-os', 'v0.3.5')).not.toBe(urlLinux);
    expect(getURL('apple-darwin', 'v0.3.5')).toBe(urlMacOS);
    expect(getURL('pc-windows-msvc', 'v0.3.5')).toBe(urlWindows);
  });
});
