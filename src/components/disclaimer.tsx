import React from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectTermsAccepted } from '../state/app';
import { ScrollView, View } from 'react-native';
import { useAppDispatch } from '../state/store';
import * as s from '../state/app';

const TermsAndConditions: React.FC = () => {
  return (
    <Card>
      <Card.Title title={`App: Terms and Conditions `} />
      <Card.Content style={{ gap: 10 }}>
        <Paragraph>
          This app is in an early stage of development and is provided for
          informational purposes. The functionality of the app may be subject to
          updates, and while efforts are made to ensure accuracy, users may
          encounter occasional issues. By using this app, you acknowledge that
          it is still under development and agree to use it at your own risk.
        </Paragraph>
        <Paragraph>
          This app is not intended to provide financial advice. Any calculations
          or recommendations made within the app should not be considered a
          substitute for professional financial advice. You should consult with
          a qualified financial advisor to determine your specific financial
          needs.
        </Paragraph>
        <Paragraph>
          This app is provided "as is," with no warranties, express or implied.
          The developers make no representations regarding the accuracy,
          completeness, or reliability of the app's functionality or the results
          derived from its use. The developers shall not be liable for any
          direct, indirect, incidental, or consequential damages or losses
          incurred as a result of using this app, including but not limited to
          financial losses, loss of data, or other damages.
        </Paragraph>
        <Paragraph>
          This app is intended for use by employees residing in England (UK)
          only. The app's calculations and features are tailored to England's
          tax and childcare support rules. It does not account for the
          variations in tax and childcare support rules in Northern Ireland,
          Scotland, or Wales. Users outside of England should not rely on this
          app for accurate financial calculations.
        </Paragraph>
        <Paragraph>
          The app includes calculations related to Child Benefit, Tax-Free
          Childcare, and Free Childcare. However, it does not account for other
          aspects of the UK's benefit system, including but not limited to
          Universal Credit, Housing Benefit, and Council Tax Support. Due to the
          complexity of these benefits and their high marginal tax rates, this
          app's calculations may not be accurate or comprehensive.
        </Paragraph>
        <Paragraph>
          All information entered in this app remains on your device or within
          your browser. The app does not transmit any user data to external
          servers, and no personal information is collected, stored, or shared
          by the developers.
        </Paragraph>
        <Paragraph>
          This app uses Sentry, a third-party service, to collect error reports
          and crash analytics. The information collected by Sentry is limited to
          technical data and is used solely to help the developers identify and
          fix bugs. No personal or financial data is transmitted to Sentry.
        </Paragraph>
        <Paragraph>
          Other than Sentry for error reporting, this app does not use any
          third-party services that collect, share, or process your personal
          data.
        </Paragraph>
        <Paragraph>
          By using this app, you acknowledge that you have read, understood, and
          agree to these Terms and Conditions and the Privacy Policy. If you do
          not agree to these terms, please discontinue the use of the app
          immediately.
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export const TermsContent: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 15,
        padding: 10,
      }}
    >
      <TermsAndConditions />
    </ScrollView>
  );
};

export const AcceptTermsCard: React.FC<{
  cancel?: () => void;
}> = ({ cancel }) => {
  const dispatch = useAppDispatch();

  return (
    <Card>
      <Card.Title title="Accept Terms" />
      <Card.Content>
        <Paragraph>
          To view the calculations, you must first accept the terms and
          conditions to use this app.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            dispatch(s.a.acceptTerms());
          }}
        >
          I Accept
        </Button>
        {cancel && <Button onPress={cancel}>Cancel</Button>}
      </Card.Actions>
    </Card>
  );
};

export const TermsModal: React.FC<{
  display: boolean;
  children: React.ReactNode;
  cancel?: () => void;
}> = ({ display, children, cancel }) => {
  if (display) {
    return (
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          gap: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <TermsContent />
        </View>
        <View
          style={{
            height: 300,
            padding: 10,
          }}
        >
          <AcceptTermsCard cancel={cancel} />
        </View>
      </ScrollView>
    );
  }
  return <>{children}</>;
};

const WithTerms: React.FC<{
  children: React.ReactNode;
  cancel?: () => void;
}> = ({ children, cancel }) => {
  const termsAccepted = useSelector(selectTermsAccepted);
  return (
    <TermsModal display={!termsAccepted} cancel={cancel}>
      {children}
    </TermsModal>
  );
};

export default WithTerms;
