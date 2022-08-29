import styled from "styled-components";
import { useField, Field } from "formik";
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
const RadioGroupList = styled.div`
  margin-top: 20px;
`;

const RadioItem = styled.label`
  margin-top: 10px;
  display: block;
`;

const CheckboxText = styled.span`
  margin-left: 10px;
`;

const RadioGroup = ({ label, margin, list, name, ...props }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props);
  return (
    <>
      <Control margin={margin}>
        <Label>{label}</Label>
        <RadioGroupList role="group" aria-labelledby="checkbox-group">
          {list?.map((check, index) => {
            return (
              <RadioItem key={index}>
                <Field type="radio" name={name} value={check?.nameProperty} />
                <CheckboxText> {t(check?.text)}</CheckboxText>
              </RadioItem>
            );
          })}
        </RadioGroupList>
        {meta?.touched && meta?.error ? (
          <ErrorMessage>{meta?.error[name]}</ErrorMessage>
        ) : null}
      </Control>
    </>
  );
};

export default RadioGroup;
