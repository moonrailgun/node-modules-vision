import LocalizedStrings from 'react-localization';

export const Translate = new LocalizedStrings({
  en: {
    title: 'See how heavy your node_modules are',
    placeholder:
      'Please paste your pnpm-lock.yaml/yarn.lock/package-lock.json file here, we will analyze it for you',
    parse: 'Parse',
    parsing: 'Parsing...',
    tip1: 'Did you know? Black holes are the largest celestial bodies in the universe',
    tip2: 'But node_modules will be heavier than a black hole (laughs)',
    tip3: "Don't worry, we are still analyzing...",
    tip4: "Be patient, it's almost over",
    packageCount: 'Installed Package Count: {0}',
  },
  zh: {
    title: '康康你的 node_modules 有多重',
    placeholder:
      '请在此粘贴您的 pnpm-lock.yaml/yarn.lock/package-lock.json 文件, 我们会帮你进行分析',
    parse: '解析',
    parsing: '正在解析中...',
    tip1: '你知道吗? 黑洞是宇宙中最大的天体',
    tip2: '但是 node_modules 会比黑洞更重(笑)',
    tip3: '不要急, 我们还在解析中...',
    tip4: '耐心一点, 快要结束了',
    packageCount: '已安装依赖包: {0} 个',
  },
});
