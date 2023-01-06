import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { DepGraph } from './components/DepGraph';
import { Entry } from './pages/Entry';
import { useDepData } from './useDepData';

function App() {
  const rawObj = useDepData((state) => state.rawObj);

  return (
    <ConfigProvider locale={zhCN}>
      {!rawObj ? <Entry /> : <DepGraph />}
    </ConfigProvider>
  );
}

export default App;
