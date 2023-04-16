import { DocumentContext, DocumentInitialProps } from 'next/document'
import { Fragment } from 'react'
import { ServerStyleSheet } from 'styled-components'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <Fragment key={initialProps.html.length}>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="fa-IR">
        <Head>
          <meta charSet="utf-8" className="next-head"></meta>
          <meta name="theme-color" content="#fff" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
