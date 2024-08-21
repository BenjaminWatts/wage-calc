/// inputs for annual income
import { List, Paragraph, TextInput } from 'react-native-paper';
import * as s from '../../state/user-inputs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/src/state/store';
import * as r from '@/src/calcs/rounding';
import { StyleSheet, View, ScrollView } from 'react-native';
import SliderWithLabels from '@/src/atoms/slider-with-labels';
import React from 'react';
import Slider from '@react-native-community/slider';
import { SalaryAndPensionReset } from '../reset-buttons';

interface SalaryInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = (p) => {
  return (
    <TextInput
      label={p.label}
      keyboardType="numeric"
      value={p.value ? p.value.toString() : ''}
      onChangeText={(v) => p.onChange(parseInt(v))}
    />
  );
};

const USER_LABEL = 'You';
const PARTNER_LABEL = 'Your Partner';

const UserSalary: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectAnnualSalary(r));
  const onChange = (value: number) => dispatch(s.a.updateAnnualSalary(value));
  return <SalaryInput label={USER_LABEL} value={value} onChange={onChange} />;
};

const UserPartnerSalary: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectPartnerAnnualIncome(r));
  const onChange = (value: number) =>
    dispatch(s.a.updatePartnerAnnualIncome(value));

  return (
    <SalaryInput label={PARTNER_LABEL} value={value} onChange={onChange} />
  );
};

interface PensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const PensionInput: React.FC<PensionInputProps> = (p) => (
  <SliderWithLabels
    label={p.label}
    maximumValue={0.5}
    minimumValue={0.001}
    formatter={r.percentage}
    onValueChange={p.onChange}
    value={p.value}
    step={0.0001}
  />
);

const EmployerPensionContributionInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) =>
    s.selectEmployerPensionContributionPc(r),
  );

  return (
    <PensionInput
      label="Employer Pension Contribution"
      value={value || 0}
      onChange={(value) =>
        dispatch(s.a.updateEmployerPensionContributionPc(value))
      }
    />
  );
};

const EmployeePensionContributionInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) =>
    s.selectEmployeePensionContributionPc(r),
  );
  return (
    <PensionInput
      label="Employee Pension Contribution"
      value={value || 0}
      onChange={(x) => dispatch(s.a.updateEmployeePensionContributionPc(x))}
    />
  );
};

const AgeInput: React.FC = () => {
  const currentAge = useSelector((r: RootState) => s.selectCurrentAge(r));
  const minimumValue = 21;
  const maximumValue = 65;
  return (
    <SliderWithLabels
      label="years old"
      value={currentAge}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={1}
      formatter={(x) => x.toString()}
      onValueChange={(x) => {}}
    />
  );
};

const PensionInputs: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <List.Accordion
      title="Pension Contributions (%)"
      left={(props) => <List.Icon {...props} icon="piggy-bank" />}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
    >
      <View
        style={{
          padding: 5,
          gap: 10,
        }}
      >
        <Paragraph>
          The following inputs are for your pension contributions. We value
          these as part of your total package which we include in our
          calculations of how much your hourly take home pay is.
        </Paragraph>
        <Paragraph>
          In order to do this, we make the simplifying assumption that, whenever
          you come to withdraw from your pension, you will pay Income Tax at the
          standard rate (currently 20%) on it. This is a simplification which
          allows us to ignore any complexity overwhat sort of returns you might
          expect to receive on your pension investments.
        </Paragraph>
        <EmployeePensionContributionInput />
        <EmployerPensionContributionInput />
        <Paragraph>
          For the time being, these inputs are designed with a Direct
          Contribution (DC) Pension in mind, not a final salary (or career
          average) Direct Benefit pension of the sort found in the public
          sector. However, in order to compare effectively how much you might
          earn in your lifetime as a teacher (which has a public sector DC
          pension), knowing your age is important.
        </Paragraph>
        <AgeInput />
      </View>
    </List.Accordion>
  );
};

const SalaryInputs: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <>
      <List.Accordion
        title="Annual Salary (£)"
        left={(props) => <List.Icon {...props} icon="cash" />}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
      >
        <View
          style={{
            padding: 5,
            gap: 10,
          }}
        >
          <Paragraph>
            Aside from your own salary which should be entered including the
            value of any benefits (like private health insurance) you receive as
            well as your partner's income.
          </Paragraph>
          <UserSalary />
          <Paragraph>
            If you have children, the availability of Child Benefit (and tax
            free and free childcare) depends on both your incomes.
          </Paragraph>
          <UserPartnerSalary />
        </View>
      </List.Accordion>
    </>
  );
};

const PensionSalaryInputs: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 10,
        padding: 5,
      }}
    >
      <SalaryInputs />
      <PensionInputs />
      <SalaryAndPensionReset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});

export default PensionSalaryInputs;
