import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;

  video {
    width: 550px;
    border-radius: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px;

    span {
      font-size: 32px;
    }
  }
`;
