import React from 'react';
import { Button, Input, message, Radio, Space, Typography } from 'antd';
import { useState } from 'react';
import heavyObj from '../assets/heavy-object.png';
import heavyObjEN from '../assets/heavy-object-en.webp';
import { LockfileManager, useDepData } from '../useDepData';
import { Translate } from '../i18n';
import { GithubOutlined } from '@ant-design/icons';
import demoPnpm from '../../pnpm-lock.yaml?raw';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomTimes() {
  return Math.ceil(Math.random() * 2 * 1000) + 2500; // 确保最低有2s
}

export const Entry: React.FC = React.memo(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [manager, setManager] = useState<LockfileManager>('pnpm');

  const handleDemo = () => {
    setManager('pnpm');
    setText(demoPnpm);
  };

  const handleParse = async () => {
    messageApi.loading(Translate.parsing, 0);
    setLoading(true);

    if (import.meta.env.MODE !== 'development') {
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
    }

    useDepData.getState().parseToGraph(manager, text);

    setLoading(false);
    messageApi.destroy();
  };

  return (
    <div>
      {contextHolder}

      <div style={{ width: 600, margin: '60px auto' }}>
        <Typography.Title level={2}>{Translate.title}</Typography.Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Radio.Group
              options={['pnpm', 'yarn', 'npm']}
              optionType="button"
              buttonStyle="solid"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            />
            <Button onClick={handleDemo}>DEMO</Button>
          </div>

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

      <div>
        <img src={Translate.getLanguage() === 'zh' ? heavyObj : heavyObjEN} />
      </div>

      <div style={{ textAlign: 'right' }}>
        <Button
          icon={<GithubOutlined />}
          onClick={() => {
            window.open('https://github.com/moonrailgun/node-modules-vision');
          }}
        />
      </div>
    </div>
  );
});
Entry.displayName = 'Entry';
