// inputs to take percentage values for pension contributions from both employer and employee
import React from "react";
import Slider from "@react-native-community/slider";
import { RootState, useAppDispatch } from "@/src/state/store";
import * as s from "@/src/state/user-inputs";
import { useSelector } from "react-redux";

interface PensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const PensionInput: React.FC<PensionInputProps> = (p) => (
  <Slider
    {...p}
    step={1}
    maximumValue={100}
    minimumValue={0}
    onValueChange={(x) => p.onChange(x / 100)}
    value={p.value * 100}
  />
);

const EmployerPensionContributionInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) =>
    s.selectEmployerPensionContributionPc(r)
  );

  return (
    <PensionInput
      label="Employer Pension Contribution"
      value={value || 0}
      onChange={(value) =>
        dispatch(s.a.updateEmployerPensionContributionPc(value))
      }
    />
  );
};

const EmployeePensionContributionInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) =>
    s.selectEmployeePensionContributionPc(r)
  );
  return (
    <PensionInput
      label="Employee Pension Contribution"
      value={value || 0}
      onChange={(x) => dispatch(s.a.updateEmployeePensionContributionPc(x))}
    />
  );
};

const PensionInputs: React.FC = () => (
  <>
    <EmployerPensionContributionInput />
    <EmployeePensionContributionInput />
  </>
);

export default PensionInputs;
