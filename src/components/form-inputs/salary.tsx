/// inputs for annual income
import { TextInput } from 'react-native-paper';
import * as s from '../../state/user-inputs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/src/state/store';

interface SalaryInputProps {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = (p) => {
  return (
    <TextInput
      label="Salary"
      keyboardType="numeric"
      value={p.value ? p.value.toString() : ''}
      onChangeText={(v) => p.onChange(parseInt(v))}
    />
  );
};

const USER_LABEL = 'User';
const PARTNER_LABEL = 'Partner';

const UserSalary: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectAnnualSalary(r));
  const onChange = (value: number) => dispatch(s.a.updateAnnualSalary(value));
  return <SalaryInput label={USER_LABEL} value={value} onChange={onChange} />;
};

const UserPartnerSalary: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectPartnerAnnualIncome(r));
  const onChange = (value: number) =>
    dispatch(s.a.updatePartnerAnnualIncome(value));

  return (
    <SalaryInput label={PARTNER_LABEL} value={value} onChange={onChange} />
  );
};

const SalaryInputs: React.FC = () => {
  return (
    <>
      <UserSalary />
      <UserPartnerSalary />
    </>
  );
};

export default SalaryInputs;
