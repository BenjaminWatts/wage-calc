import React from 'react';
import * as Sentry from '@sentry/react';
import FallbackComponent from './fallback';
import RNEB from 'react-native-error-boundary';

const ErrorBoundary: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <RNEB
      FallbackComponent={FallbackComponent}
      onError={(error, stackTrace) => {
        if (__DEV__) {
          console.error(error);
          console.error(stackTrace);
        } else {
          Sentry.captureException(error);
          Sentry.captureMessage(stackTrace);
        }
      }}
    >
      <>{children}</>
    </RNEB>
  );
};

export default ErrorBoundary;
