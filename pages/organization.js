import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';

class Index extends React.Component {
  static async getInitialProps({ query: { organization } }) {
    return { organization };
  }

  render() {
    const {
      organization: {
        organization, github, officialUrl, logoUrl, intro, majorRepos, email, jobUrl, updatedAt,
      },
    } = this.props;

    return (
      <div>
        <Head title={organization} description={intro} activeTab={1} />
        <Nav />
        <Header title={organization} description={intro} logoUrl={logoUrl} />
        <section className="section">
          <div className="container">
            {/* <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                <li className="is-active"><a href="#">Information</a></li>
                <li><a href="#">Help wanted</a></li>
                <li><a href="#">Jobs</a></li>
              </ul>
            </nav> */}

            <h3 className="title is-4">
              {organization}
              {' '}
              is an
              {' '}
              <a href="/organizations">open company</a>
              {' '}
              who open sourced their major products
            </h3>
            <div className="content">
              <table className="table is-hoverable">
                <tbody>
                  <tr>
                    <td><strong>Official Url:</strong></td>
                    <td><a href={officialUrl}>{officialUrl}</a></td>
                  </tr>
                  <tr>
                    <td><strong>GitHub:</strong></td>
                    <td><a href={`https://github.com/${github}`}>{`github.com/${github}`}</a></td>
                  </tr>
                  <tr>
                    <td><strong>Major Projects:</strong></td>
                    <td>
                      {
                        majorRepos.map(repo => (
                          <a href={repo.startsWith('http') ? repo : `https://github.com/${repo}`}>
                            {`github.com/${repo}`}
                            ;
                          </a>
                        ))
                      }
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Job Url:</strong></td>
                    <td><a href={jobUrl}>{jobUrl}</a></td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td><a href={`mailto:${email}`}>{email}</a></td>
                  </tr>
                </tbody>

              </table>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Index;
