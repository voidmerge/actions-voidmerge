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

  const voidmergeName: string = `voidmerge-${version}-${architecture(os)}-${os}`;
  const baseURL: string =
    'https://github.com/voidmerge/voidmerge/releases/download';
  const url: string = `${baseURL}/${version}/${voidmergeName}.${ext(os)}`;

  return url;
}
