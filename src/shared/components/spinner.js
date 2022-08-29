import styled, { keyframes } from "styled-components";

import {
  colorPrimary,
  colorWhite,
  colorDanger,
  colorSuccess,
} from "../../styles/base/colors";
import { ButtonType } from "../enums/buttons-type";

const animation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const DualRing = styled.div.attrs((props) => props)`
  display: inline-block;
  ::after {
    content: " ";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid ${(props) => props.color};
    border-color: ${(props) => props.color} transparent
      ${(props) => props.color} transparent;
    animation: ${animation} 1.2s linear infinite;
  }
`;

const Spinner = ({ type }) => {
  const color = () => {
    switch (type) {
      case ButtonType.Danger:
        return colorDanger;
      case ButtonType.Success:
        return colorSuccess;
      case ButtonType.Primary:
        return colorPrimary;
      default:
        return colorWhite;
    }
  };
  return <DualRing color={color()}></DualRing>;
};

export default Spinner;
