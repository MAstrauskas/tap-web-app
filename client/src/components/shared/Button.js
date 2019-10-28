import React from "react";
import styled from "@emotion/styled";
import Theme from "../shared/Theme/Theme";

const CustomButton = styled.button`
  width: 157px;
  height: 37px;
  background: ${Theme.colors.primary};
  border: 1px solid ${Theme.colors.primary};
  border-radius: 9px;
  font-size: 16px;
  line-height: 18px;
  color: ${Theme.colors.white};
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Button = ({ title }) => {
  return (
    <>
      <CustomButton>{title}</CustomButton>
    </>
  );
};

export default Button;
