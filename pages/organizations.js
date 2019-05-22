import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import Organizations from './components/Organizations';
import Nav from './components/Nav';

class Index extends React.Component {
  static async getInitialProps({ query: { organizations } }) {
    return { organizations };
  }

  render() {
    return (
      <div>
        <Head title="Open companies" description="For profit organizations who open sourced their major products" activeTab={1} />
        <Nav />
        <Header title="Open companies" description="For profit organizations who open sourced their major products" />
        <Organizations organizations={this.props.organizations} />
        <Footer />
      </div>
    );
  }
}

export default Index;
