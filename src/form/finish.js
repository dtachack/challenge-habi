import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  selectStepConfiguration,
  selectSaveInformationUIStatus,
  selectInformation,
  selectConfiguration,
} from "../store/selectors/configuration.selectors";
import Button from "../shared/components/button";
import { ButtonType } from "../shared/enums/buttons-type";
import { StateTypeAction } from "../shared/enums/state-type";
import Information from "./information";
import { device } from "../styles/base/breakpoints";
import ViewInformation from "./view-information";
import { RouteHome } from "../routing/routing";

const ContentForm = styled.div`
  background-color: ${(props) => props.theme.colorWhite};
  width: 400px;
  height: auto;
  max-height: 500px;
  overflow-y: auto;
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
const ContainerButton = styled.div`
  width: 100%;
  margin: 5px;
`;
const ContainerControls = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 95%;
`;
const ContainerInfo = styled.div``;

const StepItem = styled.div`
  padding: 15px;
  padding-top: 0px;
`;

const StepTitle = styled.div`
  font-size: 13px;
  margin-left: 10px;
  margin-bottom: 10px;
  font-weight: 500;
`;
const StepInfo = styled.div`
  font-size: 12px;
  margin-left: 10px;
  font-style: italic;
`;

const FormFinish = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const information = useSelector(selectInformation);
  const step = useSelector(selectStepConfiguration(location.pathname));
  const statusSave = useSelector(selectSaveInformationUIStatus);
  const configuration = useSelector(selectConfiguration);

  return (
    <>
      <ContentForm className="animate__animated animate__bounceInLeft">
        <Title>{t("FULL_RECORD_TITLE")}</Title>
        <ContainerControls>
          <ContainerInfo>
            {configuration?.map((conf, index) => {
              return (
                <StepItem
                  key={index}
                  className={
                    step?.number > index + 1
                      ? "active"
                      : step?.number === index + 1
                      ? "current"
                      : ""
                  }
                >
                  <StepTitle>{index + 1 + ". " + t(conf.title)}</StepTitle>
                  <StepInfo>
                    {conf?.controls?.map((control, index) => {
                      return (
                        <ViewInformation
                          key={index}
                          control={control}
                          information={information}
                        ></ViewInformation>
                      );
                    })}
                  </StepInfo>
                </StepItem>
              );
            })}
          </ContainerInfo>
          <ContainerButton>
            <Button
              loading={statusSave === StateTypeAction.Pending}
              icon={"fi/FiSave"}
              type={ButtonType.Primary}
              text={t("NEXT")}
              onClick={() => navigate(RouteHome)}
            ></Button>
          </ContainerButton>
        </ContainerControls>
      </ContentForm>
      <Information></Information>
    </>
  );
};

export default FormFinish;
