import styled from "styled-components";
import { BiSlider } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

interface DisplayButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DisplayButton({ onClick }: DisplayButtonProps) {
  return (
    <DisplayButtonWrapper onClick={onClick}>
      <BiSlider />
      <Text>Display</Text>
      <MdKeyboardArrowDown />
    </DisplayButtonWrapper>
  );
}

const DisplayButtonWrapper = styled.button`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  color: #494949;
  border: 1px solid #f4f4f4;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  box-shadow: 0px 0px 3px #a8a8a8;
  cursor: pointer;
`;

const Text = styled.h1`
  font-size: 14px;
  font-weight: 575;
`;
