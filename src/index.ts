import * as core from '@actions/core';
import * as main from './main';

(async (): Promise<void> => {
  try {
    await main.run();
  } catch (e: unknown) {
    if (e instanceof Error) {
      core.setFailed(`Action failed with error ${e.message}`);
    } else {
      core.setFailed(`Action failed with error ${e}`);
    }
  }
})();
