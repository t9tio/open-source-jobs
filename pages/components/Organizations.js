import { useState } from 'react';
import './Organizations.scss';
import OrgCard from './OrgCard';

function Organizations({ organizations }) {
  const [search, setSearch] = useState('');

  const orgsCards = organizations.map(({
    organization,
    officialUrl,
    logoUrl,
    intro,
    github,
    email,
    majorRepos,
  }) => {
    const starMark = organization + github + majorRepos.join('') + intro;
    if (starMark.toUpperCase().indexOf(search.toUpperCase()) > -1) {
      return (
        <OrgCard org={{
          organization,
          officialUrl,
          logoUrl,
          intro,
          github,
          email,
          majorRepos,
        }}
        />
      );
    }
    return '';
  });

  return (
    <div className="section">
      <div className="container">
        <div className="org-filter">
          <span className="title is-4">Search: &nbsp; </span>
          <input
            className="org-search-input input is-small"
            placeHolder="name, projects, descriptions, etc"
            onChange={() => {
              setSearch(document.querySelector('.org-search-input').value);
            }}
          />
        </div>

        <a href="https://github.com/t9tio/open-source-jobs/issues/new?assignees=&labels=&template=add-a-new-organization.md&title=%5BOrg+Post%5D%3A" type="button" className="post-org-button button is-danger">Add your org</a>

        <div className="container">{orgsCards}</div>
      </div>
    </div>
  );
}

export default Organizations;
