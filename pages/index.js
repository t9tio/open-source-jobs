import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import Jobs from './components/Jobs';

class Index extends React.Component {
  static async getInitialProps({ query: { jobs } }) {
    return { jobs };
  }

  render() {
    return (
      <div>
        <Head title="Open source jobs" description="A list of Open Source projects offering jobs. For who want to work on open source and get paid." activeTab={1} />
        <Header title="Open source jobs" description="Working on open source and get paid" />
        <Jobs jobs={this.props.jobs} />
        <Footer />
      </div>
    );
  }
}

export default Index;
