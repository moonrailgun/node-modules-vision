import React, { useEffect, useMemo, useRef } from 'react';
import G6, { GraphData } from '@antv/g6';
import { useDepData } from '../useDepData';
import { parsePnpmLockfile } from '../adaptor/pnpm';
import { Translate } from '../i18n';

/**
 * Reference: https://g6.antv.antgroup.com/manual/introduction
 */
export const DepGraph: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = useDepData((state) => {
    return state.graphData;
  });

  const packageCount = useMemo(
    () => (data?.nodes ? data.nodes.length : 0),
    [data?.nodes]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    if (!data) {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    const graph = new G6.Graph({
      container,
      width,
      height,
      fitView: false,
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          'activate-relations',
          'drag-node',
        ],
      },
      layout: {
        type: 'dagre',
        workerEnabled: true,
        rankdir: 'LR',
        align: 'UL',
        nodesep: 10,
        ranksep: 10,
      },
      defaultNode: {
        type: 'rect',
        size: [100, 20],
        labelCfg: {
          position: 'center',
          style: {
            fontStyle: 'normal',
            fontSize: 18,
          },
        },
        style: {
          cursor: 'default',
        },
        logoIcon: {
          show: false,
        },
        stateIcon: {
          show: false,
        },
      },
      defaultEdge: {
        type: 'line',
        style: {
          stroke: 'rgb(79, 79, 79)',
          cursor: 'default',
          endArrow: {
            path: G6.Arrow.triangle(10, 20, 5),
            d: 5,
            fill: 'rgb(79, 79, 79)',
          },
        },
        labelCfg: {
          position: 'middle',
          style: {
            textAlign: 'center',
            textBaseline: 'middle',
            fontStyle: 'normal',
          },
        },
      },
    });
    graph.node((node) => {
      return {
        ...node,
      };
    });
    // 读取数据
    graph.data(data);
    // 渲染图
    graph.render();
  }, [data]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
      />
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        {Translate.formatString(Translate.packageCount, packageCount)}
      </div>
    </div>
  );
});
DepGraph.displayName = 'DepGraph';
