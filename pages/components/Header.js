import Link from 'next/link';

function header({ title, description }) {
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
          </div>
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
                <button className="button is-active is-outlined is-black is-inverted tooltip" data-tooltip="Get notified of new opportunities">
                  <i className="fab fa-github" />
&nbsp; Sign in with GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
        {/** <div className="tabs is-boxed main-menu container">
        <ul>
          <li data-target="pane-1" id="1" className="is-active">
            <Link href="/">
              <a>Jobs</a>
            </Link>
          </li>
          <li data-target="pane-2" id="2" >
            <Link href="/organizations">
              <a>Organizations</a>
            </Link>
          </li>
          <li data-target="pane-0" id="0">
            <Link href="opportunities">
              <a>Opportunities</a>
            </Link>
          </li>
        </ul>
      </div> */}
      </section>

    </div>
  );
}

export default header;
