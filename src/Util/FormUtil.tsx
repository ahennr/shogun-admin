import { Button, DatePicker, Input, InputNumber, Select, Statistic, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Logger from 'js-logger';
import React from 'react';
import ImportLayerDrawerButton from '../Component/Drawer/ImportLayerDrawer/ImportLayerDrawer';
import DisplayField from '../Component/FormField/DisplayField/DisplayField';
import JSONEditor from '../Component/FormField/JSONEditor/JSONEditor';
import MarkdownEditor from '../Component/FormField/MarkdownEditor/MarkdownEditor';
import YesOrNoField from '../Component/FormField/YesOrNoField/YesOrNoField';
import { FieldConfig } from '../Component/GeneralEntity/GeneralEntityForm/GeneralEntityForm';
import LayerTypeSelect from '../Component/Layer/LayerTypeSelect/LayerTypeSelect';

export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

export default class FormUtil {

  public static getAdditionalTool(toolName: string) {
    if (toolName === 'wmsImportTool') {
      return <ImportLayerDrawerButton />;
    }
    return <Button key={toolName}>{toolName}</Button>;
  }

  /**
   * Create read-only components for certain form items
   * @param fieldConfig
   * @returns
   */
  public static createReadOnlyComponent(fieldConfig: FieldConfig): React.ReactNode {
    switch (fieldConfig.component) {
      case 'Switch':
        return (<YesOrNoField />);
      case 'Statistic':
        return FormUtil.createFieldComponent(fieldConfig);
      case 'DateField':
        return <DisplayField
          format="date"
          {...fieldConfig.fieldProps}
        />;
      default:
        return (
          <DisplayField
            {...fieldConfig.fieldProps}
          />
        );
    }
  };

  /**
     * Return a component given the "component" property in passed field configuration
     * @param fieldConfig The field configuration
     */
  public static createFieldComponent (fieldCfg: FieldConfig): React.ReactNode {
    switch (fieldCfg?.component) {
      case 'TextArea':
        return (
          <TextArea
            {...fieldCfg?.fieldProps}
          />
        );
      case 'Input':
        return (
          <Input
            {...fieldCfg?.fieldProps}
          />
        );
      case 'Number':
        return (
          <InputNumber
            {...fieldCfg?.fieldProps}
          />
        );
      case 'Switch':
        return (
          <Switch
            checkedChildren="On"
            unCheckedChildren="Off"
            {...fieldCfg?.fieldProps}
          />
        );
      case 'Select':
        return (
          <Select
            {...fieldCfg?.fieldProps}
          />
        );
      case 'LayerTypeSelect':
        return (
          <LayerTypeSelect
            {...fieldCfg?.fieldProps}
          />
        );
      case 'MarkdownEditor':
        return (
          <MarkdownEditor
            {...fieldCfg?.fieldProps}
          />
        );
      case 'Statistic':
        return (
          <Statistic {...fieldCfg?.fieldProps} />
        );
      case 'JSONEditor':
        return (
          <JSONEditor {...fieldCfg?.fieldProps} />
        );
      case 'DisplayField':
        return (
          <DisplayField {...fieldCfg?.fieldProps} />
        );
      case 'DateField':
        return (
          <DatePicker
            format={DEFAULT_DATE_FORMAT}
            {...fieldCfg?.fieldProps}
          />
        );
      default:
        Logger.error(`Cannot create component of type "${fieldCfg?.component}" with name "${fieldCfg?.dataField}"`);
        return null;
    }
  };

  /**
     * Return a component given the "datatype" property passed field configuration
     * @param fieldConfig The field configuration
     */
  public static getFieldByDataType(fieldConfig: FieldConfig): React.ReactNode {
    return (
      <Input
        {...fieldConfig?.fieldProps}
      />
    );
  };

  /**
     * Generates an antd normalize function with the specified "no"-value.
     */
  public static getNormalizeFn(name: string) {
    let noValue: string = '';
    return (value, prevValue = []) => {
      if (
        Array.isArray(value) &&
          Array.isArray(prevValue) &&
          value.indexOf(noValue) >= 0 &&
          prevValue.indexOf(noValue) < 0
      ) {
        return [noValue];
      }
      return value;
    };
  };

};
