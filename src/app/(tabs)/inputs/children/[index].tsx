import { EditChild } from '@/src/components/inputs/children';
import WithHourlyRateHeaderRight from '@/src/components/outputs/hourly-rate';
import { PageHeader, useChildIndex } from '@/src/nav';

const ChildScreen = () => {
  const index = useChildIndex();
  return (
    <WithHourlyRateHeaderRight>
      <PageHeader title={`Child ${index + 1}`} />
      <EditChild index={index} />
    </WithHourlyRateHeaderRight>
  );
};

export default ChildScreen;
