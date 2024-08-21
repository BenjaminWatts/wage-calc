// buttons that reset all, or part of the user-inputs state

import React from 'react';
import ResetButton from '@/src/atoms/reset-button';
import { useAppDispatch } from '../state/store';
import * as s from '../state/user-inputs';
import { useNavigation } from 'expo-router';
import { useChild } from '../nav';

export const All: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetAll())} />;
};

export const SalaryAndPensionReset: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetSalaryAndPension())} />;
};

export const WorkingScheduleReset: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetWorkingSchedule())} />;
};

export const ChildrenReset: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetChildren())} />;
};

export const ChildReset: React.FC<{ index: number }> = ({ index }) => {
  const reload = useChild(index);
  const dispatch = useAppDispatch();
  return (
    <ResetButton
      onPress={() => {
        dispatch(s.a.resetChild(index));
        // this is a trick to get higher components to re-render
        reload();
      }}
    />
  );
};

export const CommutingReset: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetCommuting())} />;
};
