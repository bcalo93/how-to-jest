import fetch from "node-fetch";

const GITHUB_BASE_URL = 'https://api.github.com/users'

type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string | null;
  twitter_username: string| null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export class ApiException extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  const response = await fetch(`${GITHUB_BASE_URL}/${username}`);
  const body = await response.json();
  if (!response.ok) {
    throw new ApiException(body.message, response.status);
  }

  return body;
}
