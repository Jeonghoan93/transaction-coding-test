import styled from "styled-components";

export const ErrorDiv = styled.div`
  color: red;
  padding: 10px;
  border-color: #f5c6cb;
  margin-bottom: 20px;
  border-radius: 5px;
`;
export const ErrorMessage = ({ message }: { message: string }) => {
  return message ? <ErrorDiv className="error">{message}</ErrorDiv> : null;
};
