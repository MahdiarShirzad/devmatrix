import { Octokit } from "@octokit/rest";

const createClient = (accessToken: string): Octokit => {
  return new Octokit({ auth: accessToken });
};

export const listUserRepos = async (accessToken: string) => {
  const octokit = createClient(accessToken);

  const repos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    per_page: 100,
    sort: "updated",
    direction: "desc",
  });

  return repos;
};

export const getRepo = async (
  accessToken: string,
  owner: string,
  repo: string,
) => {
  const octokit = createClient(accessToken);

  const { data } = await octokit.repos.get({ owner, repo });

  return data;
};

export const listCommits = async (
  accessTokrn: string,
  owner: string,
  repo: string,
  since?: Date,
) => {
  const octokit = createClient(accessTokrn);

  const commits = await octokit.paginate(octokit.repos.listCommits, {
    owner,
    repo,
    per_page: 100,
    since: since ? since.toISOString() : undefined,
  });

  return commits;
};

export const getCommitDetail = async (
  accessToken: string,
  owner: string,
  repo: string,
  sha: string,
) => {
  const octokit = createClient(accessToken);

  const { data } = await octokit.repos.getCommit({ owner, repo, ref: sha });
  return data;
};

export const listPullRequests = async (
  accessToken: string,
  owner: string,
  repo: string,
) => {
  const octokit = createClient(accessToken);

  const prs = await octokit.paginate(octokit.pulls.list, {
    owner,
    repo,
    state: "all",
    per_page: 100,
    sort: "updated",
    direction: "desc",
  });

  return prs;
};
