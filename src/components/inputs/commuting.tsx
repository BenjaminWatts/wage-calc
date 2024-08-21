import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { List, Paragraph, TextInput, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as s from '@/src/state/user-inputs';
import { StyleSheet, ScrollView } from 'react-native';
import CostInput from '@/src/atoms/cost-input';
import { CommutingReset } from '../reset-buttons';

// inputs for transport including drivingDistancePerCommuteMiles, carFuelType, commuteDoorToDoorMinutes, dailyParkingCost, dailyTrainBusTicketCost, flexiSeasonTicketCost, seasonTicketCost

type NumericInputProps = {
  minimumValue: number;
  label: string;
  value?: number;
  onChange: (value: number) => void;
};

const NumericInput = ({ label, value, onChange }: NumericInputProps) => {
  const [currentValue, setCurrentValue] = React.useState(
    value && value.toString(),
  );
  return (
    <TextInput
      label={label}
      value={currentValue || ''}
      onBlur={(e) => onChange(parseFloat(e.nativeEvent.text))}
      onChangeText={setCurrentValue}
      keyboardType="numeric"
    />
  );
};

const DrivingDistancePerCommuteMiles: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.drivingDistancePerCommuteMiles,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="Distance (miles)"
      value={value}
      onChange={(value) =>
        dispatch(s.a.updateDrivingDistancePerCommuteMiles(value))
      }
    />
  );
};

//dailyParkingCost
const DailyParkingCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.dailyParkingCost,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="£ Daily parking"
      value={value}
      onChange={(value) => dispatch(s.a.updateDailyParkingCost(value))}
    />
  );
};

const DrivingCosts: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <List.Accordion
      title="Driving Costs"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={(props) => <List.Icon {...props} icon="car" />}
    >
      <Paragraph>
        If driving is part of your commute, please enter the costs associated.
        If not, please leave these fields blank.
      </Paragraph>
      <DrivingDistancePerCommuteMiles />
      <DailyParkingCost />
    </List.Accordion>
  );
};

//dailyTrainBusTicketCost
const DailyTrainBusTicketCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.dailyTrainBusTicketCost,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="£ Daily"
      value={value}
      onChange={(value) => dispatch(s.a.updateDailyTrainBusTicketCost(value))}
    />
  );
};

//flexiSeasonTicketCost
const FlexiSeasonTicketCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.flexiSeasonTicketCost,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="£ Annual Flexi season ticket"
      value={value || 0}
      onChange={(value) => dispatch(s.a.updateFlexiSeasonTicketCost(value))}
    />
  );
};

//seasonTicketCost
const SeasonTicketCost: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.seasonTicketCost,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="£ Annual Season ticket"
      value={value}
      onChange={(value) =>
        dispatch({
          type: 'userInputs/setSeasonTicketCost',
          payload: value,
        })
      }
    />
  );
};

const PublicTransportCosts: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <List.Accordion
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={(p) => <List.Icon {...p} icon="bus" />}
      title="Public Transport Costs"
      id="public-transport-costs"
    >
      <Paragraph>
        Please enter the cost of commuting by public transport. If public
        transport is only part of the commute, then enter driving costs
        separately above.
      </Paragraph>
      <DailyTrainBusTicketCost />
      <Paragraph>
        If you want to consider how the cost of commuting per day varies with
        the number of days you work in the office, please enter the cost of
        either annual flexi season ticket and an annual season ticket. If you
        don't enter these, we will estimate what they cost for your route, based
        on the daily cost.
      </Paragraph>
      <FlexiSeasonTicketCost />
      <SeasonTicketCost />
    </List.Accordion>
  );
};

const CommuteDoorToDoorMinutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.commuteDoorToDoorMinutes,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="Commute door to door (minutes)"
      value={value}
      onChange={(value) => dispatch(s.a.updateCommuteDoorToDoorMinutes(value))}
    />
  );
};

const TimeInputs: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <List.Accordion
      title="Time Inputs"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={(props) => <List.Icon {...props} icon="clock" />}
    >
      <Paragraph>
        In order to more accurately calculate how much you earn per hour,
        including the time you spend commuting, we need to know how long your
        commute is. on days that you work in the office.
      </Paragraph>
      <CommuteDoorToDoorMinutes />
    </List.Accordion>
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

const HotelCosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.overnightHotelCost,
  );
  const onChange = (value: number) =>
    dispatch(s.a.updateOvernightHotelCost(value));
  return (
    <>
      <CostInput
        label="Overnight hotel (and dinner) cost"
        value={value}
        onChange={onChange}
      />
      <Paragraph>
        This will assume that you have to spend (n-1) nights in a hotel close to
        your place of work, where n is the number of days you work in the
        office. So if you work 3 days in the office (and for example these were
        Mon, Tues, Wed), you would spend 2 nights in a hotel. It will also knock
        out Driving and Public Transport costs for those days.
      </Paragraph>
    </>
  );
};

const IncidentalCosts: React.FC = () => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <List.Accordion
      title="Incidental Commuting Costs"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={(props) => <List.Icon {...props} icon="receipt" />}
    >
      <Paragraph>
        There are often other incidental costs to commuting in an office that
        you wouldn't face working from home, such as having (or finding just way
        more convenient) to buy breakfast/coffee/lunch out, having to maintain a
        bigger wardrobe, dry cleaning and paying a dog walker.
      </Paragraph>
      <Paragraph>
        These costs can add up, and can eat significantly into your take-home
        pay.
      </Paragraph>
      <DailyBreakfastCoffeeCost />
      <DailyLunchCost />
      <DryCleaningCostPerDay />
      <HotelCosts />
    </List.Accordion>
  );
};

const CommutingInputs: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DrivingCosts />
      <PublicTransportCosts />
      <IncidentalCosts />
      <TimeInputs />
      <CommutingReset />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { gap: 10, padding: 10 },
});

export default CommutingInputs;
