import styled from "@emotion/styled";

const Wrapper = styled.div`
  background: linear-gradient(to right top, #00c9ff, #92fe9d);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const RBox = styled.div`
  min-height: 80vh;
  width: 50%;
  margin-left: 2em;
`;

const Content = styled.div`
  min-height: 66vh;
  background: linear-gradient(
    to right top,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 20px;
`;

const LBox = styled.div`
  min-height: 80vh;
  width: 20%;
  background: linear-gradient(
    to right top,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 20px;
`;

const Navbar = styled.div`
  min-height: 10vh;
  width: 100%;
  margin-bottom: 2em;
  background: linear-gradient(
    to right top,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 20px;
`;

const App = () => {
  return (
    <Wrapper>
      <LBox></LBox>
      <RBox>
        <Navbar></Navbar>
        <Content></Content>
      </RBox>
    </Wrapper>
  );
};

export default App;
