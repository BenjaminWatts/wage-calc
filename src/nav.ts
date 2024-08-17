import { useRouter, useGlobalSearchParams } from "expo-router";

const useUrl = (url: string) => {
    const nav = useRouter()
    return () => nav.navigate(url)
}

const home = "home";

const inputs = "inputs";

const children = "inputs/children";

export const useChildren = () => useUrl(children);

const child = (index: number) => `inputs/children/${index}`;

export const useChild = (index: number) => useUrl(child(index));

export const useChildIndex = () => {
    const { index } = useGlobalSearchParams();
    return parseInt(Array.isArray(index) ? index[0] : index);
}

const days = "inputs/days";

export const useDays = () => useUrl(days);

const hours = "inputs/hours";

export const useHours = () => useUrl(hours);

const others = "inputs/others";

export const useOthers = () => useUrl(others);

const pension = "inputs/pension";

export const usePension = () => useUrl(pension);

const salary = "inputs/salary";

export const useSalary = () => useUrl(salary);

const transport = "inputs/transport";

export const useTransport = () => useUrl(transport);