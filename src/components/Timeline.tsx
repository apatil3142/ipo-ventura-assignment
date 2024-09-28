import React from 'react';
import styled from 'styled-components';
import { ITimelineProps } from '../interface';
import { formatDate } from '../utils';

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  @media only screen and (min-width: 1366px){
    flex-direction: row;
    margin-top: 16px;
  }
`;
const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  @media only screen and (min-width: 1366px){
    flex-direction: column;
    padding: 0 40px;
  }
`;

const Circle = styled.div<{ completed: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ completed }) => (completed ? '#4caf50' : '#ddd')};
  position: relative;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:after {
    content: ${({ completed }) => (completed ? "'✔'" : "''")};
    color: white;
    font-size: 12px;
  }

  @media only screen and (min-width: 1366px){
    position: absolute;
    top: -8px;
    margin-right: 0;
  }
`;

const VerticalLine = styled.div<{ isGreen: boolean }>`
  position: absolute;
  width: 4px;
  background-color: ${({ isGreen }) => (isGreen ? '#4caf50' : '#ddd')};
  top: 0;
  bottom: 0;
  left: 9px;
  @media only screen and (min-width: 1366px){
    width: 100%;
    height: 4px;
    left: 0;
  }
`;

const LabelDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 0;
  @media only screen and (min-width: 1366px){
    text-align: center;
    min-width: 105px;
  }
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Date = styled.div`
  color: gray;
`;

const IpoTimeline: React.FC<ITimelineProps> = ({timeline}) => {
  return (
    <TimelineWrapper>
      {timeline?.map((item, index) => (
        <TimelineItem key={index}>
          <VerticalLine isGreen={item.completed} />
          <Circle completed={item.completed} />
          <LabelDateContainer>
            <Label>{item.label}</Label>
            <Date>{formatDate(item?.date)}</Date>
          </LabelDateContainer>
        </TimelineItem>
      ))}
    </TimelineWrapper>
  );
};

export default IpoTimeline;
