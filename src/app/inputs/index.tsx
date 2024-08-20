// a menu/card element with button links to all of the subscreens where the user can modify their inputs
import React from 'react';
import * as n from '@/src/nav';
import { Button, Card, Icon, List } from 'react-native-paper';

interface LinkedButtonProps {
  label: string;
  href: string;
  icon: string;
}

const LinkedButtonComponent: React.FC<LinkedButtonProps> = (p) => {
  const onPress = n.useUrl(p.href);
  return (
    <List.Item
      style={{ paddingLeft: 20 }}
      title={p.label}
      onPress={onPress}
      left={(props) => <Icon {...props} source={p.icon} size={20} />}
      // right chevron
      right={(props) => <Icon {...props} source="chevron-right" size={20} />}
    />
  );
};

const BUTTONS: LinkedButtonProps[] = [
  {
    label: `Salary and Pension`,
    href: n.salary,
    icon: 'cash',
  },
  {
    label: `Working Schedule`,
    href: n.workingSchedule,
    icon: 'clock',
  },
  // {
  //   label: `Working Days`,
  //   href: n.days,
  //   icon: 'calendar',
  // },
  {
    label: 'Children',
    href: n.children,
    icon: 'human-male-child',
  },
  {
    label: `Commuting Expenses`,
    href: n.transport,
    icon: 'train',
  },
];

export const InputsButtons: React.FC = () => (
  <>
    <Card.Title
      title="User inputs"
      subtitle="
      Tell us about your work and lifestyle/family to get a personalised wage calculation.
    "
    />
    {BUTTONS.map(({ label, href, icon }) => (
      <LinkedButtonComponent
        key={label}
        label={label}
        href={href}
        icon={icon}
      />
    ))}
  </>
);

export default InputsButtons;
