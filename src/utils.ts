/**
 * 进度回调的 Promise.all
 */
export function runPromiseAllWithProgress<T extends PromiseLike<any>[]>(
  jobs: T,
  onProgress: (curr: number, all: number) => void
) {
  const len = jobs.length;
  let index = 0;

  jobs.forEach((job) => {
    job.then(() => {
      index++;
      onProgress(index, len);
    });
  });

  return Promise.all(jobs);
}

/**
 * 从 npm registry 中获取包大小
 */
export async function fetchPackageUnpackSize(
  name: string,
  version: string
): Promise<number> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${name}/${version}`);
    const json = await res.json();

    return json?.dist?.unpackedSize ?? 0;
  } catch (err) {
    return 0;
  }
}
