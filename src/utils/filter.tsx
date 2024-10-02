import {
  // ContextProps as ContextPropsType,
  DisplayState as DisplayStateType,
} from "../state/context";
import { LuCircleDashed } from "react-icons/lu";
import { PiCircleHalfFill } from "react-icons/pi";
import { MdCheckCircle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import {
  BsFillXCircleFill,
  BsThreeDots,
  BsExclamationSquareFill,
} from "react-icons/bs";
import SignalHigh from "../assets/icons/SignalHigh.svg";
import SignalMedium from "../assets/icons/SignalMedium.svg";
import SignalLow from "../assets/icons/SignalLow.svg";

interface DataType {
  tickets: {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
  }[];
  users: {
    id: string;
    name: string;
    available: boolean;
  }[];
}

type Ticket = {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
};

type ResultPriority = {
  name: string;
  icon: JSX.Element;
  tickets: Ticket[];
};

export function getStatusIcon(status: string, color?: string) {
  switch (status) {
    case "Backlog":
      return <LuCircleDashed color={color ? color : "gray"} />;
    case "Todo":
      return <FaRegCircle color={color ? color : "gray"} />;
    case "In progress":
      return <PiCircleHalfFill color={color ? color : "#F1CA49"} />;
    case "Done":
      return <MdCheckCircle color={color ? color : "#5E6AD2"} />;
    case "Canceled":
      return <BsFillXCircleFill color={color ? color : "gray"} />;
    default:
      return <LuCircleDashed color={color ? color : "gray"} />;
  }
}

export function getPriorityIcon(index: number, color?: string) {
  switch (index) {
    case 1:
      return <img src={SignalLow} width={16} height={16} />;
    case 2:
      return <img src={SignalMedium} width={16} height={16} />;
    case 3:
      return <img src={SignalHigh} width={16} height={16} />;
    case 4:
      return <BsExclamationSquareFill color={color ? color : "#FC7840"} />;
    default:
      return <BsThreeDots color={color ? color : "#697077"} />;
  }
}

export default function filter(data: DataType, displayState: DisplayStateType) {
  // Grouping=Status
  if (displayState.grouping === "status") {
    const statuses = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
    // Ordering=Priority
    if (displayState.ordering === "priority") {
      const sortedTickets = statuses.map((status) => {
        // let statusIcon = <LuCircleDashed color="gray" />;
        // if (status === "Backlog") {
        //   statusIcon = <LuCircleDashed color="gray" />;
        // } else if (status === "Todo") {
        //   statusIcon = <FaRegCircle color="gray" />;
        // } else if (status === "In progress") {
        //   statusIcon = <PiCircleHalfFill color="yellow" />;
        // } else if (status === "Done") {
        //   statusIcon = <MdCheckCircle color="dark blue" />;
        // } else if (status === "Canceled") {
        //   statusIcon = <BsFillXCircleFill color="gray" />;
        // }
        return {
          name: status,
          icon: getStatusIcon(status),
          tickets: data.tickets
            .filter((ticket) => ticket.status === status)
            .sort((a, b) => a.priority - b.priority),
        };
      });
      return sortedTickets;
    }
    // Ordering=Title
    else {
      const sortedTickets = statuses.map((status) => {
        // let statusIcon = <LuCircleDashed color="gray" />;
        // if (status === "Backlog") {
        //   statusIcon = <LuCircleDashed color="gray" />;
        // } else if (status === "Todo") {
        //   statusIcon = <FaRegCircle color="gray" />;
        // } else if (status === "In progress") {
        //   statusIcon = <PiCircleHalfFill color="yellow" />;
        // } else if (status === "Done") {
        //   statusIcon = <MdCheckCircle color="dark blue" />;
        // } else if (status === "Canceled") {
        //   statusIcon = <BsFillXCircleFill color="gray" />;
        // }
        return {
          name: status,
          icon: getStatusIcon(status),
          tickets: data.tickets
            .filter((ticket) => ticket.status === status)
            .sort((a, b) => a.title.localeCompare(b.title)),
        };
      });
      return sortedTickets;
    }
  }
  // Grouping=User
  else if (displayState.grouping === "user") {
    // Ordering=Priority
    if (displayState.ordering === "priority") {
      const sortedTickets = data.users.map((user) => {
        return {
          name: user.name,
          available: user.available,
          icon: (
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              style={{ borderRadius: "50%" }}
            />
          ),
          tickets: data.tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.priority - b.priority),
        };
      });
      return sortedTickets;
    }
    // Ordering=Title
    else {
      const sortedTickets = data.users.map((user) => {
        return {
          name: user.name,
          available: user.available,
          icon: (
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              style={{ borderRadius: "50%" }}
            />
          ),
          tickets: data.tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.title.localeCompare(b.title)),
        };
      });
      return sortedTickets;
    }
  }
  // Grouping=Priority
  else {
    const priorityNames = ["No priority", "Low", "Medium", "High", "Urgent"];
    const priorityArrays: Ticket[][] = [[], [], [], [], []];
    data.tickets.forEach((ticket) => {
      priorityArrays[ticket.priority].push(ticket);
    });
    priorityArrays.forEach((array) => {
      array.sort((a, b) => a.title.localeCompare(b.title));
    });
    const sortedTickets: ResultPriority[] = priorityArrays.map(
      (tickets, index) => {
        // let priorityIcon = <BsThreeDots color="#697077" />;
        // if (index === 1) {
        //   priorityIcon = <img src={SignalLow} width={16} height={16} />;
        // } else if (index === 2) {
        //   priorityIcon = <img src={SignalMedium} width={16} height={16} />;
        // } else if (index === 3) {
        //   priorityIcon = <img src={SignalHigh} width={16} height={16} />;
        // } else if (index === 4) {
        //   priorityIcon = <BsExclamationSquareFill color="#697077" />;
        // }
        return {
          name: priorityNames[index],
          icon: getPriorityIcon(index),
          tickets: tickets,
        };
      }
    );
    return sortedTickets;
  }
}
