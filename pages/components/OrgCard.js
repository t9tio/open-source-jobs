import './OrgCard.scss';

function OrgCard({
  org: {
    organization,
    officialUrl,
    logoUrl,
    intro,
    github,
    email,
    majorRepos,
  },
}) {
  return (
    <div className="card org-item">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <a href={`/organization/${organization}`}><img src={logoUrl} alt="logo" /></a>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">
              <a className="org-title-link" href={`/organization/${organization}`}>
                {organization}
              </a>
            </p>
            <p className="subtitle is-6">
              {intro}
              &nbsp;
              <small>
            ( Building
                {' '}
                {majorRepos.map(repo => (
                  <a href={`https://github.com/${repo}`}>
                    <i className="fab fa-github" />
                    {' '}
                    {repo}
                    {' '}
                  </a>
                ))}
            )
              </small>
              <span className="org-link-block">
                {/**
                  email
                    ? <a className="org-link icon button  is-white" href={`mailto:${email}`}><i className="fas fa-envelope" /></a>
                    : ''
                 */}
                {
                  officialUrl
                    ? <a className="org-link icon button  is-white" href={officialUrl}><i className="fas fa-home" /></a>
                    : ''
                }
                {
                  github
                    ? <a className="org-link icon button  is-white" href={`https://github.com/${github}`}><i className="fab fa-github" /></a>
                    : ''
                }
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgCard;
