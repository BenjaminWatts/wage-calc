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

// inputs routes
const inputUrl = (path: string) => `/${path}`;

export const children = inputUrl('children');

export const useChildren = () => useUrl(children);

const child = (index: number) => inputUrl(`children/${index}`);

export const useChild = (index: number) => useUrl(child(index));

export const useChildIndex = () => {
  const { index } = useGlobalSearchParams();
  return parseInt(Array.isArray(index) ? index[0] : index);
};

export const workingSchedule = inputUrl('working-schedule');

export const useWorkingSchedule = () => useUrl(workingSchedule);

export const salary = inputUrl('salary');

export const useSalary = () => useUrl(salary);

export const commuting = inputUrl('commuting');

export const useCommuting = () => useUrl(commuting);

export const calcs = '/calcs';

export const useCalcs = () => useUrl(calcs);
