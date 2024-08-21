import { EditChild } from '@/src/components/inputs/children';
import { useChildIndex } from '@/src/nav';

const ChildScreen = () => {
  const index = useChildIndex();
  return <EditChild index={index} />;
};

export default ChildScreen;
