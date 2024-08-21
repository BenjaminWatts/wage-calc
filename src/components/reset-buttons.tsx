// buttons that reset all, or part of the user-inputs state

import React from 'react';
import ResetButton from '@/src/atoms/reset-button';
import { useAppDispatch } from '../state/store';
import * as s from '../state/user-inputs';

export const All: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetAll())} />;
};

export const SalaryAndPension: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetSalaryAndPension())} />;
};

export const WorkingSchedule: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetWorkingSchedule())} />;
};

export const Children: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetChildren())} />;
};

export const Child: React.FC<{ index: number }> = ({ index }) => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetChild(index))} />;
};

export const Commuting: React.FC = () => {
  const dispatch = useAppDispatch();
  return <ResetButton onPress={() => dispatch(s.a.resetCommuting())} />;
};
