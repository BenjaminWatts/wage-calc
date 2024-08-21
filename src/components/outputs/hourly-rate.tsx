/// a badge/button component to be displayed in headerRight including on input screens

import { useCalculation } from '@/src/hooks';
import React from 'react';
import { Button } from 'react-native-paper';
import * as r from '@/src/calcs/rounding';
import { useNavigation } from 'expo-router';
import { useCalcs } from '@/src/nav';
import { useSelector } from 'react-redux';
import { selectTermsAccepted } from '@/src/state/app';

const WithHourlyRateHeaderRight: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const termsAccepted = useSelector(selectTermsAccepted);
  const result = useCalculation();
  const rate = r.financial.hourly(result.takeHome.netHourlyPay);
  const nav = useNavigation();
  const onPress = useCalcs();
  React.useEffect(() => {
    if (!termsAccepted) return;
    nav.setOptions({
      headerRight: () => (
        <Button onPress={onPress} mode="text">
          Take-home: {rate}
        </Button>
      ),
    });
  }, [rate, termsAccepted]);
  return <>{children}</>;
};

export default WithHourlyRateHeaderRight;
