import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { BsCircleFill } from "react-icons/bs";

interface ColumnHeaderProps {
  icon: JSX.Element;
  name: string;
  count: number;
  available?: boolean;
}

export default function ColumnHeader({
  icon,
  name,
  count = 0,
  available,
}: ColumnHeaderProps) {
  return (
    <ColumnHeaderWrapper>
      <div className="left">
        <div className="icon">
          {icon}
          {available !== undefined && (
            <div className="available-icon">
              <BsCircleFill color={available ? "#FFB302" : "gray"} />
            </div>
          )}
        </div>
        <Title>{name}</Title>
        <Count>{count}</Count>
      </div>
      <div className="right">
        <BiPlus color="#697077" size={18} />
        <BsThreeDots color="#697077" size={18} />
      </div>
    </ColumnHeaderWrapper>
  );
}

const ColumnHeaderWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 16px;
        height: 16px;
      }
      .available-icon {
        svg {
          position: absolute;
          width: 8px;
          height: 8px;
          right: -4px;
          bottom: -4px;
          border: 1px solid white;
          border-radius: 50%;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: #343a3f;
`;

const Count = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: #697077;
`;
