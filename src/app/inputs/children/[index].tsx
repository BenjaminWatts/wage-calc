import { EditChild } from '@/src/components/form-inputs/children';
import { useChildIndex } from '@/src/nav';

const Child = () => {
  const index = useChildIndex();
  return <EditChild index={index} />;
};

export default Child;
