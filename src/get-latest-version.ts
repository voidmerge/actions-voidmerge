import fetch from 'node-fetch';

export function getURL(org: string, repo: string, api: string): string {
  let url: string = '';

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
