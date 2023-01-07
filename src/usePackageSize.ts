import create from 'zustand';
import { fetchPackageUnpackSize } from './utils';

interface PackageSizeState {
  sizeMap: Record<string, number>;
  setPackageSize: (name: string, version: string, size: number) => void;
}

export const usePackageSize = create<PackageSizeState>((set) => ({
  sizeMap: {},
  setPackageSize: (name: string, version: string, size: number) => {
    set((state) => ({
      sizeMap: {
        ...state.sizeMap,
        [`${name}@${version}`]: size,
      },
    }));
  },
}));

export async function checkPackageSize(name: string, version: string) {
  const { sizeMap, setPackageSize } = usePackageSize.getState();
  if (sizeMap[`${name}@${version}`]) {
    return;
  }

  setPackageSize(name, version, -1);

  const size = await fetchPackageUnpackSize(name, version);
  setPackageSize(name, version, size);
}
