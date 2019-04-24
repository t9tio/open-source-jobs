import PropTypes from 'prop-types';
import './Organizations.scss';

function Organizations({ organizations }) {
  const orgsCards = organizations.map(({
    organization,
    officialUrl,
    logoUrl,
    intro,
  }) => (
    <div className="card org-item">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={logoUrl} alt="logo" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">
              <a className="org-title-link" href={officialUrl}>
                {organization}
              </a>
            </p>
            <p className="subtitle is-6">
              <a>{intro}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="section">
      <div className="container">
        {orgsCards}
      </div>
    </div>
  );
}

export default Organizations;
