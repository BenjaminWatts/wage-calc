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
      <Card.Title title={`Beta App: Terms and Conditions `} />
      <Card.Content style={{ gap: 10 }}>
        <Paragraph>
          This app is for an early beta release. It is not intended to provide
          financial advice. You should consult with a professional to determine
          your financial needs.
        </Paragraph>
        <Paragraph>
          This app is provided as-is with no warranty. The developers are not
          liable for any damages or losses incurred by using this app.
        </Paragraph>
        <Paragraph>
          The app is intended for use by employees living in England (UK).
          Northern Ireland, Scotland and Wales have variations on their tax (and
          childcare support rules) for which the calculations in this app are
          not tailored.
        </Paragraph>
        <Paragraph>
          The app takes account of Chid Benefit, Tax-Free and Free Childcare.
          However, it takes no account of other aspects of the benefit system,
          especially Universal Credit, Housing Benefit, Council Tax Support.
          These benefits have some particularly high claw-back (or marginal tax
          rates) and this app is unlikely to be accurate.
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const Privacy: React.FC = () => {
  return (
    <Card>
      <Card.Title title={` Privacy Policy`} />
      <Card.Content>
        <Paragraph>
          All the information entered in this app stays on your device / inside
          your browser. None is sent to any server. This app does not use any
          third-party services with the intention of collecting your data.
        </Paragraph>
        <Paragraph>
          This app uses Sentry to collect error reports. This is to help the app
          developers to fix bugs.
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
      <Privacy />
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
