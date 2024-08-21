// a component with the terms and conditions of the app, which is displayed on initial startup and on demand
// it needs to be able to comply with the rules of the various appstores
// it needs to be a modal that is presented over the top of the app

import React from 'react';
import { Button, Card, Modal, Paragraph } from 'react-native-paper';
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
          third-party services that may collect your data.
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

const AcceptTermsCard: React.FC = () => {
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
      </Card.Actions>
    </Card>
  );
};

const WithTerms: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const termsAccepted = useSelector(selectTermsAccepted);
  if (!termsAccepted) {
    return (
      <View
        style={{
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
          <AcceptTermsCard />
        </View>
      </View>
    );
  }
  return <>{children}</>;
};

export default WithTerms;
