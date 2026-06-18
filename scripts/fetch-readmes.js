import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsFilePath = path.join(__dirname, '../src/data/projects.json');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'NodeJS-Fetch-Agent'
      }
    }, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', (err) => reject(err));
  });
}

async function getGithubReadme(owner, repo) {
  const branches = ['main', 'master'];
  const filenames = ['README.md', 'Readme.md', 'readme.md', 'README.MD'];
  
  for (const branch of branches) {
    for (const filename of filenames) {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;
      try {
        console.log(`Trying ${owner}/${repo} -> ${branch}/${filename}...`);
        const content = await fetchUrl(url);
        if (content && content.trim().length > 0) {
          return content;
        }
      } catch (e) {
        // Quietly try next permutation
      }
    }
  }
  throw new Error(`Could not find README.md (or case variants) on main/master branches for ${owner}/${repo}`);
}

async function main() {
  if (!fs.existsSync(projectsFilePath)) {
    console.error(`Error: File not found at ${projectsFilePath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
  const projects = data.projects;

  console.log(`Found ${projects.length} projects in projects.json`);

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const githubUrl = project.github;

    if (!githubUrl) {
      console.log(`Project "${project.title}" has no GitHub URL. Skipping.`);
      continue;
    }

    // Match github.com/owner/repo but NOT just github.com/owner or general links
    const githubMatch = githubUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/?#]+)/);

    if (!githubMatch) {
      console.log(`Project "${project.title}": URL "${githubUrl}" is not a direct repository URL. Skipping.`);
      continue;
    }

    const owner = githubMatch[1];
    let repo = githubMatch[2];
    
    // Clean up repo name (remove trailing slashes, spaces, or .git)
    repo = repo.replace(/\.git$/, '').trim();

    try {
      const readmeContent = await getGithubReadme(owner, repo);
      console.log(`Successfully fetched README for "${project.title}"! Updating markdownContent.`);
      project.markdownContent = readmeContent;
    } catch (error) {
      console.warn(`Warning: Could not fetch README for "${project.title}" (${githubUrl}): ${error.message}`);
    }
  }

  fs.writeFileSync(projectsFilePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('\nFinished updating projects.json!');
}

main().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
