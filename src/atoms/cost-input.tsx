import React from 'react';
import { TextInput, Text } from 'react-native-paper';

interface CostInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const parseValue = (x?: number) => (x ? x.toFixed(2) : '');

const CostInput: React.FC<CostInputProps> = (p) => {
  const [value, onChangeText] = React.useState(parseValue(p.value));
  const update = () => p.onChange(parseFloat(value));
  React.useEffect(() => {
    onChangeText(parseValue(p.value));
  }, [p.value]);
  return (
    <TextInput
      label={p.label}
      value={value ? value.toString() : ''}
      onChangeText={onChangeText}
      onSubmitEditing={update}
      onEndEditing={update}
      onBlur={update}
      keyboardType="numeric"
      style={{ minHeight: 30 }}
    />
  );
};

export default CostInput;
