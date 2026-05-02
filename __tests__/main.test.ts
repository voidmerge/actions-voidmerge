import * as main from '../src/main';
import nock from 'nock';
import { FetchError } from 'node-fetch';
import jsonTestGithub from './data/github.json';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals';

jest.setTimeout(30000);
const repo: string = 'voidmerge';
const org: string = 'voidmerge';

beforeAll(() => {
  process.env['RUNNER_TEMP'] = 'c:\\Users\\voser\\tmp';
})
beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  delete process.env['INPUT_VOIDMERGE-VERSION'];
  nock.cleanAll();
});
afterAll(() => {
  delete process.env['RUNNER_TEMP'];
  // Possibly delete all temp directories?
})

describe('Integration testing run()', () => {
  test('succeed in installing a custom version', async () => {
    const testVersion: string = '0.0.25';
    process.env['INPUT_VOIDMERGE-VERSION'] = testVersion;
    const result: main.actionResult = await main.run();
    console.log('RESULT aoeu: ', result);
    expect(result.output).toContain(`voidmerge ${testVersion}`);
  });

  test('succeed in installing the latest version', async () => {
    const testVersion: string = 'latest';
    process.env['INPUT_VOIDMERGE-VERSION'] = testVersion;
    nock('https://api.github.com')
      .get(`/repos/${org}/${repo}/releases/latest`)
      .reply(200, jsonTestGithub);
    const result: main.actionResult = await main.run();
    expect(result.output).toContain('voidmerge 0.0.25');
  });

  // if (process.platform === 'linux') {
  //   test('fail to install a custom version due to 404 of tarball', async () => {
  //     const testVersion: string = '0.3.4';
  //     process.env['INPUT_MDBOOK-VERSION'] = testVersion;
  //     nock('https://github.com')
  //       .get(
  //         `/rust-lang/mdBook/releases/download/v${testVersion}/mdbook-v${testVersion}-x86_64-unknown-linux-gnu.tar.gz`
  //       )
  //       .reply(404);
  //     try {
  //       const result: main.actionResult = await main.run();
  //       console.debug(result.output);
  //     } catch (e) {
  //       expect(e).toBeInstanceOf(Error);
  //     }
  //   });
  // }

  // test('fail to install the latest version due to 404 of brew.sh', async () => {
  //   const testVersion: string = 'latest';
  //   process.env['INPUT_MDBOOK-VERSION'] = testVersion;
  //   nock('https://formulae.brew.sh')
  //     .get(`/api/formula/${repo}.json`)
  //     .reply(404);
  //   try {
  //     const result: main.actionResult = await main.run();
  //     console.debug(result.output);
  //   } catch (e) {
  //     expect(e).toBeInstanceOf(Error);
  //   }
  // });

  // if (process.platform === 'linux') {
  //   test('fail to install the latest version due to 404 of tarball', async () => {
  //     const testVersion: string = 'latest';
  //     process.env['INPUT_MDBOOK-VERSION'] = testVersion;
  //     nock('https://formulae.brew.sh')
  //       .get(`/api/formula/${repo}.json`)
  //       .reply(200, jsonTestGithub);
  //     nock('https://github.com')
  //       .get(
  //         `/rust-lang/mdBook/releases/download/v0.3.5/mdbook-v0.3.5-x86_64-unknown-linux-gnu.tar.gz`
  //       )
  //       .reply(404);
  //     try {
  //       const result: main.actionResult = await main.run();
  //       console.debug(result.output);
  //     } catch (e) {
  //       expect(e).toBeInstanceOf(Error);
  //     }
  //   });
  // }
});

describe('showVersion()', () => {
  let result: main.actionResult = {
    exitcode: 0,
    output: ''
  };

  test('return version', async () => {
    result = await main.showVersion('git', ['--version']);
    expect(result.exitcode).toBe(0);
    expect(result.output).toMatch(/git version/);
  });

  test('return exception', async () => {
    try {
      result = await main.showVersion('gitgit', ['--version']);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
