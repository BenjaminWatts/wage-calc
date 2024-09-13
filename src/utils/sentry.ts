import * as Sentry from '@sentry/react-native';

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://04af1e62e8dd9e1f153c9b63effe6466@o4505890996748288.ingest.us.sentry.io/4507819722211328',
  });
};

export default initSentry;

export const captureException = (e: Error) => {
  Sentry.captureException(e);
};
