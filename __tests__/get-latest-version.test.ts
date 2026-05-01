import { getURL, getLatestVersion } from '../src/get-latest-version';
import nock from 'nock';
import jsonTestGithub from './data/github.json';
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  nock.cleanAll();
});

const org: string = 'voidmerge';
const repo: string = 'voidmerge';
const urlGithubExpected: string = `https://api.github.com/repos/${org}/${repo}/releases/latest`;

describe('getURL()', () => {
  test('return expected URL', () => {
    const urlGithub: string = getURL(org, repo, 'github');

    expect(urlGithub).toMatch(urlGithubExpected);
  });
});

describe('getLatestVersion()', () => {
  let versionLatestExpected: string = '0.0.25';

  test('return latest version via GitHub', async () => {
    nock('https://api.github.com')
      .get(`/repos/${org}/${repo}/releases/latest`)
      .reply(200, jsonTestGithub);

    const versionLatest: string = await getLatestVersion(org, repo, 'github');
    expect(versionLatest).toMatch(versionLatestExpected);
  });

  test('return exception 404', async () => {
    nock('https://formulae.brew.sh')
      .get(`/api/formula/${repo}.json`)
      .reply(404);

    try {
      const versionLatest: string = await getLatestVersion(org, repo, 'blah');
      console.debug(versionLatest);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
