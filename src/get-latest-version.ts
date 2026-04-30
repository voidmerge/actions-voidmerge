import fetch from 'node-fetch';

export function getURL(org: string, repo: string, api: string): string {
  let url: string = '';

  // brew is not implemented (yet?)
  // if (api === 'brew') {
  //   url = `https://formulae.brew.sh/api/formula/${repo}.json`;
  // } else if (api === 'github') {
  //   url = `https://api.github.com/repos/${org}/${repo}/releases/latest`;
  // }

  if (api === 'github') {
    url = `https://api.github.com/repos/${org}/${repo}/releases/latest`;
  }

  return url;
}

export async function getLatestVersion(
  org: string,
  repo: string,
  api: string
): Promise<string> {
  try {
    const url = getURL(org, repo, api);
    const response = await fetch(url);
    const json = await response.json() as any;
    let latestVersion: string = '';
    // if (api === 'brew') {
    //   latestVersion = json.versions.stable;
    // } else
    if (api === 'github') {
      latestVersion = json.tag_name;
    }
    return latestVersion;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(`Error in getLatestVersion: ${e}`)
    }
  }
}
