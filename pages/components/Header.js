import React, { useState, useEffect } from 'react';

function Header({ title, description }) {
  const [user, setUser] = useState('');
  const [isBurgerActive, setBugerActive] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userOnQuery = urlParams.get('user');
    if (userOnQuery) {
      window.localStorage.setItem('user', userOnQuery);
      window.history.replaceState({}, 'Open source jobs.', '/');
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
            <a className="navbar-item" href="https://t9t.io">
              <img src="https://t9t.io/favicon.ico" alt="favicon" width="28" height="28" />
            </a>
            <a className="navbar-item" href="/"><strong>Jobs</strong></a>
            <a className="navbar-item" href="/organizations"><strong>Organizations</strong></a>
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
          {
            user
              ? (
                <div className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
                  <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a href className="navbar-link">
                        {user}
                      </a>
                      <div className="navbar-dropdown is-right">
                        {/**
                          <a href className="navbar-item">
                            Share
                          </a>
                          <hr className="navbar-divider" />
                        */}
                        <a href className="navbar-item" onClick={() => signout()}>
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
              : ''
          }
        </div>
      </nav>

      <section className="hero is-black has-bg-img">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="title ">
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
                      &nbsp; Sign in with GitHub to receive updates
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
