import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.initialLanguage}>
        <Head>
          <meta name="theme-color" content="#141724" />
        </Head>
        <body className="font-sans dD5d-items">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
