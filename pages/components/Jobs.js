import './Jobs.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import JobCard from './JobCard';

function arrAIncludesArrB(a, b) {
  return b.every(v => a.includes(v));
}

function getAllTechTags(jobs) {
  const tagsWithDup = jobs
    .reduce((acc, cur) => acc.concat(cur.techTags), []);
  return [...new Set(tagsWithDup)];
}

function getAllLoTags(jobs) {
  const tagsWithDup = jobs
    .reduce((acc, cur) => acc.concat(cur.locations), []);

  return [...new Set(tagsWithDup)];
}

function Jobs({ jobs }) {
  const [loSearchArr, setLoSearchArr] = useState([]);
  const [techSearchArr, setTechSearchArr] = useState([]);

  const allLoTags = getAllLoTags(jobs);
  const allTechTags = getAllTechTags(jobs);

  const jobsCards = jobs.map(({
    organization,
    logoUrl,
    jobTitle,
    jobUrl,
    locations,
    date,
    techTags,
  }) => {
    const isLoMatched = arrAIncludesArrB(locations, loSearchArr);
    const isTechMatched = arrAIncludesArrB(techTags, techSearchArr);

    if (isLoMatched && isTechMatched) {
      return (
        <JobCard
          job={{
            organization,
            logoUrl,
            jobTitle,
            jobUrl,
            locations,
            date,
            techTags,
          }}
        />
      );
    }
    return '';
  });

  function techTagKeyUp(e) {
    if (e.keyCode === 13) {
      const input = document.querySelector('.tech-tag-input').value;
      if (allTechTags.includes(input) && !techSearchArr.includes(input)) {
        setTechSearchArr(techSearchArr.concat([input]));
        document.querySelector('.tech-tag-input').value = '';
      }
    }
  }

  function loTagKeyUp(e) {
    if (e.keyCode === 13) {
      const input = document.querySelector('.lo-tag-input').value;
      if (allLoTags.includes(input) && !loSearchArr.includes(input)) {
        setLoSearchArr(loSearchArr.concat([input]));
        document.querySelector('.lo-tag-input').value = '';
      }
    }
  }

  function removeLoTag(tag) {
    setLoSearchArr(loSearchArr.filter(loTag => loTag !== tag));
  }

  function removeTechTag(tag) {
    setTechSearchArr(techSearchArr.filter(techTag => techTag !== tag));
  }

  return (
    <div className="section">
      <div className="container">
        <div className="job-filter">
          <span className="title is-4">Filters: &nbsp; </span>
          <div className="tag-input-wrapper">
            <input list="lo-tag-list" name="lo-tag-list" className="lo-tag-input input is-small" placeHolder="location" onKeyUp={e => loTagKeyUp(e)} />
          </div>
              &nbsp; &nbsp;
          <div className="tag-input-wrapper">
            <input list="tech-tag-list" name="tech-tag-list" className="tech-tag-input input is-small" placeHolder="keyword" onKeyUp={e => techTagKeyUp(e)} />
          </div>
          <datalist id="lo-tag-list">
            {
              allLoTags.map(loTag => <option value={loTag} />)
            }
          </datalist>
          <datalist id="tech-tag-list">
            {
              allTechTags.map(techTag => <option value={techTag} />)
            }
          </datalist>
        </div>
        <div className="search-tag-container">
          {
            loSearchArr.map(tag => (
              <span className="tag location-tag">
                {tag}
                <button type="button" className="delete is-small" onClick={() => removeLoTag(tag)} />
              </span>
            ))
          }
          {
            techSearchArr.map(tag => (
              <span className="tag is-rounded">
                {tag}
                <button type="button" className="delete is-small" onClick={() => removeTechTag(tag)} />
              </span>
            ))
          }
        </div>
        <div className="job-cards-container">
          {jobsCards}
        </div>

        <button type="button" className="post-job-button button is-danger">Post a job $0</button>
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
