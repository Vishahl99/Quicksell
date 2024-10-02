import styled from "styled-components";

interface ColumnProps {
    children: JSX.Element;
}

export default function Column({ children }: ColumnProps) {

    return (
        <ColumnWrapper id="column-layout">
            {children}
        </ColumnWrapper>
    )
}

const ColumnWrapper = styled.div`
    width: 20vw;
    min-width: 20vw;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`