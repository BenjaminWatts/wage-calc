import { ChildrenList } from '@/src/components/inputs/children';
import { PageHeader } from '@/src/nav';

const ChildrenScreen: React.FC = () => {
  return (
    <>
      <PageHeader title="Children" />
      <ChildrenList />;
    </>
  );
};

export default ChildrenScreen;
