import AddWmsPanel from '@terrestris/react-geo/dist/Container/AddWmsPanel/AddWmsPanel';
import { Button, Collapse, Drawer } from 'antd';
import Input from 'antd/lib/input/Input';
import React, { FC, useState } from 'react';

const { Panel } = Collapse;

export type ImportLayerDrawerButtonProps = {};

export const ImportLayerDrawerButton: FC<ImportLayerDrawerButtonProps> = () => {
  const [visible, setVisible] = useState(false);
  const [getCapabilitiesUrl, setGetCapabilitiesUrl] = useState<string>();

  const showDrawer = () => setVisible(true);

  const onClose = () => setVisible(false);

  const requestWmsGetCapabilities = () => {
    console.log('TODO');
  }

  const onWmsUrlChange = (evt: any) => {setGetCapabilitiesUrl(evt?.target?.value); };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Import Layer…
      </Button><Drawer title="Layer importieren" placement="right" onClose={onClose} visible={visible}>
        <Collapse accordion >
          <Panel header="GeoServer" key="geoserver">
            <p>GeoServer-Import: TODO</p>
          </Panel>
          <Panel header="WMS" key="wms">
            <Input
              value={getCapabilitiesUrl}
              onChange={onWmsUrlChange}
              placeholder="WMS URL eingeben"
              onPressEnter={requestWmsGetCapabilities}
              addonAfter={<Button
                size="small"
                icon="chevron-right"
                onClick={requestWmsGetCapabilities}
              />}
            />
            <AddWmsPanel
              draggable={false}
              addAllLayersText={'Alle'}
              addSelectedLayersText={''} cancelText={''} titleText={''}
              wmsLayers={[]}
              collapsible={false}
              collapsed={false}
              height={500} width={300}
              titleBarHeight={0} collapseTooltip={''} tools={[]} resizeOpts={false} />
          </Panel>
          <Panel header="WMTS" key="wmts">
            <p>WMTS</p>
          </Panel>
        </Collapse>
      </Drawer>
    </>
  );
};

export default ImportLayerDrawerButton;
