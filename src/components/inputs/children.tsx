// inputs to CRUD children

import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { Button, List } from 'react-native-paper';
import * as s from '@/src/state/user-inputs';
import { useSelector } from 'react-redux';
import { useChild } from '@/src/nav';
import Slider from '@react-native-community/slider';
import { Text } from 'react-native-paper';

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
        1;
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
    <>
      <List.Section title="Children">
        {data.map((c: Child, i: number) => (
          <ChildListItem key={i} index={i} />
        ))}
      </List.Section>
      <CreateChildButton />
    </>
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
      <Slider
        value={child.years}
        minimumValue={0}
        maximumValue={17}
        step={1}
        onValueChange={(years) =>
          dispatch(s.a.updateChild({ index, child: { ...child, years } }))
        }
      />
      <Text>Years: {child.years}</Text>
      <Slider
        value={child.months}
        minimumValue={1}
        maximumValue={12}
        step={1}
        onValueChange={(months) =>
          dispatch(s.a.updateChild({ index, child: { ...child, months } }))
        }
      />
      <Text>Months: {child.months}</Text>
    </>
  );
};
