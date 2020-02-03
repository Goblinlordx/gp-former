import styled from "styled-components";

export const Section = styled.div`
  margin: 0.75em;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: #eee;
`;

export const Content = styled.div`
  margin: 0.5em;
`;

export const Tile = styled.img`
  height: 80px;
  margin: 0.25em 0em;
`;


export const Group = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-radius: 4px;
  background-color: #ccc;
  color: #222;
`;


export const GroupHeader = styled(Content)`
  font-weight: bold;
`;

export const GroupContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;


export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  ${({ color }) => color && `background-color: ${color};`}
  padding: 0.5em;
`;
