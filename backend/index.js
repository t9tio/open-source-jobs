const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

nextApp.prepare().then(() => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize());
  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GitHubStrategy(
      {
        clientID: 'c830c80fecc3d702fab7',
        clientSecret: 'ddafc23c53e2185cdd30da22e221255f981215b4',
        scope: 'user:email',
        callbackURL: 'https://oo.t9t.io/auth/github/callback',
      },
      (accessToken, refreshToken, profile, cb) => {
        // User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
        console.log(accessToken, refreshToken, profile);
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
    (req, res) => {
    // Successful authentication, redirect home.
    // TODO: save the user to database
      res.redirect('/');
    },
  );

  const jobs = require('./jobs.json');

  app.get('/', (req, res) => nextApp.render(req, res, '/index', { jobs }));

  const organizations = require('./organizations.json');

  app.get('/organizations', (req, res) => nextApp.render(req, res, '/organizations', { organizations }));

  app.get('/post/:slug', (req, res) => nextApp.render(req, res, '/post', { slug: req.params.slug }));

  app.get('*', (req, res) => handle(req, res));

  const { PORT = 8080 } = process.env;
  app.listen(PORT);
  console.log(`server running on http://localhost:${PORT}`);
});
