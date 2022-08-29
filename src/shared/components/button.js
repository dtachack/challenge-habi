import React from "react";
import styled from "styled-components";

import DynamicIcon from "./../hooks/icon-dynamic";
import { flex } from "./../../styles/abstracts/mixins";
import { ButtonType } from "../enums/buttons-type";
import Spinner from "../components/spinner";

const ButtonContainer = styled.button`
  width: 100%;
  ${flex({ alignItems: "center", justifyContent: "center" })}
  height: 60px;
  padding: 16px 26px;
  font-weight: 500;
  font-size: 16px;
  appearance: none;
  cursor: pointer;
  border-radius: 18px;
  text-decoration: none;
  &.${ButtonType.Primary} {
    background-color: ${(props) => props.theme.colorPrimary};
    color: ${(props) => props.theme.colorWhite};
    :hover {
      background-color: ${(props) => props.theme.colorPrimaryRgb};
      color: ${(props) => props.theme.colorWhite};
    }
  }
  &.${ButtonType.Success} {
    background-color: ${(props) => props.theme.colorSuccess};
    color: ${(props) => props.theme.colorWhite};
    :hover {
      background-color: ${(props) => props.theme.colorSuccessRgb};
      color: ${(props) => props.theme.colorSuccess};
    }
  }
  &.${ButtonType.Danger} {
    background-color: ${(props) => props.theme.colorDanger};
    color: ${(props) => props.theme.colorWhite};
    :hover {
      background-color: ${(props) => props.theme.colorDangerRgb};
      color: ${(props) => props.theme.colorDanger};
    }
  }
  &.${ButtonType.Info} {
    background-color: ${(props) => props.theme.colorTransparent};
    color: ${(props) => props.theme.colorPrimary};
    :hover {
      background-color: ${(props) => props.theme.colorTransparent};
      color: ${(props) => props.theme.colorPrimary};
    }
  }
  &.loading {
    color: ${(props) => props.theme.colorTransparent};
  }
`;
const Icon = styled.span`
  display: block;
  font-size: 22px;
  margin-top: 6px;
`;
const ButtonText = styled.span`
  display: block;
  margin-left: ${(props) => (props.icon ? "10px" : "")};
`;
const ContainerSpiner = styled.div`
  position: absolute;
  margin-top: 10px;
`;

const Button = ({
  loading,
  type,
  text,
  icon,
  onClick,
  disabled,
  heigth,
  small,
  ...props
}) => {
  return (
    <ButtonContainer
      disabled={disabled || loading}
      className={
        "animate__animated animate__fadeIn " + (!!loading ? "loading" : type)
      }
      style={{
        height: heigth,
      }}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <ContainerSpiner>
          <Spinner type={type}></Spinner>
        </ContainerSpiner>
      ) : null}

      {!!icon ? (
        <Icon>
          <DynamicIcon iconName={icon}></DynamicIcon>
        </Icon>
      ) : null}
      {!!text ? <ButtonText icon={!!icon}>{text}</ButtonText> : null}
    </ButtonContainer>
  );
};

export default Button;
