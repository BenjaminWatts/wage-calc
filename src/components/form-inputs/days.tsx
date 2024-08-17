// inputs to define of days worked, from home etc
import Slider from "@react-native-community/slider";
import * as s from "../../state/user-inputs";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/src/state/store";

interface DayInputComponentProps {
  label: string;
  value: number;
  minimumValue: number;
  maximumValue: number;
  onChange: (value: number) => void;
}

const DayInputComponent: React.FC<DayInputComponentProps> = (p) => {
  return <Slider {...p} step={1} />;
};

// create inputs for different days

const PerWeekOfWorking: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectDaysPerWeekOfWorking(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateDaysPerWeekOfWorking(value));

  return (
    <DayInputComponent
      label="Per Week of Working"
      minimumValue={0}
      maximumValue={7}
      onChange={onChange}
      value={value}
    />
  );
};

const PerWeekInOffice: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectDaysPerWeekInOffice(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateDaysPerWeekInOffice(value));

  return (
    <DayInputComponent
      label="Per Week in Office"
      minimumValue={0}
      maximumValue={7}
      onChange={onChange}
      value={value}
    />
  );
};

const HolidayDaysPerYear: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useSelector((r: RootState) => s.selectHolidayDaysPerYear(r));
  const onChange = (value: number) =>
    dispatch(s.a.updateHolidayDaysPerYear(value));

  return (
    <DayInputComponent
      label="Holiday Days Per Year"
      minimumValue={0}
      maximumValue={365}
      onChange={onChange}
      value={value}
    />
  );
};

const DaysInputs: React.FC = () => {
  return (
    <>
      <PerWeekOfWorking />
      <PerWeekInOffice />
      <HolidayDaysPerYear />
    </>
  );
};

export default DaysInputs;
