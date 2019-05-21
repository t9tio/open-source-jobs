function JobCard({
  job: {
    organization,
    logoUrl,
    jobTitle,
    jobUrl,
    locations,
    date,
    techTags,
  },
}) {
  return (
    <div className="card job-item">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <a href={`/organization/${organization}`}><img src={logoUrl} alt="logo" /></a>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5">
              <a className="job-title-link" href={`${jobUrl}?ref=oo.t9t.io`} target="_blank" rel="noopener noreferrer">
                {jobTitle}
                <tag className="tag is-white"><i className="far fa-share-square" /></tag>
              </a>
              <span className="tag-block">
                {
                  locations.map(lo => <span><a className="location-tag tag">{lo}</a>&nbsp;</span>)
                }
                {
                  techTags.map(tag => <span><a className="tag is-rounded">{tag}</a>&nbsp;</span>)
                }
              </span>
            </p>
            <p className="subtitle is-6">
              <a href={`/organization/${organization}`}>
                @
                {organization}
              </a>
              <span className="date-span">{date}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
