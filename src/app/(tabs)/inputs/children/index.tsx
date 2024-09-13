import { ChildrenList } from '@/src/components/inputs/children';
import WithHourlyRateHeaderRight from '@/src/components/outputs/hourly-rate';
import { PageHeader } from '@/src/nav';

const ChildrenScreen: React.FC = () => {
  return (
    <WithHourlyRateHeaderRight>
      <PageHeader title="Children" />
      <ChildrenList />
    </WithHourlyRateHeaderRight>
  );
};

export default ChildrenScreen;
