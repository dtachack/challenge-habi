import {
  colorPrimary,
  colorSuccess,
  colorDanger,
  colorWarning,
  colorInfo,
  colorWhite,
  colorPrimaryRgb,
  colorSuccessRgb,
  colorDangerRgb,
  colorWarningRgb,
  colorGrey1,
  colorGrey3,
  colorDark0,
  colorGrey2,
  colorDark2,
  colorTransparent,
  colorBlack,
} from "./base/colors";
import { ThemesType } from "../shared/enums/themes-type";

const colors = {
  colorPrimary,
  colorSuccess,
  colorDanger,
  colorWarning,
  colorInfo,
  colorWhite,
  colorPrimaryRgb,
  colorSuccessRgb,
  colorDangerRgb,
  colorWarningRgb,
  colorGrey1,
  colorGrey3,
  colorDark0,
  colorGrey2,
  colorDark2,
  colorTransparent,
  colorBlack,
};
export const themes = {
  light: {
    ...colors,
    name: ThemesType.Light,
    input: {
      background: colorWhite,
      color: colorGrey3,
      border: colorGrey1,
      borderActive: colorPrimary,
      labelColor: colorGrey3,
      backgroundActive: colorWhite,
    },
  },
};
