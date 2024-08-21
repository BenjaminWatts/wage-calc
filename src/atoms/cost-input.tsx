import React from 'react';
import { TextInput } from 'react-native-paper';

interface CostInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const CostInput: React.FC<CostInputProps> = ({ label, value, onChange }) => {
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

export default CostInput;
