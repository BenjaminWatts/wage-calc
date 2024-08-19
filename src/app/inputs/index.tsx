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
      title={p.label}
      onPress={onPress}
      left={(props) => <Icon {...props} source={p.icon} size={20} />}
    />
  );
};

const BUTTONS: LinkedButtonProps[] = [
  {
    label: 'Children',
    href: n.children,
    icon: 'human-male-child',
  },
  {
    label: `Working Days`,
    href: n.days,
    icon: 'calendar',
  },
  {
    label: `Working Hours`,
    href: n.hours,
    icon: 'clock',
  },
  {
    label: `Others`,
    href: n.others,
    icon: 'food',
  },
  {
    label: `Pension`,
    href: n.pension,
    icon: 'piggy-bank',
  },
  {
    label: `Salary`,
    href: n.salary,
    icon: 'cash',
  },
  {
    label: `Transport`,
    href: n.transport,
    icon: 'train',
  },
];

export const InputsButtons: React.FC = () => (
  <Card>
    <Card.Title
      title="Inputs"
      left={(p) => <Icon {...p} source="cog" size={20} />}
    />
    {BUTTONS.map(({ label, href, icon }) => (
      <LinkedButtonComponent
        key={label}
        label={label}
        href={href}
        icon={icon}
      />
    ))}
  </Card>
);

export default InputsButtons;
