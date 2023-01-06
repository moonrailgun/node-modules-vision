import React from 'react';
import { Button, Input, message, Space, Typography } from 'antd';
import { useState } from 'react';
import heavyObj from '../assets/heavy-object.png';
import { parse as parseYaml } from 'yaml';
import { useDepData } from '../useDepData';
import demoLockfile from '../../pnpm-lock.yaml?raw';

export const Entry: React.FC = React.memo(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(demoLockfile);

  const handleParse = async () => {
    messageApi.loading('正在解析中...', 0);
    setLoading(true);

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
        <Typography.Title level={2}>
          康康你的 node_modules 有多重
        </Typography.Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input.TextArea
            placeholder="请在此粘贴您的 pnpm-lock.yaml 文件, 我们会帮你进行分析"
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
            解析
          </Button>
        </Space>
      </div>

      <img src={heavyObj} />
    </div>
  );
});
Entry.displayName = 'Entry';
