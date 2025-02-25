import React, {
  ReactNode,
  useEffect,
  useState
} from 'react';

import {
  Button,
  Card,
  Statistic,
  Tooltip
} from 'antd';
import { StatisticProps } from 'antd/lib/statistic/Statistic';

import { ReloadOutlined } from '@ant-design/icons';

import isFunction from 'lodash/isFunction';

import MetricService, { Metric } from '../../../Service/MetricService/MetricService';
import useSHOGunAPIClient from '../../../Hooks/useSHOGunAPIClient';

type StatisticPropExcludes = 'value' | 'prefix' | 'suffix' | 'title' | 'formatter';

export interface MetricEntryProps extends Omit<StatisticProps, StatisticPropExcludes> {
  type: string;
  prefixRenderer?: (metric: Metric) => ReactNode;
  suffixRenderer?: (metric: Metric) => ReactNode;
  titleRenderer?: (metric: Metric) => ReactNode;
  valueRenderer?: (value: number | string, metric: Metric) => ReactNode;
};

export const MetricEntry: React.FC<MetricEntryProps> = ({
  type,
  prefixRenderer,
  suffixRenderer,
  titleRenderer,
  valueRenderer,
  ...passThroughProps
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metric, setMetric] = useState<Metric>();

  const client = useSHOGunAPIClient();

  useEffect(() => {
    fetchMetric();
  }, []);

  const fetchMetric = async () => {
    setIsLoading(true);

    const metricService = new MetricService({
      keycloak: client.getKeycloak()
    });
    const metricResponse = await metricService.getMetric(type);

    setMetric(metricResponse);

    setIsLoading(false);
  };

  const getPrefix = (): ReactNode => {
    if (isFunction(prefixRenderer)) {
      return prefixRenderer(metric);
    }

    return null;
  };

  const getSuffix = (): ReactNode => {
    if (isFunction(suffixRenderer)) {
      return suffixRenderer(metric);
    }

    return null;
  };

  const getTitle = (): ReactNode => {
    if (isFunction(titleRenderer)) {
      return titleRenderer(metric);
    }

    return (
      <Tooltip
        title={metric?.description}
      >
        <span>{metric?.description}</span>
      </Tooltip>
    );
  };

  const getFormatter = (value: number | string): ReactNode => {
    if (isFunction(valueRenderer)) {
      return valueRenderer(value, metric);
    }

    return value;
  };

  return (
    <Card
      loading={isLoading}
      actions={[
        <Tooltip
          key="tooltip"
          title="Reload"
          mouseEnterDelay={0.5}
        >
          <Button
            onClick={fetchMetric}
          >
            <ReloadOutlined />
          </Button>
        </Tooltip>
      ]}
    >
      <Statistic
        value={metric?.measurements[0]?.value}
        prefix={getPrefix()}
        suffix={getSuffix()}
        title={getTitle()}
        formatter={getFormatter}
        valueStyle={{
          color: '#3f8600'
        }}
        {...passThroughProps}
      />
    </Card>
  );
};


export default MetricEntry;
