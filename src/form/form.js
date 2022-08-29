import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  selectStepConfiguration,
  selectStepLength,
  selectNextStepConfiguration,
  selectSaveInformationUIStatus,
  selectInformation,
} from "../store/selectors/configuration.selectors";
import Button from "../shared/components/button";
import { ButtonType } from "../shared/enums/buttons-type";
import { fetchSaveInformation } from "../services/information-service";
import { StateTypeAction } from "../shared/enums/state-type";
import FormControl from "./form-control";
import Information from "./information";
import { device } from "../styles/base/breakpoints";
import { RouteFinish } from "../routing/routing";

const ContentForm = styled.div`
  background-color: ${(props) => props.theme.colorWhite};
  width: 400px;
  height: auto;
  margin-left: 40px;
  padding: 20px;
  border-radius: 10px;
  margin-top: 100px;
  @media ${device.laptop} {
    margin: auto;
    margin-top: 50px;
  }
  @media ${device.mobileL} {
    max-width: 95vw;
  }
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colorBlack};
  font-size: 24px;
  margin-top: 30px;
  text-align: center;
`;
const InfoStep = styled.h2`
  color: ${(props) => props.theme.colorPrimary};
  font-size: 15px;
`;
const ContainerButtons = styled.div`
  margin-top: 100px;
  width: 100%;
`;
const ContainerButton = styled.div`
  width: 100%;
  margin: 5px;
`;
const ContainerControls = styled.div`
  margin: auto;
  margin-top: 100px;
  width: 95%;
`;

const FormRegister = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const information = useSelector(selectInformation);
  const nextStep = useSelector(selectNextStepConfiguration(location.pathname));
  const step = useSelector(selectStepConfiguration(location.pathname));
  const stepLenght = useSelector(selectStepLength);
  const statusSave = useSelector(selectSaveInformationUIStatus);

  const [statusSaveOld, setStatusSaveOld] = useState(null);
  const [initalValuesForm, setInitialValuesForm] = useState(null);

  const onSubmit = (values) => {
    dispatch(fetchSaveInformation(values));
  };

  useEffect(() => {
    if (
      statusSaveOld === StateTypeAction.Pending &&
      statusSave === StateTypeAction.Succeded
    ) {
      if (!!nextStep) {
        setInitialValuesForm(null);
        navigate(nextStep?.path);
      } else {
        navigate(RouteFinish);
      }
    }
    setStatusSaveOld(statusSave);
    // eslint-disable-next-line
  }, [statusSave]);

  const validateForm = (values) => {
    const errors = {};
    step?.controls.forEach((control) => {
      if (!!control.required) {
        if (!values[control.nameProperty]) {
          errors[control.nameProperty] = t("FIELD_IS_REQUIRED");
        } else if (!!control?.max) {
          if (
            Number(values[control.nameProperty]) > control?.max ||
            Number(values[control.nameProperty]) < control?.min
          )
            errors[control.nameProperty] = t("FLOOR_NUMBER_ERROR");
        }
      }
    });
    return errors;
  };

  useEffect(() => {
    let initialValues = {};
    step?.controls.forEach((control) => {
      initialValues[control.nameProperty] = !!information[control.nameProperty]
        ? information[control.nameProperty]
        : "";
    });
    setInitialValuesForm(initialValues);
    // eslint-disable-next-line
  }, [step]);

  return (
    <>
      <ContentForm className="animate__animated animate__bounceInLeft">
        <InfoStep>
          {t("STEP")} {step?.number} {t("OF")} {stepLenght} : {t(step?.info)}
        </InfoStep>
        <Title>{t(step?.title)}</Title>
        <ContainerControls>
          {!!initalValuesForm ? (
            <Formik
              initialValues={initalValuesForm}
              validate={validateForm}
              onSubmit={(values) => onSubmit(values)}
            >
              {(formik) => (
                <Form>
                  {step?.controls.map((control, index) => {
                    return (
                      <FormControl
                        key={index}
                        index={index}
                        control={control}
                        formik={formik}
                      ></FormControl>
                    );
                  })}
                  <ContainerButtons>
                    <ContainerButton>
                      <Button
                        loading={statusSave === StateTypeAction.Pending}
                        icon={"fi/FiSave"}
                        type={ButtonType.Primary}
                        text={t("NEXT")}
                      ></Button>
                    </ContainerButton>
                  </ContainerButtons>
                </Form>
              )}
            </Formik>
          ) : null}
        </ContainerControls>
      </ContentForm>
      <Information></Information>
    </>
  );
};

export default FormRegister;
