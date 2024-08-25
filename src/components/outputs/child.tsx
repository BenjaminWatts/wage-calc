/// a card that renders the entitlement we believe a child has to tax-free and free childcare

import {
  SCHOOL_AGE_YEARS,
  NO_CHILDCARE_COST_MINIMUM_AGE,
} from '@/src/calcs/constants';
import {
  calcParentEligible,
  hoursOfFreeChildcare,
} from '@/src/calcs/take-home/child-care';
import { RootState } from '@/src/state/store';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

interface ChildOutputsProps {
  index: number;
}

const FreeHours: React.FC<{
  child: Child;
  parentEligible: boolean;
}> = ({ child, parentEligible }) => {
  if (child.years === 0 && child.months < 9) {
    return (
      <Paragraph>
        This child is too young to receive free childcare, however hopefully you
        should be receiving parental leave!
      </Paragraph>
    );
  }

  if (child.years < SCHOOL_AGE_YEARS)
    return (
      <Paragraph>
        We believe this child will receive{' '}
        {hoursOfFreeChildcare(child, parentEligible)}
        hours of free childcare during term time.
      </Paragraph>
    );
  return (
    <Paragraph>
      This child is school age and will therefore receive free childcare during
      term time, though not necessarily during school holidays or wraparound
      care.
    </Paragraph>
  );
};

const TaxfreeEligibility: React.FC<{
  child: Child;
  parentEligible: boolean;
}> = ({ child, parentEligible }) => {
  if (child.years >= NO_CHILDCARE_COST_MINIMUM_AGE)
    return (
      <Paragraph>
        This child is too old to be eligible for taxfree childcare.
      </Paragraph>
    );
  if (!parentEligible)
    return (
      <Paragraph>
        Because you (and/your partner's) income are too high, you are not
        eligible to tax free childcare.
      </Paragraph>
    );
};

const ChildOutputs: React.FC<ChildOutputsProps> = ({ index }) => {
  const termsAccepted = useSelector((r: RootState) => r.app.termsAccepted);
  const ui = useSelector((r: RootState) => r.userInputs);
  const child = useSelector((r: RootState) => r.userInputs.children[index]);
  const parentEligible = calcParentEligible(
    ui.annualSalary,
    ui.partnerAnnualIncome,
  );
  if (!termsAccepted) return null;
  return (
    <Card>
      <Card.Content
        style={{
          backgroundColor: 'white',
        }}
      >
        <FreeHours child={child} parentEligible={parentEligible} />
        <TaxfreeEligibility child={child} parentEligible={parentEligible} />
      </Card.Content>
    </Card>
  );
};

export default ChildOutputs;
