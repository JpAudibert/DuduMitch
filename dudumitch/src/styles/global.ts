import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
  }

  body {
    background: #fff;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font-size: 16px;
    font-family: 'Times New Roman', Times, serif;
  }
  button {
    cursor: pointer;
  }
`;
