import './Jobs.scss';
import PropTypes from 'prop-types';

function Jobs({ jobs }) {
  const jobsCards = jobs.map(({
    organization,
    logoUrl,
    jobTitle,
    jobUrl,
    locations,
    date,
    techTags,
  }) => (
    <div className="card job-item">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={logoUrl} alt="logo" />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">
              <a className="job-title-link" href={jobUrl}>
                {jobTitle}
              </a>
              <span className="tag-block">
                {
                  locations.map(lo => <a className="tag is-dark">{lo}</a>)
                }
                {
                  techTags.map(tag => <a className="tag is-info">{tag}</a>)
                }
              </span>
            </p>
            <p className="subtitle is-6">
              <a>{organization}</a>
              <span className="date-span">{date}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="section">
      <div className="container">
        {jobsCards}
      </div>
    </div>
  );
}

Jobs.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    organization: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    jobUrl: PropTypes.string.isRequired,
    locations: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    techTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default Jobs;
