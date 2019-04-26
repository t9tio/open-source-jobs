import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import Jobs from './components/Jobs';

class Index extends React.Component {
  static async getInitialProps({ query: { jobs } }) {
    return { jobs };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    if (user) {
      window.localStorage.setItem('user', user);
      window.history.replaceState({}, 'Open source jobs.', '/');
      // TODO: use state instead of manipulate dom directly
      document.querySelector('#signin-btn').style.visibility = 'hidden';
    } else if (window.localStorage.getItem('user')) {
      document.querySelector('#signin-btn').style.visibility = 'hidden';
    }
  }

  render() {
    return (
      <div>
        <Head title="Open source jobs" description="A list of Open Source projects offering jobs. For who want to work on open source and get paid." activeTab={1} />
        <Header title="Open source jobs" description="Working on open source and get paied" />
        <Jobs jobs={this.props.jobs} />
        <Footer />
      </div>
    );
  }
}

export default Index;
