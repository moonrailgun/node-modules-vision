import { ComboConfig, EdgeConfig, GraphData, NodeConfig } from '@antv/g6';
import { calcRectSize } from '../utils';

interface YarnLockfileType {
  type: 'success';
  object: {
    [matched: string]: {
      version: string;
      resolved: string;
      integrity: string;
      dependencies: Record<string, string>;
    };
  };
}

export function parseYarnLockfile(obj: Record<string, any>): GraphData {
  const { object } = obj as YarnLockfileType;

  const nodes: NodeConfig[] = [];
  const edges: EdgeConfig[] = [];
  const combos: ComboConfig[] = [];

  const addedPackage = new Set();

  Object.entries(object).forEach(([fullName, detail]) => {
    const [name] = getPackageNameInfo(fullName);
    const version = detail.version;
    const label = `${name}@${version}`;

    if (!addedPackage.has(label)) {
      nodes.push({
        id: label,
        name: label,
        label,
        size: calcRectSize(label),
      });

      addedPackage.add(label);
    }

    Object.entries(detail.dependencies ?? []).forEach(
      ([_name, _versionMatch]) => {
        const target = object[`${_name}@${_versionMatch}`];
        if (target) {
          // 如果能找到
          edges.push({
            source: label,
            target: `${_name}@${target.version}`,
          });
        }
      }
    );
  });

  return {
    nodes,
    edges,
    combos,
  };
}

function getPackageNameInfo(fullName: string): [string, string] {
  const arr = fullName.split('@');
  const versionMatch = arr.pop() ?? '';
  const name = arr.join('@') ?? '';

  return [name, versionMatch];
}
