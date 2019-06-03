import React, { useState, useEffect } from 'react';

function Header({ title, description, logoUrl }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      setUser(window.localStorage.getItem('user'));
    }
  });

  return (
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
                {' '}
                {
                  !logoUrl
                    ? (
                      <a href="https://github.com/t9tio/open-opportunities">
                        <img alt="GitHub stars" src="https://img.shields.io/github/stars/t9tio/open-opportunities.svg?style=social" />
                      </a>
                    )
                    : ''
                }
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
  );
}

export default Header;
