import React from 'react';
import * as s from '@/src/state/user-inputs';
import { RootState, useAppDispatch } from '@/src/state/store';
import { useSelector } from 'react-redux';
import { minimumAnnualLeave, workingDays } from '@/src/calcs/take-home/days';
import SliderWithLabels from '@/src/atoms/slider-with-labels';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WorkingScheduleReset } from '../reset-buttons';
import ListAccordion from '@/src/atoms/accordion';
import { HOLIDAY, HOME, WORKING_SCHEDULE } from '../icons';

const DaysSlider: React.FC<{
  label: string;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
  value: number;
  offset?: number;
}> = (p) => {
  return (
    <SliderWithLabels
      label={p.label}
      minimumValue={p.minimumValue}
      maximumValue={p.maximumValue}
      value={p.value}
      formatter={(x) => x.toFixed(0)}
      step={1}
      onValueChange={(x) => p.onValueChange(Math.round(x))}
      offset={p.offset}
    />
  );
};

const PerWeekOfWorking: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectDaysPerWeekOfWorking(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateDaysPerWeekOfWorking(value));

  return (
    <DaysSlider
      label="working days per week"
      minimumValue={1}
      maximumValue={5}
      onValueChange={onChange}
      value={value}
      offset={0}
    />
  );
};

const PerWeekInOffice: React.FC = () => {
  const dispatch = useAppDispatch();
  const maximumValue = useSelector((r: RootState) =>
    s.selectDaysPerWeekOfWorking(r),
  );
  const value = useSelector((r: RootState) => s.selectDaysPerWeekInOffice(r));

  return (
    <DaysSlider
      label="days per week in the office"
      minimumValue={0}
      maximumValue={Math.round(maximumValue)}
      onValueChange={(value: number) =>
        dispatch(s.a.updateDaysPerWeekInOffice(value))
      }
      value={value}
      offset={1}
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
    <DaysSlider
      label="days holiday (inc bank hols)"
      minimumValue={minimumAnnualLeave(daysPerWeekOfWorking)}
      maximumValue={maximumValue}
      onValueChange={onChange}
      value={value}
    />
  );
};

const HoursWorkPerDayInput: React.FC = (p) => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectHoursOfWorkPerDay(r));
  const onValueChange = (value: number) =>
    dispatch(s.a.updateHoursOfWorkPerDay(value));
  return (
    <SliderWithLabels
      {...p}
      step={1}
      maximumValue={14}
      minimumValue={1}
      onValueChange={onValueChange}
      value={value}
      label="hours of work per day"
      formatter={(value) => value.toString()}
    />
  );
};

const WeeklySchedule: React.FC = () => {
  return (
    <ListAccordion
      title="Weekly Routine"
      icon={WORKING_SCHEDULE}
      hideCard={true}
    >
      <View style={styles.accordionContent}>
        <HoursWorkPerDayInput />
        <PerWeekOfWorking />
      </View>
    </ListAccordion>
  );
};

const HybridSplit: React.FC = () => {
  return (
    <ListAccordion title="Hybrid split" icon={HOME} hideCard={true}>
      <View style={styles.accordionContent}>
        <PerWeekInOffice />
      </View>
    </ListAccordion>
  );
};

const HolidayAccordian: React.FC = () => {
  return (
    <ListAccordion title="Holiday/Leave" icon={HOLIDAY} hideCard={true}>
      <HolidayDaysPerYear />
    </ListAccordion>
  );
};

const WorkingsScheduleInputs: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <WeeklySchedule />
      <HybridSplit />
      <HolidayAccordian />
      <WorkingScheduleReset />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  view: {
    flex: 1,
    gap: 10,
  },
  text: {
    fontSize: 20,
  },
  accordionContent: {
    paddingVertical: 10,
    gap: 10,
    width: '100%',
  },
});

export default WorkingsScheduleInputs;
