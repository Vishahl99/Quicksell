import styled from "styled-components";
import { AppContext } from "../../../state/context";
import { useContext } from "react";
import { BsCircleFill } from "react-icons/bs";
import { getPriorityIcon, getStatusIcon } from "../../../utils/filter";

interface CardProps {
  data: {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
  };
}

type User = {
  id: string;
  name: string;
  available: boolean;
};

export default function Card(props: CardProps) {
  const { data, displayState } = useContext(AppContext);
  const grouping = displayState.grouping;
  // const ordering = displayState.ordering;

  const findUserById = (userId: string): User | undefined => {
    return data?.users.find((user) => user.id === userId);
  };

  // Status
  const statusIcon = getStatusIcon(props.data.status);

  // Priority
  const priorityIcon = getPriorityIcon(props.data.priority, "#697077");

  return (
    <CardWrapper>
      <IdLine>
        <IdText>{props.data.id}</IdText>
        {grouping.toString() !== "user" && (
          <UsrImgWrapper>
            <UsrImg
              src={`https://i.pravatar.cc/150?u=${props.data.userId}`}
            ></UsrImg>
            <BsCircleFill
              color={
                findUserById(props.data.userId)?.available ? "#FFB302" : "gray"
              }
            />
          </UsrImgWrapper>
        )}
      </IdLine>
      <TitleLine>
        {grouping.toString() !== "status" && <div className="status-icon">{statusIcon}</div>}
        <Title>{props.data.title}</Title>
      </TitleLine>
      <BottomLine>
        {grouping.toString() !== "priority" && (
          <PriorityImgWrapper>{priorityIcon}</PriorityImgWrapper>
        )}
        {props.data.tag && (
          <Tags>
            {props.data.tag.map((tag) => (
              <Tag>
                <BsCircleFill color="#a8a8a8" size={12} />
                <h1>{tag}</h1>
              </Tag>
            ))}
          </Tags>
        )}
      </BottomLine>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 3px #a8a8a8;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
`;

const IdLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IdText = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: #697077;
`;

const UsrImgWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    width: 8px;
    height: 8px;
    right: 0;
    bottom: 0;
    border: 1px solid white;
    border-radius: 50%;
  }
`;

const UsrImg = styled.img`
  height: 20px;
  width: auto;
  border-radius: 50%;
`;

const TitleLine = styled.div`
  display: flex;
  /* align-items: center; */ 
  gap: 0.5rem;
  .status-icon {
    margin-top: 0.1rem; // To push the icon to the same level as the text
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #343a3f;
  line-height: 1.2;
`;

const BottomLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PriorityImgWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border: 1px solid #c1c7cd;
  /* box-shadow: 0px 0px 1px #c1c7cd; */
  border-radius: 4px;
  height: fit-content;
  width: fit-content;
  min-width: 20px;
  min-height: 20px;
`;

const Tags = styled.div`
  box-sizing: border-box;
`;

const Tag = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.3rem;
  border: 1px solid #c1c7cd;
  border-radius: 4px;
  min-width: 24px;
  min-height: 24px;
  h1 {
    font-size: 14px;
    font-weight: 500;
    color: #697077;
  }
`;
