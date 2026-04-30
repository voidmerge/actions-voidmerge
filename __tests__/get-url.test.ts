import { getURL } from '../src/get-url';

describe('getURL()', () => {
  test('return extected URL', () => {
    const testVersion: string = '0.3.5';
    const baseURL: string = `https://github.com/voidmerge/voidmerge/releases/download/v${testVersion}/voidmerge-v${testVersion}`;
    const urlLinux: string = `${baseURL}-x86_64-unknown-linux-gnu.tar.gz`;
    const urlMacOS: string = `${baseURL}-aarch64-apple-darwin.tar.gz`;
    const urlWindows: string = `${baseURL}-x86_64-pc-windows-msvc.zip`;
    expect(getURL('unknown-linux-gnu', '0.3.5')).toBe(urlLinux);
    expect(getURL('unknown-linux-gnu', '0.3.4')).not.toBe(urlLinux);
    expect(getURL('my-os', '0.3.5')).not.toBe(urlLinux);
    expect(getURL('apple-darwin', '0.3.5')).toBe(urlMacOS);
    expect(getURL('pc-windows-msvc', '0.3.5')).toBe(urlWindows);
  });
});
