// inputs for the cost of childcare, both for termtime, inOfficeWraparound and holiday periods

import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { TextInput } from 'react-native-paper';
import * as s from '@/src/state/user-inputs';
import { useSelector } from 'react-redux';

interface CostInputProps {
  value: number;
  onChange: (value: number) => void;
}

const CostInput: React.FC<CostInputProps> = ({ value, onChange }) => {
  return (
    <TextInput
      label="Cost"
      value={value.toString()}
      onChangeText={(x) => onChange(parseFloat(x))}
      keyboardType="numeric"
    />
  );
};

const HourlyTermtimeChildcareCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const onChange = (x: number) =>
    dispatch(s.a.updateHourlyHolidayChildcareCost(x));
  const value = useSelector((r: RootState) =>
    s.selectHourlyTermtimeChildcareCost(r),
  );
  return <CostInput onChange={onChange} value={value} />;
};

// create an input for inOfficeIncrementalChildcareCost

const InOfficeIncrementalChildcareCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const onChange = (x: number) =>
    dispatch(s.a.updateInOfficeIncrementalChildcareCost(x));
  const value = useSelector((r: RootState) =>
    s.selectInOfficeIncrementalChildcareCost(r),
  );
  return <CostInput onChange={onChange} value={value || 0} />;
};

const HourlyHolidayChildcareCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const onChange = (x: number) =>
    dispatch(s.a.updateHourlyHolidayChildcareCost(x));
  const value = useSelector((r: RootState) =>
    s.selectHourlyHolidayChildcareCost(r),
  );
  return <CostInput onChange={onChange} value={value || 0} />;
};

const ChildcareCostInputs: React.FC = () => {
  return (
    <>
      <HourlyTermtimeChildcareCost />
      <InOfficeIncrementalChildcareCost />
      <HourlyHolidayChildcareCost />
    </>
  );
};

export default ChildcareCostInputs;
