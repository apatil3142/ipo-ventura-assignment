import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../components/Table";
import { IColumnConfig } from "../interface";
import { getIPOList } from "../apiConfigs/api";
import { formatLargeNumber, getIssueDate } from "../utils";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const CompanyNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 26px;
  gap: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const CompanyLogo = styled.img`
  border: 1px solid #e4e4e4;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`;

const NameWrapper = styled.div<{ alignText?: string }>`
  display: flex;
  flex-direction: column;
  text-align: ${({ alignText }) => (alignText ? alignText : "left")};
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

const SubTitle = styled.div`
  font-size: 14px;
`;

const Home = () => {
  const [ipoList, setIpoList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getIPOList();
    setIpoList(data);
  }, []);

  const columnConfig: IColumnConfig[] = [
    {
      columnId: "company",
      header: "Company / Issue date",
      alignContent: "left",
      render: (row) => (
        <CompanyNameContainer onClick={() => navigate(`/ipoDetails/${row.id}`)}>
          <CompanyLogo src={row?.logoUrl}/>
          <NameWrapper>
            <Title>{row?.companyTitle}</Title>
            <SubTitle>{getIssueDate(row.issueDate)}</SubTitle>
          </NameWrapper>
        </CompanyNameContainer>
      ),
    },
    {
      columnId: "issuePrice",
      header: "Issue size",
      render: (row) => (
        <Title>{`₹${formatLargeNumber(row?.issuePrice)}`}</Title>
      ),
    },
    {
      columnId: "priceRange",
      header: "Price range",
      render: (row) => (
        <Title>{`₹${row.priceRange[0]} - ${row.priceRange[1]}`}</Title>
      ),
    },
    {
      columnId: "minInvest",
      header: "Min invest/qty",
      render: (row) => (
        <NameWrapper alignText={"center"}>
          <Title>{"₹" + row?.minInvestAmount}</Title>
          <SubTitle>{`${row?.minInvestQtyShares} Shares / ${row?.minInvestQtyLots} Lots`}</SubTitle>
        </NameWrapper>
      ),
    },
  ];

  return (
    <Container>
      <BreadCrumb breadCrumbList={[{label: 'Home', link: '/'}]}/>
      <Table columns={columnConfig} data={ipoList} />
    </Container>
  );
};

export default Home;
