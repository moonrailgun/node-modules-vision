import { GraphData } from '@antv/g6';
import { parsePnpmLockfile } from './pnpm';
import { parse as parseYaml } from 'yaml';
import { LockfileManager } from '../useDepData';
import { message } from 'antd';
import { parseYarnLockfile } from './yarn';
import { parseYarnLockfileYaml } from './lib/yarn-lockfile';

export function parseLockfile(
  manager: LockfileManager,
  text: string
): GraphData | null {
  try {
    if (manager === 'pnpm') {
      const obj = parseYaml(text);
      return parsePnpmLockfile(obj);
    }

    if (manager === 'yarn') {
      const obj = parseYarnLockfileYaml(text);

      console.log('obj', obj);

      return parseYarnLockfile(obj);
    }
  } catch (err) {
    console.error(err);
    message.error(String(err));

    return null;
  }
  return null;
}
