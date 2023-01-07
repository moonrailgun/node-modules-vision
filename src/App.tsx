import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { DepGraph } from './components/DepGraph';
import { Entry } from './pages/Entry';
import { useDepData } from './useDepData';

function App() {
  const hasData = useDepData((state) => !!state.graphData);

  return (
    <ConfigProvider locale={zhCN}>
      {!hasData ? <Entry /> : <DepGraph />}
    </ConfigProvider>
  );
}

export default App;
