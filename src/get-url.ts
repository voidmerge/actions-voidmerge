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

  const versionClean = version.startsWith('v') ? version : `v${version}`;

  const voidmergeName: string = `voidmerge-${versionClean}-${architecture(os)}-${os}`;
  const baseURL: string =
    'https://github.com/voidmerge/voidmerge/releases/download';
  const url: string = `${baseURL}/${versionClean}/${voidmergeName}.${ext(os)}`;

  return url;
}
