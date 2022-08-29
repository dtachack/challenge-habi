import styled from "styled-components";
import { Field } from "formik";
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

const CheckboxList = styled.div`
  margin-top: 20px;
`;

const CheckboxItem = styled.label`
  margin-top: 10px;
  display: block;
`;

const CheckboxText = styled.span`
  margin-left: 10px;
`;

const CheckboxGroup = ({ label, margin, list, name, ...props }) => {
  const { t } = useTranslation();
  return (
    <Control margin={margin}>
      <Label>{label}</Label>
      <CheckboxList role="group" aria-labelledby="checkbox-group">
        {list?.map((check, index) => {
          return (
            <CheckboxItem key={index}>
              <Field type="checkbox" name={name} value={check?.nameProperty} />
              <CheckboxText> {t(check?.text)}</CheckboxText>
            </CheckboxItem>
          );
        })}
      </CheckboxList>
    </Control>
  );
};

export default CheckboxGroup;
