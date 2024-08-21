import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>Cost of Work Calculator -- Commuting, Children and Taxes </title>

        {/* Add favicon */}

        <link rel="icon" type="image/png" href="favicon.png" />
        <link rel="apple-touch-icon" href="icon.png" />

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
        <meta property="og:title" content="Cost of Work Calculator" />
        <meta
          property="og:description"
          content="Discover the true cost of working, including commuting, childcare, and more. Calculate your take-home pay for remote, hybrid, or on-site jobs."
        />
        <meta property="og:image" content="icon.png" />
        <meta property="og:url" content="https://costofwork.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cost of Work Calculator" />
        <meta
          name="twitter:description"
          content="Calculate your true take-home pay, considering all work-related expenses."
        />
        <meta name="twitter:image" content="icon.png" />

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
