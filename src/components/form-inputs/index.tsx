import React from "react";
import SalaryInputs from "./salary";
import DaysInputs from "./days";

const UserFormInputs: React.FC = () => {
  return (
    <>
      <SalaryInputs />
      <DaysInputs />
    </>
  );
};

export default UserFormInputs;
