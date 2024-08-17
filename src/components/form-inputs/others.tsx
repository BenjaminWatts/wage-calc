import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as s from '@/src/state/user-inputs';

interface CostInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const CostInput: React.FC<CostInputProps> = ({ label, value, onChange }) => {
  return (
    <TextInput
      label={label}
      value={value ? value.toString() : ''}
      onChangeText={(text) => {
        const number = parseFloat(text);
        if (!isNaN(number)) {
          onChange(number);
        }
      }}
      keyboardType="numeric"
    />
  );
};
const DailyBreakfastCoffeeCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.dailyBreakfastCoffeeCost,
  );
  const onChange = (value: number) =>
    dispatch(s.a.updateDailyBreakfastCoffeeCost(value));
  return (
    <CostInput
      label="Daily breakfast coffee cost"
      value={value}
      onChange={onChange}
    />
  );
};

const DailyLunchCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.dailyLunchCost,
  );
  const onChange = (value: number) => dispatch(s.a.updateDailyLunchCost(value));
  return (
    <CostInput label="Daily lunch cost" value={value} onChange={onChange} />
  );
};

const DryCleaningCostPerDay: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.dryCleaningCostPerDay,
  );
  const onChange = (value: number) =>
    dispatch(s.a.updateDryCleaningCostPerDay(value));
  return (
    <CostInput
      label="Dry cleaning cost per day"
      value={value}
      onChange={onChange}
    />
  );
};

const OtherInputs: React.FC = () => {
  return (
    <>
      <DailyBreakfastCoffeeCost />
      <DailyLunchCost />
      <DryCleaningCostPerDay />
    </>
  );
};

export default OtherInputs;
