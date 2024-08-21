// inputs to CRUD children

import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { Button, Card, List, Paragraph } from 'react-native-paper';
import * as s from '@/src/state/user-inputs';
import { useSelector } from 'react-redux';
import { useChild } from '@/src/nav';
import Slider from '@react-native-community/slider';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import SliderWithLabels from '@/src/atoms/slider-with-labels';

const DeleteChildButton: React.FC<{
  index: number;
}> = ({ index }) => {
  const dispatch = useAppDispatch();
  return (
    <Button onPress={() => dispatch(s.a.removeChild(index))}>Delete</Button>
  );
};

const ChildListItem: React.FC<{ index: number }> = ({ index }) => {
  const child = useSelector((r: RootState) => r.userInputs.children[index]);
  return (
    <List.Item
      title={`Child ${index + 1}`}
      description={`${child.years} years ${child.months} months`}
      onPress={useChild(index)}
      right={() => <DeleteChildButton index={index} />}
    />
  );
};

const CreateChildButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const defaultChild: Child = { years: 0, months: 0 };
  const existingCount = useSelector(
    (r: RootState) => r.userInputs.children.length,
  );
  const useChildHook = useChild(existingCount);
  return (
    <Button
      icon={'plus'}
      onPress={() => {
        dispatch(s.a.addChild(defaultChild));
        useChildHook();
      }}
    >
      Add Child
    </Button>
  );
};

/**
 * List of children - to be rendered on first screen
 */
export const ChildrenList: React.FC = () => {
  const data = useSelector((r: RootState) => r.userInputs.children);
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 10,
        padding: 10,
      }}
    >
      <Card>
        <Card.Content>
          <Paragraph>
            To work out the cost of childcare for you, including Government
            support, we need to know the number and ages of your children.
          </Paragraph>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <List.Section>
            {data.length === 0 && (
              <Paragraph>
                You haven't added any children yet. Please add all children
                under the age of 18
              </Paragraph>
            )}
            {data.map((c: Child, i: number) => (
              <ChildListItem key={i} index={i} />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
      <CreateChildButton />
    </ScrollView>
  );
};

/**
 * Edit a child - to be rendered on the child screen
 * @param index - the index of the child to edit
 */
export const EditChild: React.FC<{ index: number }> = ({ index }) => {
  const child = useSelector((r: RootState) => r.userInputs.children[index]);
  const dispatch = useAppDispatch();
  return (
    <>
      <SliderWithLabels
        value={child.years}
        minimumValue={0}
        maximumValue={17}
        formatter={(x) => x.toFixed(0)}
        label="years"
        step={1}
        onValueChange={(years) =>
          dispatch(s.a.updateChild({ index, child: { ...child, years } }))
        }
      />
      <Text>Years: {child.years}</Text>
      <SliderWithLabels
        value={child.months}
        minimumValue={1}
        maximumValue={12}
        formatter={(x) => x.toFixed(0)}
        label="months"
        step={1}
        onValueChange={(months) =>
          dispatch(s.a.updateChild({ index, child: { ...child, months } }))
        }
      />
      <Text>Months: {child.months}</Text>
    </>
  );
};
