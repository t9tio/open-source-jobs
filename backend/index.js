const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const next = require('next');
const UserDao = require('./db/User');
const jobs = require('./jobs.json');
const organizations = require('./organizations.json');
const issues = require('./issues.json');
const repos = require('./repos.json');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

nextApp.prepare().then(() => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize());

  passport.use(
    new GitHubStrategy(
      {
        clientID: 'c830c80fecc3d702fab7',
        clientSecret: 'ddafc23c53e2185cdd30da22e221255f981215b4',
        scope: 'user:email',
        callbackURL: 'https://oo.t9t.io/auth/github/callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        cb(null, profile);
      },
    ),
  );

  app.get(
    '/auth/github',
    passport.authenticate('github'),
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    async (req, res) => {
      /**
       * {
       *   id: '5512552',
       *   displayName: 'Tim Qian',
       *   username: 'timqian',
       *   profileUrl: 'https://github.com/timqian',
       *   emails: [
       *     { value: 'timqian92@gmail.com', primary: false, verified: true },
       *     { value: 'timqian92@qq.com', primary: true, verified: false },
       *     { value: 'timqian@shu.edu.cn', primary: false, verified: true }
       *   ],
       *   photos: [{ value: 'https://avatars3.githubusercontent.com/u/5512552?v=4' }],
       * }
       */
      const {
        id, username, displayName, emails, photos,
      } = req.user;
      const user = await UserDao.get({ githubId: id });
      const userToSave = {
        githubId: id,
        username,
        name: displayName,
        email: emails.filter(email => email.primary === true)[0].value,
        photo: photos[0].value,
      };
      if (!user) {
        await UserDao.put(userToSave);
      }
      res.redirect(`/jobs?user=${username}`);
    },
  );

  app.get('/', (req, res) => res.redirect('https://github.com/t9tio/open-source-jobs'));

  app.get('/jobs', (req, res) => nextApp.render(req, res, '/index', { jobs }));

  app.get('/organizations', (req, res) => nextApp.render(req, res, '/organizations', { organizations }));

  app.get('/organization/:github', (req, res) => {
    const paramOrg = req.params.github;
    const orgInDb = organizations.filter(org => org.github === paramOrg)[0];
    if (!orgInDb) {
      res.redirect('/organizations');
    } else {
      nextApp.render(req, res, '/organization', { organization: orgInDb });
    }
  });

  app.get('/help-wanted', (req, res) => nextApp.render(req, res, '/help-wanted', { issues, repos }));

  app.get('*', (req, res) => handle(req, res));

  const { PORT = 8080 } = process.env;
  app.listen(PORT);
  console.log(`server running on http://localhost:${PORT}`);
});
