class Post extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    console.log('SLUG', slug);
    return { slug };
  }

  render() {
    return (
      <h1>
My blog post
        {this.props.slug}
      </h1>
    );
  }
}

export default Post;
