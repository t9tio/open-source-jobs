const fs = require('fs');
const jobs = require('../jobs.json');
const orgs = require('../organizations.json');

const josbs = jobs.map((job) => {
  const jobCurOrg = job.organization;
  const foundOrg = orgs.find(org => org.organization === jobCurOrg);
  if (foundOrg) {
    job.organization = foundOrg.github;
  }
  return job;
});

console.log(josbs);

fs.writeFileSync('./jobs2.json', JSON.stringify(josbs, null, 2));
