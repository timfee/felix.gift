import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@300;500;700&family=Spline+Sans:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta property="og:type" content="product" />
          <meta property="og:title" content="Felix Freshener" />
          <meta property="og:url" content="https://felix.gift" />
          <meta property="og:image" content="https://felix.gift/Felix.png" />
          <meta
            property="og:description"
            content="Amaze your friends, terrify children and give your car the special musk that only a hairless cat can provide."
          />
          <meta property="product:plural_title" content="Felix Fresheners" />
          <meta property="product:price.amount" content="2.50" />
          <meta property="product:price.currency" content="USD" />
        </Head>
        <body className="bg-slate-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
