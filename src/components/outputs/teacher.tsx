// a component that renders and explains the teacher equivalent salary, along with the assumiptions we have made

import { useCalculation } from '@/src/hooks';
import { RootState } from '@/src/state/store';
import { selectAnnualSalary } from '@/src/state/user-inputs';
import React from 'react';
import { Card, Paragraph, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as r from '@/src/calcs/rounding';

const TeacherOutput: React.FC = () => {
  const result = useCalculation();
  const currentSalary = useSelector((r: RootState) => selectAnnualSalary(r));
  const teacherSalary = result.teacher;
  return (
    <Card>
      <Card.Content>
        {/* <Title>Consider a Teacher Job</Title> */}
        <Paragraph>
          With a teacher salary of {r.financial.annual(teacherSalary)}, you
          could still earn as much in the long term a similar income to now{' '}
          {r.financial.annual(currentSalary)}.
        </Paragraph>
        <Paragraph>
          Having shorter working hours and longer holidays, you could
          dramatically cut your childcare costs.
        </Paragraph>
        <Paragraph>
          The teacher pension scheme is also incredibly generous. We've factored
          this into the calculation, and much of the remuneration is deffered to
          retirement. So you might have less disposable income to spent, but
          you'll have a much more secure future.
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default TeacherOutput;
