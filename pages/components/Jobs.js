import './Jobs.scss';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import JobCard from './JobCard';


function arrAIncludesArrBEl(a, b) {
  if (b.length <= 0) return true;
  const bi = b.filter(v => a.includes(v));
  if (bi.length > 0) return true;
  return false;
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
  const [loTagInput, setLoTagInput] = useState('');
  const [techTagInput, setTechTagInput] = useState('');

  const allLoTags = getAllLoTags(jobs);
  const allTechTags = getAllTechTags(jobs);

  // fire an event on clicking data list option list by checking event
  // react's event synthetic so I have to listen it the old way
  // ref: https://stackoverflow.com/a/48328172/4674834
  useEffect(() => {
    const techTagInputDiv = document.querySelector('.tech-tag-input');
    const loTagInputDiv = document.querySelector('.lo-tag-input');

    const listener = (e) => {
      const techTagInputValue = document.querySelector('.tech-tag-input').value;
      if (techTagInputValue) {
        // won't work with react's event object
        const isInputEvent = (Object.prototype.toString.call(e).indexOf('InputEvent') > -1);
        if (!isInputEvent) {
          console.log('via selection: checking input', techTagInputValue);
          if (allTechTags.includes(techTagInputValue) && !techSearchArr.includes(techTagInputValue)) {
            setTechSearchArr(techSearchArr.concat([techTagInputValue]));
          }
          setTechTagInput('');
        }
      }
    };

    const listener2 = (e) => {
      const loTagInputValue = document.querySelector('.lo-tag-input').value;
      if (loTagInputValue) {
        // won't work with react's event object
        const isInputEvent = (Object.prototype.toString.call(e).indexOf('InputEvent') > -1);
        if (!isInputEvent) {
          console.log('via selection: checking input', loTagInputValue);
          if (allLoTags.includes(loTagInputValue) && !loSearchArr.includes(loTagInputValue)) {
            setLoSearchArr(loSearchArr.concat([loTagInputValue]));
          }
          setLoTagInput('');
        }
      }
    };

    techTagInputDiv.addEventListener('input', listener);
    loTagInputDiv.addEventListener('input', listener2);

    return () => {
      techTagInputDiv.removeEventListener('input', listener);
      loTagInputDiv.removeEventListener('input', listener2);
    };
  });


  const jobsCards = jobs.map(({
    organization,
    logoUrl,
    jobTitle,
    jobUrl,
    locations,
    date,
    techTags,
  }) => {
    const isLoMatched = arrAIncludesArrBEl(locations, loSearchArr);
    const isTechMatched = arrAIncludesArrBEl(techTags, techSearchArr);

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

  /**
   * @param {String} tagType tech or lo
   */
  function onTagInputKeyUp(e, tagType) {
    if (tagType !== 'lo' && tagType !== 'tech') throw new Error('invald tag type');
    if (e.keyCode === 13) {
      if (tagType === 'lo') {
        if (allLoTags.includes(loTagInput) && !loSearchArr.includes(loTagInput)) {
          setLoSearchArr(loSearchArr.concat([loTagInput]));
        }
        setLoTagInput('');
      }
      if (tagType === 'tech') {
        if (allTechTags.includes(techTagInput) && !techSearchArr.includes(techTagInput)) {
          setTechSearchArr(techSearchArr.concat([techTagInput]));
        }
        setTechTagInput('');
      }
    }
  }

  /**
   * @param {String} tagType tech or lo
   */
  function removeTag(tag, tagType) {
    if (tagType !== 'lo' && tagType !== 'tech') throw new Error('invald tag type');
    if (tagType === 'lo') setLoSearchArr(loSearchArr.filter(loTag => loTag !== tag));
    if (tagType === 'tech') setTechSearchArr(techSearchArr.filter(techTag => techTag !== tag));
  }

  const loSearchTags = loSearchArr.map(tag => (
    <span className="tag location-tag">
      {tag}
      <button
        type="button"
        className="delete is-small"
        onClick={() => removeTag(tag, 'lo')}
      />
    </span>
  )).reduce((acc, cur, i, arr) => {
    acc.push(cur);
    if (arr[i + 1]) acc.push(' || ');
    return acc;
  }, []);

  const techSearchTags = techSearchArr.map(tag => (
    <span className="tag is-rounded">
      {tag}
      <button type="button" className="delete is-small" onClick={() => removeTag(tag, 'tech')} />
    </span>
  )).reduce((acc, cur, i, arr) => {
    acc.push(cur);
    if (arr[i + 1]) acc.push(' || ');
    return acc;
  }, []);

  if (techSearchTags.length >= 3 && loSearchTags.length > 0) {
    techSearchTags.unshift('( ');
    techSearchTags.push(' )');
  }

  if (loSearchTags.length >= 3 && techSearchTags.length > 0) {
    loSearchTags.unshift('( ');
    loSearchTags.push(' )');
  }

  let searchTags = [];
  if (loSearchTags.length > 0 && techSearchTags.length > 0) {
    searchTags = loSearchTags.concat([' && ', ...techSearchTags]);
  } else {
    searchTags = loSearchTags.concat(techSearchTags);
  }
  return (
    <div className="section">
      <div className="container">
        <div className="job-filter">
          <span className="title is-4">Filters: &nbsp; </span>
          <div className="tag-input-wrapper">
            <input list="lo-tag-list" name="lo-tag-list" className="lo-tag-input input is-small" placeHolder="location" onKeyUp={e => onTagInputKeyUp(e, 'lo')} value={loTagInput} onChange={e => setLoTagInput(e.target.value)} />
          </div>
              &nbsp; &nbsp;
          <div className="tag-input-wrapper">
            <input list="tech-tag-list" name="tech-tag-list" autoComplete className="tech-tag-input input is-small" placeHolder="keyword" onKeyUp={e => onTagInputKeyUp(e, 'tech')} value={techTagInput} onChange={e => setTechTagInput(e.target.value)} />
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
            searchTags
          }
        </div>
        <div className="job-cards-container">
          {jobsCards}
        </div>

        <a href="https://github.com/t9tio/open-source-jobs/issues/new?assignees=&labels=&template=post-a-new-job.md&title=%5BJob+Post%5D%3A" className="post-job-button button is-danger">Post a job $0</a>
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
