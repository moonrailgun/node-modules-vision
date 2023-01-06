import { ComboConfig, EdgeConfig, GraphData, NodeConfig } from '@antv/g6';

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

  Object.entries(packages).forEach(([name, detail]) => {
    const label = getPackageNameDesc(name);

    nodes.push({
      id: name,
      name,
      label,
      size: [label.length * 10 + 40, 26],
    });

    if (detail.dependencies) {
      Object.entries(detail.dependencies).forEach(([_name, _version]) => {
        edges.push({
          source: name,
          target: `/${_name}/${_version}`,
        });
      });
    }

    if (detail.optionalDependencies) {
      Object.entries(detail.optionalDependencies).forEach(
        ([_name, _version]) => {
          edges.push({
            source: name,
            target: `/${_name}/${_version}`,
            style: {
              lineDash: [5],
            },
          });
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

function getPackageNameDesc(name: string) {
  const arr = name.split('/');
  arr.shift();
  const version = arr.pop();

  return arr.join('/') + '@' + version;
}
