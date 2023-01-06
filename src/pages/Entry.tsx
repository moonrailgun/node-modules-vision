import React from 'react';
import { Button, Input, message, Space, Typography } from 'antd';
import { useState } from 'react';
import heavyObj from '../assets/heavy-object.png';
import heavyObjEN from '../assets/heavy-object-en.webp';
import { parse as parseYaml } from 'yaml';
import { useDepData } from '../useDepData';
import demoLockfile from '../../pnpm-lock.yaml?raw';
import { Translate } from '../i18n';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomTimes() {
  return Math.ceil(Math.random() * 5 * 1000) + 2500; // 确保最低有2s
}

export const Entry: React.FC = React.memo(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(demoLockfile);

  const handleParse = async () => {
    messageApi.loading(Translate.parsing, 0);
    setLoading(true);

    await sleep(randomTimes());

    messageApi.destroy();
    messageApi.loading(Translate.tip1, 0);
    await sleep(randomTimes());

    messageApi.destroy();
    messageApi.loading(Translate.tip2, 0);
    await sleep(randomTimes());

    messageApi.destroy();
    messageApi.loading(Translate.tip3, 0);
    await sleep(randomTimes());

    messageApi.destroy();
    messageApi.loading(Translate.tip4, 0);
    await sleep(randomTimes());

    const obj = parseYaml(text);
    console.log('obj', obj);
    useDepData.setState({
      rawObj: obj,
    });

    setLoading(false);
    messageApi.destroy();
  };

  return (
    <div>
      {contextHolder}

      <div style={{ width: 600, margin: '60px auto' }}>
        <Typography.Title level={2}>{Translate.title}</Typography.Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input.TextArea
            placeholder={Translate.placeholder}
            rows={10}
            disabled={loading}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button
            type="primary"
            block={true}
            disabled={loading}
            onClick={handleParse}
          >
            {Translate.parse}
          </Button>
        </Space>
      </div>

      <img src={Translate.getLanguage() === 'zh' ? heavyObj : heavyObjEN} />
    </div>
  );
});
Entry.displayName = 'Entry';
