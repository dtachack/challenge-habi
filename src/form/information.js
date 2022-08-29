import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { flex } from "../styles/abstracts/mixins";
import {
  selectConfiguration,
  selectStepConfiguration,
  selectInformation,
} from "../store/selectors/configuration.selectors";
import { GrFormCheckmark } from "react-icons/gr";
import { BsInfo } from "react-icons/bs";
import { device } from "../styles/base/breakpoints";
import Button from "../shared/components/button";
import { ButtonType } from "../shared/enums/buttons-type";
import { VscClose } from "react-icons/vsc";
import ViewInformation from "./view-information";
import { RouteFinish } from "../routing/routing";

const ContainerInformation = styled.div`
  background-color: ${(props) => props.theme.colorWhite};
  width: 340px;
  height: 100vh;
  position: absolute;
  right: 0px;
  top: 0px;
  ${flex({ alignItems: "center", justifyContent: "center" })}
  flex-direction: column;
  @media ${device.laptop} {
    display: none;
  }

  &.active {
    ${flex({ alignItems: "center", justifyContent: "center" })}
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  }
`;

const TitleProcess = styled.h1`
  text-align: center;
  font-size: 20px;
  color: ${(props) => props.theme.colorPrimary};
`;

const ContainerProgress = styled.div`
  margin-top: 20px;
  ${flex({ alignItems: "center", justifyContent: "center" })}
  flex-direction: row;
  padding: 30px;
`;
const ContainerLine = styled.div`
  height: 100%;
`;
const Line = styled.div`
  width: 2px;
  height: 90%;
  margin-top: 8px;
  background-color: ${(props) => props.theme.colorPrimary};
`;
const ContainerInfo = styled.div``;

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
const StepCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: solid 2px ${(props) => props.theme.colorPrimary};
  position: absolute;
  margin-left: -25px;
  margin-top: 2px;
  background-color: ${(props) => props.theme.colorWhite};
  font-size: 15px;
  color: ${(props) => props.theme.colorPrimary};
  ${flex({ alignItems: "center", justifyContent: "center" })}
`;
const StepItem = styled.div`
  padding: 15px;
  padding-top: 0px;
  &.active {
    border-color: ${(props) => props.theme.colorSuccess};
    ${StepTitle} {
      border-color: ${(props) => props.theme.colorSuccess};
    }
  }
  &.current {
    ${StepTitle} {
      font-weight: bold;
    }
    ${StepCircle} {
      background-color: ${(props) => props.theme.colorPrimary};
      color: ${(props) => props.theme.colorPrimary};
    }
  }
`;
const ContentButtonBottom = styled.div`
  background-color: ${(props) => props.theme.colorWhite};
  bottom: 0;
  left: 0;
  padding: 16px 16px 32px;
  position: fixed;
  right: 0;
  display: none;
  @media ${device.laptop} {
    display: block;
  }
`;
const ContentClose = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 20px;
  display: none;

  @media ${device.laptop} {
    ${flex({ alignItems: "center", justifyContent: "center" })}
  }
`;
const Information = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [viewInformation, setViewInformation] = useState(false);
  const configuration = useSelector(selectConfiguration);
  const information = useSelector(selectInformation);
  const step = useSelector(selectStepConfiguration(location.pathname));

  const onViewInformation = () => {
    setViewInformation(!viewInformation);
  };

  const showInformation = () => {
    return (
      location?.pathname?.toString()?.toUpperCase() !==
      RouteFinish?.toString()?.toUpperCase()
    );
  };

  return showInformation() ? (
    <>
      <ContainerInformation
        className={
          "animate__animated animate__bounceInRight " +
          (viewInformation ? "active" : "")
        }
      >
        <ContentClose onClick={onViewInformation}>
          <VscClose></VscClose>
        </ContentClose>
        <TitleProcess> {t("PROGRESS_HABI")}</TitleProcess>
        <ContainerProgress>
          <ContainerLine>
            <Line></Line>
          </ContainerLine>
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
                  <StepCircle>
                    {step?.number > index + 1 ? (
                      <GrFormCheckmark></GrFormCheckmark>
                    ) : (
                      <BsInfo></BsInfo>
                    )}
                  </StepCircle>
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
        </ContainerProgress>
      </ContainerInformation>
      <ContentButtonBottom className="animate__animated animate__fadeInUp">
        <Button
          type={ButtonType.Info}
          text={t("PROGRESS_HABI")}
          onClick={onViewInformation}
        ></Button>
      </ContentButtonBottom>
    </>
  ) : null;
};

export default Information;
