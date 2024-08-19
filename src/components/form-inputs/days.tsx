// inputs to define of days worked, from home etc
import * as s from '../../state/user-inputs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/src/state/store';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import React from 'react';
import { workingDays } from '@/src/calcs/take-home/days';

interface DayInputComponentProps {
  label: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
}

const DayInputComponent: React.FC<DayInputComponentProps> = (p) => {
  const screenWidth = useWindowDimensions();
  return (
    <View style={styles.sliderView}>
      <View style={styles.labelWrapper}>
        <Text>{`${p.value} ${p.label}`}</Text>
      </View>
      <View style={styles.limitTextWrapper}>
        <Text>{p.minimumValue}</Text>
      </View>
      <View
        style={{
          ...styles.slider,
          width: screenWidth.width - styles.labelWrapper.width - 80,
        }}
      >
        <Slider
          style={{ width: '100%' }}
          {...p}
          step={1}
          onValueChange={p.onValueChange}
        />
      </View>
      <View style={styles.limitTextWrapper}>
        <Text
          style={{
            textAlign: 'right',
          }}
        >
          {p.maximumValue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelWrapper: {
    width: 250,
  },
  limitTextWrapper: {
    width: 25,
  },
  slider: {},
  sliderView: {
    gap: 5,
    height: 40,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// create inputs for different days

const PerWeekOfWorking: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectDaysPerWeekOfWorking(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateDaysPerWeekOfWorking(value));

  return (
    <DayInputComponent
      label="working days per week"
      minimumValue={1}
      maximumValue={7}
      onValueChange={onChange}
      value={value}
    />
  );
};

const PerWeekInOffice: React.FC = () => {
  const dispatch = useAppDispatch();
  const maximumValue = useSelector((r: RootState) =>
    s.selectDaysPerWeekOfWorking(r),
  );
  const value = useSelector((r: RootState) => s.selectDaysPerWeekInOffice(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateDaysPerWeekInOffice(value));

  return (
    <DayInputComponent
      label="days per week in the office"
      minimumValue={0}
      maximumValue={maximumValue}
      onValueChange={onChange}
      value={value}
    />
  );
};

const HolidayDaysPerYear: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectHolidayDaysPerYear(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateHolidayDaysPerYear(value));
  const daysPerWeekOfWorking = useSelector((r: RootState) =>
    s.selectDaysPerWeekOfWorking(r),
  );
  const maximumValue = Math.trunc(
    workingDays({
      daysPerWeekOfWorking,
    }),
  );

  return (
    <DayInputComponent
      label="days holiday (exc bank hols)"
      minimumValue={0}
      maximumValue={maximumValue}
      onValueChange={onChange}
      value={value}
    />
  );
};

const DaysInputs: React.FC = () => {
  return (
    <>
      <PerWeekOfWorking />
      <PerWeekInOffice />
      <HolidayDaysPerYear />
    </>
  );
};

export default DaysInputs;
