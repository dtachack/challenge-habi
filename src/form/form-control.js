import React from "react";
import { useTranslation } from "react-i18next";

import Input from "../shared/components/input";
import { ControlType } from "../shared/enums/control-type";
import CheckboxGroup from "../shared/components/checkbox-group";
import UploadFile from "../shared/components/upload-file";
import RadioGroup from "../shared/components/radio-group";

const FormControl = ({ control, formik }) => {
  const { t } = useTranslation();
  return control?.type === ControlType.RadioGroup ? (
    <RadioGroup
      type={control.type}
      required={control.required}
      name={control.nameProperty}
      label={t(control.placeholder)}
      margin="true"
      placeholder={t(control.placeholder)}
      formik={formik}
      list={control?.list}
      {...formik.getFieldProps(control.nameProperty)}
    />
  ) : control?.type === ControlType.File ? (
    <UploadFile
      type={control.type}
      required={control.required}
      name={control.nameProperty}
      label={t(control.placeholder)}
      margin="true"
      placeholder={t(control.placeholder)}
      formik={formik}
      control={control}
      {...formik.getFieldProps(control.nameProperty)}
    />
  ) : control?.type === ControlType.Money ? (
    <Input
      type={control.type}
      required={control.required}
      name={control.nameProperty}
      label={t(control.placeholder)}
      money={true}
      currency={control.currency}
      margin="true"
      placeholder={t(control.placeholder)}
      formik={formik}
      {...formik.getFieldProps(control.nameProperty)}
    />
  ) : control?.type === ControlType.CheckBoxGroup ? (
    <CheckboxGroup
      type={control.type}
      label={t(control.placeholder)}
      name={control.nameProperty}
      list={control?.list}
    ></CheckboxGroup>
  ) : (
    <Input
      type={control.type}
      required={control.required}
      name={control.nameProperty}
      label={t(control.placeholder)}
      margin="true"
      placeholder={t(control.placeholder)}
      {...formik.getFieldProps(control.nameProperty)}
    />
  );
};

export default FormControl;
