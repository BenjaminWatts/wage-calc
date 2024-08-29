import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Cost of Work Calculator" />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Add favicon */}

        <link
          rel="icon"
          type="image/png"
          href="https://costofwork.app/icon.png"
        />
        <link rel="apple-touch-icon" href="https://costofwork.app/icon.png" />

        <meta
          name="description"
          content="Calculate your true take-home pay with Cost of Work Calculator. Factor in commute, childcare, and work-related expenses for remote, hybrid, and on-site jobs."
        />
        <meta
          name="keywords"
          content="wage calculator, salary calculator, cost of work, commute cost, childcare cost, hybrid work, remote work, take-home pay"
        />
        <meta name="author" content="kilowatts.io" />

        {/* Open Graph for Social Media */}
        <meta
          property="og:description"
          content="Discover the true cost of working, including commuting, childcare, and more. Calculate your take-home pay for remote, hybrid, or on-site jobs."
        />
        <meta property="og:image" content="https://costofwork.app/icon.png" />
        <meta property="og:url" content="https://costofwork.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cost of Work Calculator" />
        <meta
          name="twitter:description"
          content="Calculate your true take-home pay, considering all work-related expenses."
        />
        <meta name="twitter:image" content="https://costofwork.app/icon.png" />

        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Cost of Work Calculator',
              description:
                'Calculate your take-home pay by factoring in commuting, childcare, and other work-related expenses.',
              url: 'https://costofwork.app',
              author: {
                '@type': 'Person',
                name: 'kilowatts.io',
              },
              applicationCategory: 'FinancialApplication',
            }),
          }}
        />

        {/* Smart App Banner */}
        <meta name="apple-itunes-app" content={`app-id=${6670214363}`} />

        <link rel="stylesheet" href="smartbanner.css" />
        <script src="smartbanner.js" />

        <meta name="smartbanner:enabled-platforms" content="android" />
        <meta name="smartbanner:show" content="true" />

        <meta name="smartbanner:title" content="Cost of Work" />
        <meta name="smartbanner:author" content="kilowatts.io Limited" />
        <meta name="smartbanner:price" content="" />
        {/* <meta name="smartbanner:price-suffix-apple" content=" - On the App Store"> */}
        <meta
          name="smartbanner:price-suffix-google"
          content="from Google Play"
        />
        {/* <meta name="smartbanner:icon-apple" content="https://url/to/apple-store-icon.png"> */}
        <meta
          name="smartbanner:icon-google"
          content="https://costofwork.app/icon-192.png"
        />
        <meta name="smartbanner:button" content="Download" />
        {/* <meta name="smartbanner:button-url-apple" content="https://ios/application-url"> */}
        <meta
          name="smartbanner:button-url-google"
          content="https://play.google.com/store/apps/details?id=com.benjaminwatts.CostOfWork"
        />
        <meta name="smartbanner:close-label" content="Close" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
