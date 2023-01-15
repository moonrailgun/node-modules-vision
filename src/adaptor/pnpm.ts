import { ComboConfig, EdgeConfig, GraphData, NodeConfig } from '@antv/g6';
import { calcRectSize } from '../utils';

interface PnpmLockfileType {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  lockfileVersion: number;
  packages: Record<
    string,
    {
      dependencies?: Record<string, string>;
      dev?: boolean;
      resolution: {
        integrity: string;
      };
      optionalDependencies?: Record<string, string>;
    }
  >;
  specifiers: Record<string, string>;
}

export function parsePnpmLockfile(obj: Record<string, any>): GraphData {
  const { packages } = obj as PnpmLockfileType;

  const nodes: NodeConfig[] = [];
  const edges: EdgeConfig[] = [];
  const combos: ComboConfig[] = [];

  Object.entries(packages).forEach(([fullName, detail]) => {
    const [name, version] = getPackageNameInfo(fullName);
    const label = `${name}@${version}`;

    nodes.push({
      id: fullName,
      name: fullName,
      label,
      size: calcRectSize(label),
    });

    if (detail.dependencies) {
      Object.entries(detail.dependencies).forEach(([_name, _version]) => {
        if (_version.startsWith('/')) {
          edges.push({
            source: fullName,
            target: `${_version}`,
          });
        } else {
          edges.push({
            source: fullName,
            target: `/${_name}/${_version}`,
          });
        }
      });
    }

    if (detail.optionalDependencies) {
      Object.entries(detail.optionalDependencies).forEach(
        ([_name, _version]) => {
          if (_version.startsWith('/')) {
            edges.push({
              source: fullName,
              target: `${_version}`,
              style: {
                lineDash: [5],
              },
            });
          } else {
            edges.push({
              source: fullName,
              target: `/${_name}/${_version}`,
              style: {
                lineDash: [5],
              },
            });
          }
        }
      );
    }
  });

  return {
    nodes,
    edges,
    combos,
  };
}

function getPackageNameInfo(fullName: string): [string, string] {
  const arr = fullName.split('/');
  arr.shift();
  const version = arr.pop() ?? '';
  const name = arr.join('/') ?? '';

  return [name, version];
}
