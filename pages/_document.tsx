import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import * as snippet from '@segment/snippet'

export default function Document() {
  const renderSnippet = () => {
    const opts = {
      apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
      // note: the page option only covers SSR tracking.
      // Page.js is used to track other events using `window.analytics.page()`
      page: true,
    }

    if (process.env.NODE_ENV === 'development') {
      return snippet.max(opts)
    }

    return snippet.min(opts);
  }

  return (
    <Html>
      <Head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&display=swap" rel="stylesheet" />
        {/* Inject the Segment snippet into the <head> of the document  */}
        <Script
          id="segment-script"
          dangerouslySetInnerHTML={{ __html: renderSnippet() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}