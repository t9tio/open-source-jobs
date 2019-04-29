import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';

class Index extends React.Component {
  static async getInitialProps({ query: { issues } }) {
    return { issues };
  }

  render() {
    return (
      <div>
        <Head title="Help wanted" description="Collect issues on github tagged with help-wanted" activeTab={1} />
        <Header title="Help wanted" description="Collect issues on github tagged with help-wanted" />
        <section className="section">
          <div className="container">
            <p className="title">Coming soon... </p>
            <br />
            <p className="subtitle">
              <a href="https://oo.t9t.io/auth/github">Sign in with GitHub</a>
              {' '}
              to get notified when this is finished
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Index;
