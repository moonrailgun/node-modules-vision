import { GraphData } from '@antv/g6';
import create from 'zustand';
import { parseLockfile } from './adaptor';

export type LockfileManager = 'pnpm' | 'yarn' | 'npm';

interface DepDataState {
  manager: LockfileManager;
  rawText: string;
  graphData: GraphData | null;
  parseToGraph: (manager: LockfileManager, rawText: string) => void;
}

export const useDepData = create<DepDataState>((set) => ({
  manager: 'pnpm',
  rawText: '',
  graphData: null,
  parseToGraph: (manager: LockfileManager, rawText: string) => {
    set({
      rawText,
      graphData: parseLockfile(manager, rawText),
    });
  },
}));
