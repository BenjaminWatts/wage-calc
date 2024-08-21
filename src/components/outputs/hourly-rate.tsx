/// a badge/button component to be displayed in headerRight including on input screens

import { useCalculation } from '@/src/hooks';
import React from 'react';
import { Button } from 'react-native-paper';
import * as r from '@/src/calcs/rounding';
import { useNavigation } from 'expo-router';
import { useCalcs } from '@/src/nav';
import { useSelector } from 'react-redux';
import { selectTermsAccepted } from '@/src/state/app';
import { TermsModal } from '../disclaimer';

const NotAcceptedPrompt: React.FC<{
  onPress: () => void;
}> = ({ onPress }) => {
  return (
    <Button icon={'calculator'} onPress={onPress}>
      Calculate Now
    </Button>
  );
};

const WithHourlyRateHeaderRight: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [visible, setVisible] = React.useState(false);

  const termsAccepted = useSelector(selectTermsAccepted);
  const result = useCalculation();
  const rate = r.financial.hourly(result.takeHome.netHourlyPay);
  const nav = useNavigation();
  const onPress = useCalcs();

  React.useEffect(() => {
    if (!termsAccepted) {
      nav.setOptions({
        headerRight: () => (
          <NotAcceptedPrompt onPress={() => setVisible(true)} />
        ),
      });
    } else {
      nav.setOptions({
        headerRight: () => (
          <Button onPress={onPress} mode="text">
            Take-home: {rate}
          </Button>
        ),
      });
    }
  }, [rate, termsAccepted]);

  return (
    <TermsModal
      display={!termsAccepted && visible}
      cancel={() => setVisible(false)}
    >
      {children}
    </TermsModal>
  );
};

export default WithHourlyRateHeaderRight;
