import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../shared/components/button";
import { selectInitialStep } from "../store/selectors/configuration.selectors";
import { ButtonType } from "../shared/enums/buttons-type";
import { device } from "../styles/base/breakpoints";
import { setClearInformationAction } from "../store/actions/save-information.actions";

const ContentHome = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  margin: auto;
  padding-left: 40px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colorWhite};
  font-size: 48px;
  margin-top: 15vh;

  @media ${device.tablet} {
    font-size: 35px;
  }
  @media ${device.mobileL} {
    font-size: 28px;
  }
  @media ${device.mobileS} {
    font-size: 22px;
  }
`;
const ContentButton = styled.div`
  margin-top: 80px;
  width: 150px;
`;
const Home = () => {
  const { t } = useTranslation();
  const initalStep = useSelector(selectInitialStep);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitSell = () => {
    if (!!initalStep) navigate(initalStep?.path);
  };

  useEffect(() => {
    dispatch(setClearInformationAction());
  }, [dispatch]);

  return (
    <ContentHome>
      <Title>
        <strong>{t("HOME_TITLE")}</strong>
        <br />
        {t("HOME_SUBTITLE")}
      </Title>
      <ContentButton>
        <Button
          type={ButtonType.Primary}
          icon="hi/HiOutlineHome"
          text={t("SELL")}
          onClick={onSubmitSell}
        ></Button>
      </ContentButton>
    </ContentHome>
  );
};

export default Home;
