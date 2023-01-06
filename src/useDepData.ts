import create from 'zustand';

interface DepDataState {
  manager: 'pnpm';
  rawObj: {} | null;
}

export const useDepData = create<DepDataState>((set) => ({
  manager: 'pnpm',
  rawObj: null,
}));
