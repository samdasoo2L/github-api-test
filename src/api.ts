import { Octokit } from '@octokit/rest';

// It's a good practice to initialize Octokit once.
// For private repositories or to increase rate limits, you can add an auth token.
const octokit = new Octokit({
  // auth: 'YOUR_PERSONAL_ACCESS_TOKEN'
});

interface InfoInterface {
  owner: string;
  repo: string;
  path: string;
}


export async function getRepoList(username : string) {
    try {
        const response = await octokit.rest.repos.listForUser({
            username: username,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function getFileList({owner, repo, path}: InfoInterface) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    // The API returns an array for directories. If the path is a file, it returns an object.
    // Since you want a list, we ensure it returns an array.
    if (Array.isArray(data)) {
      const finData = data.map(data => data.name)      
      return finData;
    }
    return []; // Return an empty array if the path is not a directory.
  } catch (error) {
    console.error(`Error fetching repository contents for ${owner}/${repo}/${path}:`, error);
    throw error;
  }
};


export async function getFileContent({ owner, repo, path }: { owner: string, repo: string, path: string }) {
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path });
    // data.content는 base64로 인코딩되어 있음
    if ('content' in data && typeof data.content === 'string') {
      return atob(data.content.replace(/\n/g, ''));
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}


