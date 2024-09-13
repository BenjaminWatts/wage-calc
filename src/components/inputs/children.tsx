import { RootState, useAppDispatch } from '@/src/state/store';
import React from 'react';
import { Button, Card, List, Paragraph } from 'react-native-paper';
import * as s from '@/src/state/user-inputs';
import { useSelector } from 'react-redux';
import { useChild } from '@/src/nav';
import { ScrollView, View, StyleSheet } from 'react-native';
import { child as defaultChild } from '@/src/state/defaults';
import SliderWithLabels from '@/src/atoms/slider-with-labels';
import { BIRTHDAY, DELETE, SCHOOL } from '../icons';
import CostInput from '@/src/atoms/cost-input';
import { ChildrenReset, ChildReset } from '../reset-buttons';

import ChildOutputs from '../outputs/child';
import {
  SCHOOL_AGE_YEARS,
  NO_CHILDCARE_COST_MINIMUM_AGE,
} from '@/src/calcs/constants';
import ListAccordion from '@/src/atoms/accordion';

const DeleteChildButton: React.FC<{
  index: number;
}> = ({ index }) => {
  const dispatch = useAppDispatch();
  return (
    <Button onPress={() => dispatch(s.a.removeChild(index))} icon={DELETE}>
      Delete
    </Button>
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

const PARTNER_LABEL = 'Annual Salary';

const UserPartnerSalary: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectPartnerAnnualIncome(r));
  const onChange = (value: number) =>
    dispatch(s.a.updatePartnerAnnualIncome(value));
  return (
    <Card>
      <Card.Title title={`Your Partner`} />
      <Card.Content style={styles.container}>
        <Paragraph>
          In order to estimate how much child benefit, free and subsidised
          childcare you will receive, we need to know your partner's annual
          salary.
        </Paragraph>
        <CostInput label={PARTNER_LABEL} value={value} onChange={onChange} />
      </Card.Content>
    </Card>
  );
};
/**
 * List of children - to be rendered on first screen
 */
export const ChildrenList: React.FC = () => {
  const data = useSelector((r: RootState) => r.userInputs.children);
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      {data.length > 0 && <UserPartnerSalary />}
      <CreateChildButton />
      <ChildrenReset />
    </ScrollView>
  );
};

const ChildAgeAccordion: React.FC<{ index: number }> = ({ index }) => {
  const child = useSelector((r: RootState) => r.userInputs.children[index]);
  const dispatch = useAppDispatch();
  return (
    <ListAccordion title="Age" icon={BIRTHDAY}>
      <View style={styles.container}>
        <SliderWithLabels
          value={child.years}
          minimumValue={0}
          maximumValue={17}
          formatter={(x) => x.toFixed(0)}
          label="years"
          step={1}
          offset={1}
          onValueChange={(years) =>
            dispatch(
              s.a.updateChild({
                index,
                child: { ...child, years: Math.round(years) },
              }),
            )
          }
        />
        <SliderWithLabels
          value={child.months}
          minimumValue={0}
          maximumValue={12}
          offset={1}
          formatter={(x) => x.toFixed(0)}
          label="months"
          step={1}
          onValueChange={(months) =>
            dispatch(
              s.a.updateChild({
                index,
                child: { ...child, months: Math.round(months) },
              }),
            )
          }
        />
      </View>
    </ListAccordion>
  );
};

const renderTermtimeChildcareCostLabel = (years: number): string => {
  if (years < SCHOOL_AGE_YEARS) {
    return '£ Hourly Termtime Childcare Cost';
  }
  return '£ Hourly Wraparound Childcare Cost';
};

const HourlyTermtimeChildcareCost: React.FC<{ index: number }> = (p) => {
  const dispatch = useAppDispatch();
  const age = useSelector(
    (r: RootState) => r.userInputs.children[p.index].years,
  );
  const onChange = (x: number) =>
    dispatch(
      s.a.updateHourlyTermtimeChildcareCost({
        index: p.index,
        hourlyTermtimeChildcareCost: x,
      }),
    );
  const value = useSelector((r: RootState) =>
    s.selectHourlyTermtimeChildcareCost(r, p.index),
  );
  if (age > NO_CHILDCARE_COST_MINIMUM_AGE) {
    // no cost for children over 12
    return null;
  }
  return (
    <CostInput
      label={renderTermtimeChildcareCostLabel(age)}
      onChange={onChange}
      value={value}
    />
  );
};

const HourlyHolidayChildcareCost: React.FC<{
  index: number;
}> = (p) => {
  const dispatch = useAppDispatch();
  const onChange = (x: number) =>
    dispatch(
      s.a.updateHourlyHolidayChildcareCost({
        index: p.index,
        hourlyHolidayChildcareCost: x,
      }),
    );
  const value = useSelector((r: RootState) =>
    s.selectHourlyHolidayChildcareCost(r, p.index),
  );
  return (
    <CostInput
      label="£ Hourly Holiday Childcare Cost"
      onChange={onChange}
      value={value || 0}
    />
  );
};

const ChildcareCostsAccordion: React.FC<{ index: number }> = ({ index }) => {
  return (
    <ListAccordion title="Childcare Costs" icon={SCHOOL}>
      <Card>
        <Card.Content>
          <ChildOutputs index={index} />
          <HourlyTermtimeChildcareCost index={index} />
          <Paragraph>
            Please note, depending on the age of your child (and you/your
            partner's income), we will take account of any free hours . The cost
            above therefore needs to the cost you pay for any wraparound hours
            which are in excess of any free hours.
          </Paragraph>
          <HourlyHolidayChildcareCost index={index} />
        </Card.Content>
      </Card>
    </ListAccordion>
  );
};

/**
 * Edit a child - to be rendered on the child screen
 * @param index - the index of the child to edit
 */
export const EditChild: React.FC<{ index: number }> = ({ index }) => {
  const child = useSelector((r: RootState) => r.userInputs.children[index]);
  if (!child) return null;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ChildAgeAccordion index={index} />
      <ChildcareCostsAccordion index={index} />
      <ChildReset index={index} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: '100%',
    display: 'flex',
    padding: 5,
  },
});
