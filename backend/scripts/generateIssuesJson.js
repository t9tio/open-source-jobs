const axios = require('axios');
const fs = require('fs');
const path = require('path');
const repos = require('../repos.json');

async function getIssuesOfRepo(repoPath) {
  const { data } = await axios.get(`https://api.github.com/repos/${repoPath}/issues?labels=help%20wanted`);
  console.log(`get issues of ${repoPath} done`);
  return data.map(issue => ({
    repository_url: issue.repository_url,
    title: issue.title,
    labels: issue.labels,
    htmlUrl: issue.html_url,
    updated_at: issue.updated_at,
    created_at: issue.created_at,
  }));
}

async function generateIssuesJson() {
  const arr = repos.map(repo => getIssuesOfRepo(repo.path));
  const issuesArr = await Promise.all(arr);
  const issues = [].concat(...issuesArr);
  fs.writeFileSync(path.join(__dirname, '../issues.json'), JSON.stringify(issues, null, 2));
}

generateIssuesJson();
