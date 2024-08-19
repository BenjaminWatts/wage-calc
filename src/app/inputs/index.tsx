// a menu/card element with button links to all of the subscreens where the user can modify their inputs
import React from 'react';
import * as n from '@/src/nav';
import { Button } from 'react-native-paper';

interface LinkedButtonProps {
  label: string;
  href: string;
}

const LinkedButtonComponent: React.FC<LinkedButtonProps> = (p) => {
  const onPress = n.useUrl(p.href);
  return <Button onPress={onPress}>{p.label}</Button>;
};

const BUTTONS: LinkedButtonProps[] = [
  {
    label: 'Children',
    href: n.children,
  },
  {
    label: `Working Days`,
    href: n.days,
  },
  {
    label: `Working Hours`,
    href: n.hours,
  },
  {
    label: `Others`,
    href: n.others,
  },
  {
    label: `Pension`,
    href: n.pension,
  },
  {
    label: `Salary`,
    href: n.salary,
  },
  {
    label: `Transport`,
    href: n.transport,
  },
];

export const InputsButtons: React.FC = () => (
  <>
    {BUTTONS.map(({ label, href }) => (
      <LinkedButtonComponent key={label} label={label} href={href} />
    ))}
  </>
);

export default InputsButtons;
