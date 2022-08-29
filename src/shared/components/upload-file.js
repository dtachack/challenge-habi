import React, { useState } from "react";
import styled from "styled-components";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

import { flex } from "./../../styles/abstracts/mixins";
import Button from "../../shared/components/button";
import { ButtonType } from "../../shared/enums/buttons-type";

const Control = styled.div`
  width: 100%;
  margin-bottom: ${(props) => (props.margin ? "20px" : "")};
`;

const Label = styled.label`
  color: ${(props) => props.theme.input.labelColor};
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
`;
const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colorDanger};
  margin-top: 10px;
`;

const FileUpload = styled.input`
  width: 100%;
  margin-top: 10px;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    width: 100%;
    content: "${(props) => props.content}";
    display: inline-block;
    cursor: pointer;
    content: "${(props) => props.content}";
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    appearance: none;
    cursor: pointer;
    border-radius: 18px;
    text-decoration: none;
    background-color: ${(props) => props.theme.colorSuccess};
    color: ${(props) => props.theme.colorWhite};
    padding: 10px 0px 10px 0px;
    text-align: center;
  }
`;
const ContainerPreview = styled.div`
  ${flex({ alignItems: "center", justifyContent: "center" })}
`;

const FilePreview = styled.img`
  width: 200px;
  height: auto;
  margin: auto;
  margin-top: 10px;
`;

const UploadFile = ({
  label,
  margin,
  list,
  name,
  formik,
  control,
  ...props
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField(props);
  const [file, setFile] = useState(
    !!field?.value[name] ? field?.value[name] : null
  );

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChange = async (file) => {
    if (
      !control?.formats?.find(
        (x) =>
          x.toString()?.toUpperCase() === file?.type.toString()?.toUpperCase()
      )
    ) {
      formik.setErrors({ [name]: t("THE_FILE_HAS_AN_INVALID_FORMAT") });
    } else if (file.size > control?.maxSizeBytes) {
      formik.setErrors({ [name]: t("FILE_EXCEEDS_SIZE") });
    } else {
      formik.setErrors({});
      const fileBase64 = await convertBase64(file);
      setFile(fileBase64);
      formik.setFieldValue(name, fileBase64);
    }
  };

  const onRemoveFile = () => {
    setFile(null);
    formik.setFieldValue(name, null);
  };

  return (
    <Control margin={margin}>
      <Label>{label}</Label>
      <FileUpload
        name={name}
        type="file"
        onChange={(event) => {
          onChange(event.currentTarget.files[0]);
        }}
        content={t("SELECT_FILE")}
      ></FileUpload>
      {!!file ? (
        <ContainerPreview>
          <FilePreview src={file}></FilePreview>
          <Button
            width="30px"
            icon={"bs/BsTrash"}
            type={ButtonType.Danger}
            onClick={onRemoveFile}
          ></Button>
        </ContainerPreview>
      ) : null}
      {meta?.touched && meta?.error ? (
        <ErrorMessage>{meta?.error[name]}</ErrorMessage>
      ) : null}
    </Control>
  );
};

export default UploadFile;
