/// inputs for annual income
import { List, Paragraph, TextInput } from 'react-native-paper';
import * as s from '../../state/user-inputs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/src/state/store';
import * as r from '@/src/calcs/rounding';
import { StyleSheet, View } from 'react-native';
import SliderWithLabels from '@/src/atoms/slider-with-labels';
import React from 'react';

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

const PensionInputs: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <List.Accordion
      title="Pension Contributions (%)"
      left={(props) => <List.Icon {...props} icon="piggy-bank" />}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
    >
      <View style={styles.container}>
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
          sector.
        </Paragraph>
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
        <Paragraph>
          Aside from your own salary which should be entered including the value
          of any benefits (like private health insurance) you receive as well as
          your partner's income.
        </Paragraph>
        <UserSalary />
        <UserPartnerSalary />
        <Paragraph>
          If you have children, the availability of Child Benefit (and tax free
          and free childcare) depends on both your incomes.
        </Paragraph>
      </List.Accordion>
    </>
  );
};

const PensionSalaryInputs: React.FC = () => {
  return (
    <>
      <SalaryInputs />
      <PensionInputs />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
});

export default PensionSalaryInputs;
