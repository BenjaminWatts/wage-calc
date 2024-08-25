// a menu/card element with button links to all of the subscreens where the user can modify their inputs
import React from 'react';
import * as n from '@/src/nav';
import { Card, Icon, List, Paragraph } from 'react-native-paper';
import * as i from '@/src/components/icons';
import { ScrollView, View } from 'react-native';
import { All } from '../reset-buttons';
import PrivacyButton from '@/src/atoms/privacy-button';

interface LinkedButtonProps {
  label: string;
  href: string;
  icon: string;
}

const LinkedButtonComponent: React.FC<LinkedButtonProps> = (p) => {
  const onPress = n.useUrl(p.href);
  return (
    <List.Item
      style={{ paddingLeft: 20, height: 60 }}
      title={p.label}
      onPress={onPress}
      left={(props) => <Icon {...props} source={p.icon} size={20} />}
      right={(props) => <Icon {...props} source="chevron-right" size={20} />}
    />
  );
};

const BUTTONS: LinkedButtonProps[] = [
  {
    label: `Salary/Pension`,
    href: n.salary,
    icon: i.SALARY_AND_PENSION,
  },
  {
    label: `Working Schedule`,
    href: n.workingSchedule,
    icon: i.WORKING_SCHEDULE,
  },
  {
    label: `Commuting`,
    href: n.commuting,
    icon: i.COMMUTING,
  },
  {
    label: 'Children',
    href: n.children,
    icon: i.CHILDREN,
  },
];

export const Inputs: React.FC = () => (
  <ScrollView
    contentContainerStyle={{
      padding: 10,
      gap: 10,
    }}
  >
    <Card>
      <Card.Content
        style={{
          backgroundColor: 'white',
        }}
      >
        <Paragraph>
          To work out your cost of working, we need to understand how much you
          (and your family) earn. We also need to understand your costs of
          working, such as commuting, childcare and taxes.
        </Paragraph>
      </Card.Content>
    </Card>

    <Card>
      <Card.Content
        style={{
          backgroundColor: 'white',
        }}
      >
        {BUTTONS.map(({ label, href, icon }) => (
          <LinkedButtonComponent
            key={label}
            label={label}
            href={href}
            icon={icon}
          />
        ))}
      </Card.Content>
    </Card>

    <All />

    <View style={{ height: 20 }} />
    <PrivacyButton />
  </ScrollView>
);

export default Inputs;
