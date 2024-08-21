import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import React from 'react';

interface SliderWithLabelsProps {
  label: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  onValueChange: (value: number) => void;
  formatter: (value: number) => string;
  step: number;
  offset?: number;
}

const SliderWithLabels: React.FC<SliderWithLabelsProps> = (p) => {
  const offset = p.offset || 0;
  const [value, setValue] = React.useState(p.value + offset);
  const screenWidth = useWindowDimensions();

  return (
    <View style={styles.sliderView}>
      <View style={styles.labelWrapper}>
        <Text>{`${p.formatter(value - offset)} ${p.label}`}</Text>
      </View>
      <View style={styles.limitTextWrapper}>
        <Text>{p.formatter(p.minimumValue)}</Text>
      </View>
      <View
        style={{
          ...styles.slider,
          width: screenWidth.width - styles.labelWrapper.width - 140,
        }}
      >
        <Slider
          style={{ width: '100%' }}
          value={value}
          step={p.step}
          onValueChange={setValue}
          onSlidingComplete={(value) => p.onValueChange(value - offset)}
          minimumValue={p.minimumValue + offset}
          maximumValue={p.maximumValue + offset}
        />
      </View>
      <View style={styles.limitTextWrapper}>
        <Text>{p.formatter(p.maximumValue)}</Text>
      </View>
    </View>
  );
};

export default SliderWithLabels;

const styles = StyleSheet.create({
  labelWrapper: {
    width: 250,
  },
  limitTextWrapper: {
    width: 40,
  },
  slider: {},
  sliderView: {
    gap: 5,
    height: 40,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
