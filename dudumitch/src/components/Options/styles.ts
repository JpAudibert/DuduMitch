import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    margin-top: 20px;
  }

  span {
    font-size: 32px;
  }

  form {
    padding: 20;
  }
`;

export const FieldList = styled.div`
  display: flex;

  > div {
    width: 600px;
    margin: 35px 0;
    padding: 10px 20px;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 8px 16px;
    font-size: 16px;
    height: 40px;
  }

  input:-ms-input-placeholder,
  input::-webkit-input-placeholder,
  input:-moz-placeholder,
  input::-moz-placeholder {
    font-size: 24px;
  }

  button {
    background: #3f51b5;
    color: #fff;
    font-size: 32px;
    padding: 8px;
    border: 0;
    border-radius: 5px;
  }
`;
