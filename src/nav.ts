import { useRouter, useGlobalSearchParams, useNavigation } from 'expo-router';
import React from 'react';

export const PageHeader: React.FC<{
  title: string;
  back?: string;
}> = ({ title }) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [title]);
  return null;
};

export const useUrl = (path: string) => {
  const nav = useRouter();
  return () => nav.push(path as any);
};

// const inputs = 'inputs';

export const children = 'inputs/children';

export const useChildren = () => useUrl(children);

const child = (index: number) => `inputs/children/${index}`;

export const useChild = (index: number) => useUrl(child(index));

export const useChildIndex = () => {
  const { index } = useGlobalSearchParams();
  return parseInt(Array.isArray(index) ? index[0] : index);
};

export const days = 'inputs/days';

export const useDays = () => useUrl(days);

export const workingSchedule = 'inputs/working-schedule';

export const useWorkingSchedule = () => useUrl(workingSchedule);

export const others = 'inputs/others';

export const useOthers = () => useUrl(others);

export const salary = 'inputs/salary';

export const useSalary = () => useUrl(salary);

export const transport = 'inputs/transport';

export const useTransport = () => useUrl(transport);
