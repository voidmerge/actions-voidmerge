export function getURL(os: string, version: string): string {
  const ext = (os: string) => {
    if (os === 'pc-windows-msvc') {
      return 'zip';
    } else {
      return 'tar.gz';
    }
  };
  const architecture = (os: string) => {
    if (os === 'apple-darwin') {
      return 'aarch64';
    } else {
      return 'x86_64'
    }
  }

  // const mdbookName: string = `mdbook-v${version}-x86_64-${os}`;
  const voidmergeName: string = `voidmerge-v${version}-${architecture(os)}-${os}`;
  const baseURL: string =
    'https://github.com/voidmerge/voidmerge/releases/download';
  const url: string = `${baseURL}/v${version}/${voidmergeName}.${ext(os)}`;

  return url;
}
