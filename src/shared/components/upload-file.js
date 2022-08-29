import styled from "styled-components";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

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
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props);

  const onChange = (file) => {
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
      formik.setFieldValue(name, { ...file });
    }
  };
  return (
    <Control margin={margin}>
      <Label>{label}</Label>
      <input
        name={name}
        type="file"
        onChange={(event) => {
          onChange(event.currentTarget.files[0]);
        }}
      />
      {meta?.touched && meta?.error ? (
        <ErrorMessage>{meta?.error[name]}</ErrorMessage>
      ) : null}
    </Control>
  );
};

export default UploadFile;
