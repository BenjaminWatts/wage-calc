// edit the currentAge of the user

import React from 'react';

import { TextInput } from 'react-native-paper';

import * as s from '../../state/user-inputs';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '@/src/state/store';

interface AgeInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const AgeInput: React.FC<AgeInputProps> = (p) => {
  return (
    <TextInput
      label="Age"
      keyboardType="numeric"
      value={p.value ? p.value.toString() : ''}
      onChangeText={(v) => p.onChange(parseInt(v))}
    />
  );
};

const UserAge: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectCurrentAge(r));
  const onChange = (value: number) => dispatch(s.a.updateCurrentAge(value));
  return <AgeInput label="Age" value={value} onChange={onChange} />;
};

export default UserAge;
