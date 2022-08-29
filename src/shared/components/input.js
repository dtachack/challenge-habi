import styled from "styled-components";
import { useField } from "formik";
import CurrencyInput from "react-currency-input-field";

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
const MyInput = styled.input`
  outline: none;
  height: 62px;
  border-radius: 18px;
  padding: 18px 24px 18px 24px;
  border: solid 2px ${(props) => props.theme.input.border};
  width: 100%;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.input.background};
  color: ${(props) => props.theme.input.color};
  &::placeholder {
    color: ${(props) => props.theme.input.color};
  }
  &:focus {
    border: solid 2px ${(props) => props.theme.input.borderActive};
    background-color: ${(props) => props.theme.input.backgroundActive};
  }
  &.error {
    border: solid 2px ${(props) => props.theme.colorDanger};
    background-color: ${(props) => props.theme.input.backgroundActive};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  input[data-autocompleted] {
    background-color: ${(props) => props.theme.input.background};
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colorDanger};
`;
const LabelRequired = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colorDanger};
`;

const Input = ({ label, margin, small, money, required, formik, ...props }) => {
  const [field, meta] = useField(props);
  const replaceCharacters = (value) => {
    return value
      ?.replaceAll("$", "")
      ?.replaceAll(".", "")
      ?.replaceAll(" ", "")
      ?.trim();
  };

  return (
    <Control margin={margin}>
      <Label>
        {label}
        <LabelRequired>{required ? " *" : ""}</LabelRequired>
      </Label>
      {money ? (
        <CurrencyInput
          intlConfig={{ locale: "es-CO", currency: "COP" }}
          customInput={MyInput}
          decimalsLimit={0}
          decimalSeparator=","
          groupSeparator="."
          prefix="$"
          style={{ height: small ? "3px" : null }}
          onChange={(event) => {
            formik.setFieldValue(
              field?.name,
              replaceCharacters(event.currentTarget.value)
            );
          }}
        />
      ) : (
        <MyInput
          className={meta?.touched && meta?.error ? "error" : null}
          style={{ height: small ? "3px" : null }}
          autoComplete="off"
          {...props}
          {...field}
        />
      )}
      {meta?.touched && meta?.error ? (
        <ErrorMessage>{meta?.error}</ErrorMessage>
      ) : null}
    </Control>
  );
};

export default Input;
