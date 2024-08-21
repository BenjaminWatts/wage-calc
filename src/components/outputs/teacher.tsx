// a component that renders and explains the teacher equivalent salary, along with the assumiptions we have made

import { useCalculation } from '@/src/hooks';
import React from 'react';
import { Card, Paragraph } from 'react-native-paper';
import * as r from '@/src/calcs/rounding';

const TeacherOutput: React.FC = () => {
  const result = useCalculation();
  if (!result) return null;

  const teacherSalary = result.teacher;
  return (
    <Card>
      <Card.Content>
        <Paragraph>
          With a teacher salary of {r.financial.annual(teacherSalary)}, you
          could earn a similar amount over your lifetime.
        </Paragraph>
        <Paragraph>
          With shorter working hours and and taking longer holidays, you could
          dramatically cut your childcare costs.
        </Paragraph>
        <Paragraph>
          The teacher pension scheme is also incredibly generous. We've factored
          this into the calculation, and much of the remuneration is effectively
          deferred to retirement. So you might have less disposable income to
          spent, but you'll have a much more secure future. And by maintaining a
          steady and lower income, you'll end up paying less tax.
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default TeacherOutput;
