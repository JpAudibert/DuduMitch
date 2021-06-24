import styled, { css } from 'styled-components';

interface IButtonProps {
  callInProgress?: boolean;
}

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  span {
    font-size: 32px;
  }
`;

export const FieldList = styled.div`
  display: flex;

  > div {
    width: 600px;
    margin: 32px 0;
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
`;

export const Button = styled.button<IButtonProps>`
  ${props =>
    props.callInProgress
      ? css`
          background: #db1818;
        `
      : css`
          background: #3f51b5;
        `};
  color: #fff;
  font-size: 32px;
  padding: 8px;
  border: 0;
  border-radius: 5px;
  margin-top: 20px;
`;
