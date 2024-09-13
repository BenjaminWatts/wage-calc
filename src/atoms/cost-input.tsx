import React from 'react';
import { TextInput } from 'react-native-paper';

interface CostInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const parseValue = (x?: number) => (x ? x.toFixed(2) : '');

const CostInput: React.FC<CostInputProps> = (p) => {
  const [value, onChangeText] = React.useState(parseValue(p.value));
  const update = () => {
    // handle if zero
    const val = parseFloat(value || '0');
    // if below zero return zero
    if (val < 0) {
      onChangeText('0');
      p.onChange(0);
    } else {
      if (isNaN(val)) {
        onChangeText(parseValue(p.value));
      } else {
        p.onChange(val);
      }
    }
  };
  React.useEffect(() => {
    onChangeText(parseValue(p.value));
  }, [p.value]);
  return (
    <TextInput
      label={p.label}
      value={value ? value.toString() : '0'}
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
