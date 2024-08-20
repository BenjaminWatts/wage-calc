import React from 'react';
import * as s from '@/src/state/user-inputs';
import { RootState, useAppDispatch } from '@/src/state/store';
import { useSelector } from 'react-redux';
import { minimumAnnualLeave, workingDays } from '@/src/calcs/take-home/days';
import SliderWithLabels from '@/src/atoms/slider-with-labels';
import { List } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

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
  console.log(value);

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
  const [expanded, setExpanded] = React.useState(true);
  return (
    <List.Accordion
      title="Weekly Routine"
      expanded={expanded}
      left={(p) => <List.Icon {...p} icon="calendar-week" />}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.accordionContent}>
        <HoursWorkPerDayInput />
        <PerWeekOfWorking />
      </View>
    </List.Accordion>
  );
};

const HybridSplit: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <List.Accordion
      title="In Office versus Home Split"
      expanded={expanded}
      left={(p) => <List.Icon {...p} icon="home" />}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.accordionContent}>
        <PerWeekInOffice />
      </View>
    </List.Accordion>
  );
};

const HolidayAccordian: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <List.Accordion
      title="Holiday/Leave"
      expanded={expanded}
      left={(p) => <List.Icon {...p} icon="beach" />}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.accordionContent}>
        <HolidayDaysPerYear />
      </View>
    </List.Accordion>
  );
};

const WorkingsScheduleInputs: React.FC = () => {
  return (
    <View style={styles.view}>
      <WeeklySchedule />
      <HybridSplit />
      <HolidayAccordian />
    </View>
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
    padding: 10,
  },
});

export default WorkingsScheduleInputs;
