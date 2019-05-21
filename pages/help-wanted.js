import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import HelpWanted from './components/HelpWanted';

class Index extends React.Component {
  static async getInitialProps({ query: { issues, repos } }) {
    return { issues, repos };
  }

  render() {
    return (
      <div>
        <Head title="Help wanted" description="Collect issues on github tagged with help-wanted" activeTab={1} />
        <Header title="Help wanted" description="(unfinished)Collect issues on github tagged with help-wanted" />
        <HelpWanted issues={this.props.issues} repos={this.props.repos} />
        <Footer />
      </div>
    );
  }
}

export default Index;
