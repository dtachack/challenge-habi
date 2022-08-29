import { Outlet } from "react-router-dom";
import styled from "styled-components";

import logoHabi from "../assets/habi-logo.png";
import { size } from "../styles/base/breakpoints";
import { flex } from "../styles/abstracts/mixins";
import background from "../assets/background.webp";
const HeroBackground = styled.div`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow-y: auto;
`;

const Header = styled.header`
  width: 100%;
  max-width: ${size.desktop};
  height: 64px;
  margin: auto;
`;
const ContentIcon = styled.div`
  background-color: ${(props) => props.theme.colorWhite};
  text-align: center;
  width: 66px;
  height: 100%;
  border-radius: 0px 0px 8px 8px;
  margin-left: 40px;
  ${flex({ alignItems: "center", justifyContent: "center" })}
`;
const Logo = styled.img`
  height: auto;
  width: 40px;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  max-width: ${size.desktop};
`;

const Layout = () => {
  return (
    <>
      <HeroBackground
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${background})`,
        }}
      >
        <Header>
          <ContentIcon className="animate__animated animate__fadeInDown">
            <Logo src={logoHabi}></Logo>
          </ContentIcon>
        </Header>
        <Content>
          <Outlet />
        </Content>
      </HeroBackground>
    </>
  );
};

export default Layout;
