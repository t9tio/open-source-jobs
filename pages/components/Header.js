import React, { useState, useEffect } from 'react';

function Header({ title, description, logoUrl }) {
  const [user, setUser] = useState('');
  const [isBurgerActive, setBugerActive] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userOnQuery = urlParams.get('user');
    if (userOnQuery) {
      window.localStorage.setItem('user', userOnQuery);
      window.history.replaceState({}, '', '/');
      setUser(userOnQuery);
    } else if (window.localStorage.getItem('user')) {
      setUser(window.localStorage.getItem('user'));
    }
  });

  function signout() {
    window.localStorage.removeItem('user');
    setUser('');
  }

  return (
    <div>
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="https://t9t.io/favicon.ico" alt="favicon" width="28" height="28" />
            </a>
            <a
              href
              className={`button navbar-burger is-black ${isBurgerActive ? 'is-active' : ''}`}
              onClick={() => setBugerActive(!isBurgerActive)}
            >
              <span />
              <span />
              <span />
            </a>
          </div>

          <div className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
            <div className="navbar-start">
              <a className="navbar-item" href="/organizations"><strong>Organizations</strong></a>
              <a className="navbar-item" href="/jobs"><strong>Jobs</strong></a>
              <a className="navbar-item" href="/help-wanted"><strong>Help wanted</strong></a>
            </div>

            {
              user
                ? (
                  <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a href className="navbar-link">
                        {user}
                      </a>
                      <div className="navbar-dropdown is-right">
                        <a href className="navbar-item" onClick={() => signout()}>
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                )
                : ''
            }
          </div>
        </div>
      </nav>

      <section className="hero is-black has-bg-img">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="title">
                  {
                    logoUrl
                      ? (
                        <span>
                          <img src={logoUrl} alt="favicon" width="20" height="20" />
                          &nbsp;
                        </span>
                      )
                      : ''
                  }
                  {title}
                </h1>
                <h2 className="subtitle">
                  {description}
                </h2>
              </div>
              <div className="column">
                {
                  user ? '' : (
                    <a id="signin-btn" className="button is-active is-outlined is-black is-inverted tooltip" data-tooltip="Get notified of new opportunities" href="https://oo.t9t.io/auth/github">
                      <i className="fab fa-github" />
                      &nbsp; Sign in with GitHub
                    </a>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
