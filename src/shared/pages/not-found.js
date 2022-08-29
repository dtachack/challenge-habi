import styled from "styled-components";
import { flex } from "../../styles/abstracts/mixins";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #c1deef;
  ${flex({ alignItems: "center", justifyContent: "center" })}
`;
const Image = styled.img`
  height: auto;
  max-width: 100%;
  background-color: #c1deef;
`;
const NotFound = () => {
  return (
    <Container>
      <Image src="http://www.desdelaplaza.com/wp-content/uploads/2015/12/Error-404.png"></Image>
    </Container>
  );
};

export default NotFound;
