import React from 'react';

import { Form, Input, PageHeader } from 'antd';
import Logger from 'js-logger';
import { FormInstance, FormItemProps, FormProps } from 'antd/lib/form';
import FormUtil from '../../../Util/FormUtil';

import './GeneralEntityForm.less';

export type FieldConfig = {
  component?: string;
  dataField: string;
  dataType?: string;
  fieldProps?: {
    [key: string]: any;
  };
  formItemProps?: {
    [key: string]: any;
  };
  labelI18n?: string;
  noOptionValue?: {
    value: string;
  };
  normalizer?: {
    value: string;
  };
  required?: boolean;
  requiredI18n?: string;
  readOnly?: boolean;
};

export type FormMode = 'EDIT' | 'VIEW';

export type FormConfig = {
  name: string;
  fields: FieldConfig[];
};

interface OwnProps {
  entityName: string;
  formConfig: FormConfig;
  formProps?: Partial<FormProps>;
  form: FormInstance;
};

export type GeneralEntityFormProps = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const GeneralEntityForm: React.FC<GeneralEntityFormProps> = ({
  entityName,
  formProps,
  form,
  formConfig
}) => {

  /**
   * Generate antd form item for given field config
   * @param fieldCfg The FieldConfig
   * @returns An antd FormItem
   */
  const createFormItem = (fieldCfg: FieldConfig): React.ReactNode => {
    let field: React.ReactNode;
    if (fieldCfg.readOnly) {
      field = FormUtil.createReadOnlyComponent(fieldCfg);
    } else if (fieldCfg.component) {
      field = FormUtil.createFieldComponent(fieldCfg);
    } else if (fieldCfg.dataType) {
      field = FormUtil.getFieldByDataType(fieldCfg);
    } else {
      Logger.warn('FieldConfig is missing `readOnly`, `component` or `dataType` property.');
      field = (
        <Input
          key={fieldCfg?.dataField}
          placeholder=""
        />
      );
    }

    const formItemProps: FormItemProps = {
      rules: []
    };

    // when determining the status
    formItemProps.rules = [{
      required: fieldCfg.required
    }];

    if (fieldCfg.component === 'Switch') {
      formItemProps.valuePropName = 'checked';
    }

    const {
      dataField
    } = fieldCfg;

    return (
      <Form.Item
        key={dataField}
        name={dataField}
        className={`cls-${dataField}`}
        normalize={fieldCfg.component ? FormUtil.getNormalizeFn(dataField) : undefined}
        label={fieldCfg.labelI18n || `Field: ${fieldCfg.dataField}`}
        {...formItemProps}
        {...fieldCfg.formItemProps}
      >
        {field}
      </Form.Item>
    );
  };

  const parseFormConfig = (): React.ReactElement => {
    return <>
      {
        formConfig.fields?.map(createFormItem)
      }
    </>;
  };

  const initialValues = {};

  const title = `${entityName}`;

  return (
    <>
      <PageHeader title={title} />
      <Form
        className="general-entity-form"
        form={form}
        initialValues={initialValues}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name={formConfig?.name}
        {...formProps}
      >
        {
          parseFormConfig()
        }
      </Form>
    </>
  );
};

export default GeneralEntityForm;
