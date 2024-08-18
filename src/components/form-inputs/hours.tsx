// inputs for hours of work per day
import React from 'react';
import * as s from '@/src/state/user-inputs';
import Slider from '@react-native-community/slider';
import { RootState, useAppDispatch } from '@/src/state/store';
import { useSelector } from 'react-redux';

interface HoursInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const HoursWorkPerDayInput: React.FC<HoursInputProps> = (p) => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectHoursOfWorkPerDay(r));
  const onValueChange = (value: number) =>
    dispatch(s.a.updateHoursOfWorkPerDay(value));
  return (
    <Slider
      {...p}
      step={1}
      maximumValue={24}
      minimumValue={0}
      onValueChange={onValueChange}
      value={value}
    />
  );
};

export default HoursWorkPerDayInput;
