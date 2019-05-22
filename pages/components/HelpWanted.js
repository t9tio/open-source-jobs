import { useState, useEffect } from 'react';

import './HelpWanted.scss';
import IssueCard from './IssueCard';

function arrAIncludesArrBEl(a, b) {
  if (b.length <= 0) return true;
  const bi = b.filter(v => a.includes(v));
  if (bi.length > 0) return true;
  return false;
}

function HelpWanted({ repos, issues }) {
  const [repoSearchArr, setLoSearchArr] = useState([]);
  const [langSearchArr, setTechSearchArr] = useState([]);
  const [repoTagInput, setLoTagInput] = useState('');
  const [langTagInput, setTechTagInput] = useState('');

  issues.sort((r1, r2) => new Date(r2.updated_at) - new Date(r1.updated_at));
  const allRepos = repos.map(repo => repo.path);
  const allLangsDup = repos.reduce((acc, cur) => acc.concat(cur.languages), []);
  const allLangs = [...new Set(allLangsDup)];

  // fire an event on clicking data list option list by checking event
  // react's event synthetic so I have to listen it the old way
  // ref: https://stackoverflow.com/a/48328172/4674834
  useEffect(() => {
    const langTagInputDiv = document.querySelector('.language-input');
    const repoTagInputDiv = document.querySelector('.repo-input');

    const listener = (e) => {
      const langTagInputValue = document.querySelector('.language-input').value;
      if (langTagInputValue) {
        // won't work with react's event object
        const isInputEvent = (Object.prototype.toString.call(e).indexOf('InputEvent') > -1);
        if (!isInputEvent) {
          console.log('via selection: checking input', langTagInputValue);
          if (allLangs.includes(langTagInputValue) && !langSearchArr.includes(langTagInputValue)) {
            setTechSearchArr(langSearchArr.concat([langTagInputValue]));
          }
          setTechTagInput('');
        }
      }
    };

    const listener2 = (e) => {
      const repoTagInputValue = document.querySelector('.repo-input').value;
      if (repoTagInputValue) {
        // won't work with react's event object
        const isInputEvent = (Object.prototype.toString.call(e).indexOf('InputEvent') > -1);
        if (!isInputEvent) {
          console.log('via selection: checking input', repoTagInputValue);
          if (allRepos.includes(repoTagInputValue) && !repoSearchArr.includes(repoTagInputValue)) {
            setLoSearchArr(repoSearchArr.concat([repoTagInputValue]));
          }
          setLoTagInput('');
        }
      }
    };

    langTagInputDiv.addEventListener('input', listener);
    repoTagInputDiv.addEventListener('input', listener2);

    return () => {
      langTagInputDiv.removeEventListener('input', listener);
      repoTagInputDiv.removeEventListener('input', listener2);
    };
  });

  const issueCards = issues.map((issue) => {
    const repoHtml = issue.repository_url;
    const splitedHtml = repoHtml.split('/');
    const repoPath = `${splitedHtml[splitedHtml.length - 2]}/${splitedHtml[splitedHtml.length - 1]}`;
    const repo = repos.filter(r => r.path === repoPath)[0];

    const isRepoMatched = repoSearchArr.length > 0 ? repoSearchArr.includes(repoPath) : true;
    const isLangMatched = arrAIncludesArrBEl(repo.languages, langSearchArr);
    if (isRepoMatched && isLangMatched) {
      return (
        <IssueCard issue={{
          organization: repo.org,
          repoPath,
          title: issue.title,
          logoUrl: repo.logoUrl,
          labels: issue.labels,
          htmlUrl: issue.html_url,
          languages:
          repo.languages,
          date: issue.updated_at.slice(0, 10),
          isOpenCompany: repo.isOpenCompany,
        }}
        />
      );
    }

    return '';
  });

  /**
   * @param {String} tagType lang or repo
   */
  function onTagInputKeyUp(e, tagType) {
    if (tagType !== 'repo' && tagType !== 'lang') throw new Error('invald tag type');
    if (e.keyCode === 13) {
      if (tagType === 'repo') {
        if (allRepos.includes(repoTagInput) && !repoSearchArr.includes(repoTagInput)) {
          setLoSearchArr(repoSearchArr.concat([repoTagInput]));
        }
        setLoTagInput('');
      }
      if (tagType === 'lang') {
        if (allLangs.includes(langTagInput) && !langSearchArr.includes(langTagInput)) {
          setTechSearchArr(langSearchArr.concat([langTagInput]));
        }
        setTechTagInput('');
      }
    }
  }

  /**
   * @param {String} tagType lang or repo
   */
  function removeTag(tag, tagType) {
    if (tagType !== 'repo' && tagType !== 'lang') throw new Error('invald tag type');
    if (tagType === 'repo') setLoSearchArr(repoSearchArr.filter(repoTag => repoTag !== tag));
    if (tagType === 'lang') setTechSearchArr(langSearchArr.filter(langTag => langTag !== tag));
  }

  const repoSearchTags = repoSearchArr.map(tag => (
    <span className="tag location-tag">
      <i className="fab fa-github" />
      &nbsp;
      {tag}
      <button
        type="button"
        className="delete is-small"
        onClick={() => removeTag(tag, 'repo')}
      />
    </span>
  )).reduce((acc, cur, i, arr) => {
    acc.push(cur);
    if (arr[i + 1]) acc.push(' || ');
    return acc;
  }, []);

  const langSearchTags = langSearchArr.map(tag => (
    <span className="tag is-rounded">
      {tag}
      <button type="button" className="delete is-small" onClick={() => removeTag(tag, 'lang')} />
    </span>
  )).reduce((acc, cur, i, arr) => {
    acc.push(cur);
    if (arr[i + 1]) acc.push(' || ');
    return acc;
  }, []);

  if (langSearchTags.length >= 3 && repoSearchTags.length > 0) {
    langSearchTags.unshift('( ');
    langSearchTags.push(' )');
  }

  if (repoSearchTags.length >= 3 && langSearchTags.length > 0) {
    repoSearchTags.unshift('( ');
    repoSearchTags.push(' )');
  }

  let searchTags = [];
  if (repoSearchTags.length > 0 && langSearchTags.length > 0) {
    searchTags = repoSearchTags.concat([' && ', ...langSearchTags]);
  } else {
    searchTags = repoSearchTags.concat(langSearchTags);
  }

  return (
    <div className="section">
      <div className="container">
        <div className="issue-filter">
          <span className="title is-4">Filters: &nbsp; </span>
          <div className="tag-input-wrapper">
            <input
              list="repo-list"
              name="repo-list"
              className="repo-input input is-small"
              placeHolder="repo"
              onKeyUp={e => onTagInputKeyUp(e, 'repo')}
              value={repoTagInput}
              onChange={e => setLoTagInput(e.target.value)}
            />
          </div>
              &nbsp; &nbsp;
          <div className="tag-input-wrapper">
            <input
              list="language-list"
              name="language-list"
              autoComplete
              className="language-input input is-small"
              placeHolder="language"
              onKeyUp={e => onTagInputKeyUp(e, 'lang')}
              value={langTagInput}
              onChange={e => setTechTagInput(e.target.value)}
            />
          </div>
          <datalist id="repo-list">
            {
              allRepos.map(repo => <option value={repo} />)
            }
          </datalist>
          <datalist id="language-list">
            {
              allLangs.map(lang => <option value={lang} />)
            }
          </datalist>
        </div>
        <div className="search-tag-container">
          {
            searchTags
          }
        </div>
        <div className="issue-cards-container" />
        { issueCards }
      </div>
      <a
        href="https://github.com/t9tio/open-source-jobs/issues/new?assignees=&labels=&template=suggest-a-new-repo-for-help-wanted-page.md&title=%5BSuggest+a+new+repo+for+help-wanted+page%5D%3A+"
        className="add-repo-button button is-danger"
      >
        Suggest a new repo
      </a>
    </div>
  );
}

export default HelpWanted;
