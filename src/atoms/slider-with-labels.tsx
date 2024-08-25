import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import React from 'react';
import { INPUT } from '@/src/utils/breakpoints';

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

const useSmallScreen = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < INPUT;
  return isSmallScreen;
};

const SliderWithLabels: React.FC<SliderWithLabelsProps> = (p) => {
  const offset = p.offset || 0;
  const [value, setValue] = React.useState(p.value + offset);

  return (
    <Card>
      <Card.Content
        style={{
          ...styles.sliderView,
        }}
      >
        <View style={styles.labelWrapper}>
          <Text style={styles.labelText}>{`${p.formatter(value - offset)} ${
            p.label
          }`}</Text>
        </View>
        <View style={styles.sliderAndLabels}>
          <View style={styles.limitTextWrapper}>
            <Text>{p.formatter(p.minimumValue)}</Text>
          </View>
          <Slider
            style={styles.slider}
            value={value}
            step={p.step}
            onValueChange={setValue}
            onSlidingComplete={(value) => p.onValueChange(value - offset)}
            minimumValue={p.minimumValue + offset}
            maximumValue={p.maximumValue + offset}
          />
          <View style={styles.limitTextWrapper}>
            <Text>{p.formatter(p.maximumValue)}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default SliderWithLabels;

const styles = StyleSheet.create({
  sliderAndLabels: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '66%',
    gap: 5,
  },
  slider: {
    flex: 1,
  },
  sliderView: {
    gap: 10,
    minHeight: 40,
    paddingVertical: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelWrapper: {
    height: 'auto',
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  limitTextWrapper: {
    maxWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
