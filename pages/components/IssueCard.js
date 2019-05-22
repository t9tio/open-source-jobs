function IssueCard({
  issue: {
    organization,
    repoPath,
    title,
    logoUrl,
    htmlUrl,
    labels,
    languages,
    date,
    isOpenCompany,
  },
}) {
  return (
    <div className="card issue-item">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <a href={`/organization/${organization}`}><img src={logoUrl} alt="logo" /></a>
            </figure>
            {isOpenCompany ? <a className="open-company-span" href="/organizations">open company</a> : ''}
          </div>
          <div className="media-content">
            <p className="title is-5">
              <a className="issue-title-link" href={`${htmlUrl}?ref=oo.t9t.io`} target="_blank" rel="noopener noreferrer">
                {title}
                <i className="far fa-share-square tag is-white" />
              </a>
              <span className="tag-block">
                {
                  labels.map(label => <span><span className="tag" style={{ color: 'black', backgroundColor: `#${label.color}` }}>{label.name}</span>&nbsp;</span>)
                }
              </span>
            </p>
            <p className="subtitle is-6">
              {/* <a href={`/organization/${organization}`}>
                @
                {organization}
              </a> */}
              &nbsp;
              <span className="tag-block">
                <a className="location-tag tag" href={`https://github.com/${repoPath}/labels/help%20wanted?ref=oo.t9t.io`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github" />
                  &nbsp;
                  {repoPath}
                  &nbsp;
                  <i class="far fa-share-square "></i>
                </a>
                &nbsp;
                {
                  languages.map(lo => <span><a className="tag is-rounded">{lo}</a>&nbsp;</span>)
                }
              </span>
              <span className="date-span">{date}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueCard;
