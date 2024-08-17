import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

// inputs for transport including drivingDistancePerCommuteMiles, carFuelType, commuteDoorToDoorMinutes, dailyParkingCost, dailyTrainBusTicketCost, flexiSeasonTicketCost, seasonTicketCost

type NumericInputProps = {
  minimumValue: number;
  label: string;
  value?: number;
  onChange: (value: number) => void;
};

const NumericInput = ({
  minimumValue,
  label,
  value,
  onChange,
}: NumericInputProps) => {
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

const DrivingDistancePerCommuteMiles: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector(
    (state: RootState) => state.userInputs.drivingDistancePerCommuteMiles,
  );
  return (
    <NumericInput
      minimumValue={0}
      label="Driving distance per commute (miles)"
      value={value}
      onChange={(value) =>
        dispatch({
          type: 'userInputs/setDrivingDistancePerCommuteMiles',
          payload: value,
        })
      }
    />
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
      onChange={(value) =>
        dispatch({
          type: 'userInputs/setCommuteDoorToDoorMinutes',
          payload: value,
        })
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
      label="Daily parking cost"
      value={value}
      onChange={(value) =>
        dispatch({
          type: 'userInputs/setDailyParkingCost',
          payload: value,
        })
      }
    />
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
      label="Daily train/bus ticket cost"
      value={value}
      onChange={(value) =>
        dispatch({
          type: 'userInputs/setDailyTrainBusTicketCost',
          payload: value,
        })
      }
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
      label="Flexi season ticket cost"
      value={value}
      onChange={(value) =>
        dispatch({
          type: 'userInputs/setFlexiSeasonTicketCost',
          payload: value,
        })
      }
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
      label="Season ticket cost"
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

const TransportInputs: React.FC = () => {
  return (
    <>
      <DrivingDistancePerCommuteMiles />
      <CommuteDoorToDoorMinutes />
      <DailyParkingCost />
      <DailyTrainBusTicketCost />
      <FlexiSeasonTicketCost />
      <SeasonTicketCost />
    </>
  );
};

export default TransportInputs;
