import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FaAngleRight } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Label = styled(Link)`
  text-decoration: none;
  color: #838383;
  &:hover{
    color: #1a1a41;
  }
  transition: all 0.3s ease;
`;

interface IBreadcrumbProps {
  breadCrumbList: {label: string, link: string}[]
}

const BreadCrumb: React.FC<IBreadcrumbProps> = ({breadCrumbList}) => {
  return (
    <Container>
      {breadCrumbList.map((item, index) => (
        <>
          <Label to={item.link}>{item.label}</Label>
          {index !== breadCrumbList.length-1 && <FaAngleRight size={20} color='#cccccc'/>}
        </>
      ))}
    </Container>
  )
}

export default BreadCrumb
