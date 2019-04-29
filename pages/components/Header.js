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
            <a className="navbar-item" href="https://t9t.io">
              <img src="https://t9t.io/favicon.ico" alt="favicon" width="28" height="28" />
            </a>
            <a className="navbar-item" href="/help-wanted"><strong>Help wanted</strong></a>
            <a className="navbar-item" href="/organizations"><strong>Organizations</strong></a>
            <a className="navbar-item" href="/"><strong>Jobs</strong></a>
            {
              user ? (
                <a
                  href
                  className={`button navbar-burger is-black ${isBurgerActive ? 'is-active' : ''}`}
                  onClick={() => setBugerActive(!isBurgerActive)}
                >
                  <span />
                  <span />
                  <span />
                </a>
              ) : ''
            }
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
        {/**
          <div className="tabs is-boxed main-menu container">
          <ul>
            <li data-target="pane-1" id="1" className="is-active">
              <a>Jobs</a>
            </li>
            <li data-target="pane-2" id="2">
              <a>Post a job</a>
            </li>
          </ul>
          </div> */}
      </section>
    </div>
  );
}

export default Header;
