/// inputs for annual income
import { Card, List, Paragraph, Text } from 'react-native-paper';
import * as s from '../../state/user-inputs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/src/state/store';
import * as r from '@/src/calcs/rounding';
import { View, ScrollView } from 'react-native';
import SliderWithLabels from '@/src/atoms/slider-with-labels';
import React from 'react';
import { SalaryAndPensionReset } from '../reset-buttons';
import CostInput from '@/src/atoms/cost-input';
import { CASH, PENSION } from '../icons';
import ListAccordion from '@/src/atoms/accordion';

const USER_LABEL = 'You';

const UserSalary: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectAnnualSalary(r));
  const onChange = (value: number) => dispatch(s.a.updateAnnualSalary(value));
  return <CostInput label={USER_LABEL} value={value} onChange={onChange} />;
};

interface PensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const PensionInput: React.FC<PensionInputProps> = (p) => (
  <SliderWithLabels
    label={p.label}
    maximumValue={0.2}
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
      label="Employer"
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
      label="Employee"
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
  return (
    <ListAccordion title="Pension" icon={PENSION}>
      <Paragraph>
        The following inputs are for your pension contributions. We value these
        as part of your total package which we include in our calculations of
        how much your hourly take home pay is.
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
        For the time being, these inputs are designed with a Direct Contribution
        (DC) Pension in mind, not a final salary (or career average) Direct
        Benefit pension of the sort found in the public sector. However, in
        order to compare effectively how much you might earn in your lifetime as
        a teacher (which has a public sector DC pension), knowing your age is
        important.
      </Paragraph>
      <AgeInput />
    </ListAccordion>
  );
};

const SalaryInputs: React.FC = () => {
  return (
    <ListAccordion
      title="Salary"
      icon={CASH}
      iniitalExpanded={true}
      hideCard={true}
    >
      <UserSalary />
    </ListAccordion>
  );
};

const PensionSalaryInputs: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 5,
      }}
    >
      <SalaryInputs />
      <PensionInputs />
      <SalaryAndPensionReset />
    </ScrollView>
  );
};

export default PensionSalaryInputs;
