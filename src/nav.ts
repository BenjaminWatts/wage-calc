import { useRouter, useGlobalSearchParams } from 'expo-router';

export const useUrl = (url: string) => {
  const nav = useRouter();
  return () => nav.navigate(url as any);
};

export const home = 'home';

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

export const hours = 'inputs/hours';

export const useHours = () => useUrl(hours);

export const others = 'inputs/others';

export const useOthers = () => useUrl(others);

export const pension = 'inputs/pension';

export const usePension = () => useUrl(pension);

export const salary = 'inputs/salary';

export const useSalary = () => useUrl(salary);

export const transport = 'inputs/transport';

export const useTransport = () => useUrl(transport);
