/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ReleaseAction} from '../../actions';
import {GithubTestingRepo} from './github-api-testing';
import {GitClientConfig} from '../../../../utils/config';
import {ReleaseConfig} from '../../../config';
import {SandboxGitClient} from './sandbox-git-client';
import {VirtualGitClient} from '../../../../utils/testing';
import {ActiveReleaseTrains} from '../../../versioning';

export interface TestOptions {
  /**
   * Whether the test should operate using a sandbox Git client.
   */
  useSandboxGitClient: boolean;
}

/** Type describing the default options. Used for narrowing in generics. */
export type defaultTestOptionsType = TestOptions & {
  useSandboxGitClient: false;
};

/** Default options for tests. Need to match with the default options type. */
export const defaultTestOptions: defaultTestOptionsType = {
  useSandboxGitClient: false,
};

/** Interface describing a test release action. */
export interface TestReleaseAction<
  T extends ReleaseAction = ReleaseAction,
  O extends TestOptions = defaultTestOptionsType,
> {
  active: ActiveReleaseTrains;
  instance: T;
  repo: GithubTestingRepo;
  fork: GithubTestingRepo;
  testTmpDir: string;
  githubConfig: GitClientConfig;
  releaseConfig: ReleaseConfig;
  gitClient: O['useSandboxGitClient'] extends true ? SandboxGitClient : VirtualGitClient;
}
