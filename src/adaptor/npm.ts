import { ComboConfig, EdgeConfig, GraphData, NodeConfig } from '@antv/g6';
import { calcRectSize } from '../utils';

interface NpmDependenciesInfo {
  [name: string]: {
    version: string;
    resolved: string;
    integrity: string;
    requires?: Record<string, string>;
    dependencies?: NpmDependenciesInfo;
  };
}

interface NpmLockfileType {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  packages: Record<
    string,
    {
      version: string;
      resolved: string;
      integrity: string;
      dependencies: Record<string, string>;
    }
  >;
  dependencies: NpmDependenciesInfo;
}

export function parseNpmLockfile(obj: Record<string, any>): GraphData {
  const { dependencies: rootDependencies } = obj as NpmLockfileType;

  const nodes: NodeConfig[] = [];
  const edges: EdgeConfig[] = [];
  const combos: ComboConfig[] = [];

  const addedPackage = new Set();

  function parseDependencies(
    dependencies?: NpmDependenciesInfo,
    parentName?: string
  ) {
    if (!dependencies) {
      return;
    }

    Object.entries(dependencies).forEach(([name, detail]) => {
      const label = `${name}@${detail.version}`;

      if (!addedPackage.has(label)) {
        nodes.push({
          id: label,
          name: label,
          label,
          size: calcRectSize(label),
        });

        addedPackage.add(label);
      }

      if (parentName) {
        edges.push({
          source: parentName,
          target: label,
        });
      }

      if (detail.dependencies) {
        parseDependencies(detail.dependencies, label);
      }

      const sharedPackages = getSharedPackageNames(
        detail.requires,
        detail.dependencies ?? {}
      );
      sharedPackages.forEach((pkgName) => {
        const rootPackage = rootDependencies[pkgName];
        if (rootPackage) {
          edges.push({
            source: label,
            target: `${pkgName}@${rootPackage.version}`,
          });
        }
      });
    });
  }

  parseDependencies(rootDependencies);

  return {
    nodes,
    edges,
    combos,
  };
}

/**
 * 即 requires 有的, 而 dependencies 没有，则视为用的顶层的依赖
 * @param requires
 * @param dependencies
 */
function getSharedPackageNames(
  requires?: Record<string, string>,
  dependencies?: NpmDependenciesInfo
): string[] {
  const arr1 = Object.keys(requires ?? {});
  const arr2 = Object.keys(dependencies ?? {});

  return arr1.filter((item) => !arr2.includes(item));
}
