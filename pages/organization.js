import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import Organizations from './components/Organizations';

class Index extends React.Component {
  static async getInitialProps({ query: { organization } }) {
    return { organization };
  }

  render() {
    const {
      organization: {
        organization, github, officialUrl, logoUrl, intro, majorRepos, email, updatedAt,
      },
    } = this.props;

    return (
      <div>
        <Head title={organization} description={intro} activeTab={1} />
        <Header title={organization} description={intro} logoUrl={logoUrl}/>
        <Footer />
      </div>
    );
  }
}

export default Index;
