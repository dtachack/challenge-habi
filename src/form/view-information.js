import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ControlType } from "../shared/enums/control-type";
import { numberFormat } from "../shared/format/currency-format";

const Text = styled.span`
  text-align: left;
  display: block;
`;

const ViewInformation = ({ control, information }) => {
  const { t } = useTranslation();
  const listData =
    control?.type === ControlType.CheckBoxGroup ||
    control?.type === ControlType.RadioGroup
      ? control?.list
      : [];
  return control?.type === ControlType.Money ? (
    <>
      <Text>
        {!!information[control?.nameProperty]
          ? numberFormat(information[control?.nameProperty])
          : ""}
      </Text>
    </>
  ) : control?.type === ControlType.RadioGroup ? (
    <>
      <Text>
        {t(
          listData?.find(
            (x) => information[control?.nameProperty] === x?.nameProperty
          )?.text
        )}
      </Text>
    </>
  ) : control?.type === ControlType.CheckBoxGroup ? (
    <>
      {information[control?.nameProperty]?.map((_info, index) => {
        return (
          <Text key={index}>
            {t(listData?.find((x) => _info === x?.nameProperty)?.text)}
          </Text>
        );
      })}
    </>
  ) : control?.type !== ControlType.File ? (
    " - " + !!information[control?.nameProperty] ? (
      information[control?.nameProperty]
    ) : (
      "-"
    )
  ) : null;
};

export default ViewInformation;
