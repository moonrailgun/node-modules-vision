import LocalizedStrings from 'react-localization';

export const Translate = new LocalizedStrings({
  en: {
    title: 'See how heavy your node_modules are',
    placeholder:
      'Please paste your pnpm-lock.yaml file here, we will analyze it for you',
    parse: 'Parse',
    parsing: 'Parsing...',
    tip1: 'Did you know? Black holes are the largest celestial bodies in the universe',
    tip2: 'But node_modules will be heavier than a black hole (laughs)',
    tip3: "Don't worry, we are still analyzing...",
    tip4: "Be patient, it's almost over",
  },
  zh: {
    title: '康康你的 node_modules 有多重',
    placeholder: '请在此粘贴您的 pnpm-lock.yaml 文件, 我们会帮你进行分析',
    parse: '解析',
    tip1: '你知道吗? 黑洞是宇宙中最大的天体',
    tip2: '但是 node_modules 会比黑洞更重(笑)',
    tip3: '不要急, 我们还在解析中...',
    tip4: '耐心一点, 快要结束了',
  },
});
