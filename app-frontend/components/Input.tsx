import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  margin: 10px 0;
  width: 100%;
`;

export const Input = ({
  value,
  placeholder,
  dataType,
  onChange,
}: {
  value: string;
  placeholder: string;
  dataType: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <StyledInput
      data-type={dataType}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
