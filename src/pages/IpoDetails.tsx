import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIPODetails } from "../apiConfigs/api";
import styled from "styled-components";
import { IoChevronBackOutline } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import Timeline from "../components/Timeline";
import { formatDate, formatLargeNumber, getIssueDate } from "../utils";
import BreadCrumb from "../components/BreadCrumb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

const IPODetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 425px){
    >:nth-child(2){
      display: none;
    }
  }
`;

const IPOHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  > svg {
    cursor: pointer;
  }
`;

const IPODetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (min-width: 1366px) {
    border: 1px solid #c0c0c0;
    padding: 20px;
    border-radius: 20px;
  }
`;

const IPODetailsWrapper = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  row-gap: 20px;
  @media only screen and (min-width: 1366px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const IPOTimelineWrapper = styled(IPODetailsWrapper)`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media only screen and (min-width: 1366px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const GoBackBtn = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c0c0c0;
  cursor: pointer;
  &:hover {
    border: 1px solid #24242b;
  }
  transition: all 0.3s ease;
`;

const CompanyLogo = styled.img`
  border: 1px solid #e4e4e4;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  background-color: #e4e4e4;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IPOInfoWrapper = styled(NameWrapper)`
  gap: 8px;
`;

const Title = styled.div<{ fontSize?: number }>`
  font-weight: 700;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "32px")};
  color: #1a1a41;
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #aaa;
`;

const Para = styled.p`
  font-size: 16px;
  color: #aaa;
`;

const Button = styled.button`
  padding: 20px 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #14143c;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

const IpoDetails = () => {
  const { ipoId } = useParams();
  const [ipoDetails, setIPODetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (ipoId) {
      const IPODetails = getIPODetails(ipoId);
      if (IPODetails) {
        setIPODetails(IPODetails);
      }
    }
  }, [ipoId]);

  return (
    <Container>
      <BreadCrumb breadCrumbList={[{label: 'Home', link: '/'}, {label: 'Market search', link: '/ipoDetails/'+ipoId}]}/>
      {ipoDetails && (
        <>
          <IPODetailsHeader>
            <IPOHeaderContainer>
              <GoBackBtn  onClick={() => navigate(-1)}>
                <IoChevronBackOutline size={28} color="#6e6e6e" />
              </GoBackBtn>
              <CompanyLogo src={ipoDetails?.logoUrl} />
              <NameWrapper>
                <Title>{ipoDetails?.companyTitle}</Title>
                <SubTitle>{ipoDetails?.companyName}</SubTitle>
              </NameWrapper>
            </IPOHeaderContainer>
            <IPOHeaderContainer>
              <RxDownload size={30} color="#1e1e24" title="Download" />
              <Button>Apply now</Button>
            </IPOHeaderContainer>
          </IPODetailsHeader>
          <IPODetailsContainer>
            <Title fontSize={20}>IPO details</Title>
            <IPODetailsWrapper>
              <IPOInfoWrapper>
                <SubTitle>Issue size</SubTitle>
                <Title fontSize={18}>{formatLargeNumber(ipoDetails?.issuePrice)}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Price range</SubTitle>
                <Title fontSize={18}>{`₹${ipoDetails?.priceRange[0]} - ${ipoDetails?.priceRange[1]}`}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Minimum amount</SubTitle>
                <Title fontSize={18}>{`${ipoDetails?.minInvestAmount}`}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Lot size</SubTitle>
                <Title fontSize={18}>{`${ipoDetails?.lotSize} shares/lot`}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Issue dates</SubTitle>
                <Title fontSize={18}>{getIssueDate(ipoDetails?.issueDate)}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Listed on</SubTitle>
                <Title fontSize={18}>{formatDate(ipoDetails?.listedDate)}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Listed price</SubTitle>
                <Title fontSize={18}>{"₹" + ipoDetails?.listedPrice}</Title>
              </IPOInfoWrapper>
              <IPOInfoWrapper>
                <SubTitle>Listing gains</SubTitle>
                <Title fontSize={18}>{`₹${ipoDetails?.listingGains}`} (10.0%)</Title>
              </IPOInfoWrapper>
            </IPODetailsWrapper>
          </IPODetailsContainer>
          <IPODetailsContainer>
            <Title fontSize={20}>IPO timeline</Title>
            <IPOTimelineWrapper>
              <Timeline timeline={ipoDetails?.ipoTimeLine} />
            </IPOTimelineWrapper>
          </IPODetailsContainer>
          <IPODetailsContainer>
            <Title fontSize={20}>About the company</Title>
            <Para>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
              facilis possimus! Omnis dolore nemo rerum labore provident eum? Et
              velit rem sit illo laudantium eius similique assumenda, sed
              praesentium inventore! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Id obcaecati exercitationem minus corrupti. Ad
              eum recusandae ea quam aliquid, laborum facere illum itaque unde
              debitis dolorum, reprehenderit facilis dolore possimus. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ad voluptate,
              doloribus provident consequatur nesciunt officiis quas
              perspiciatis facilis placeat fuga eum quod, officia voluptates
              minima dolore saepe! Nesciunt, tenetur beatae? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Sapiente obcaecati
              temporibus fuga veritatis! Earum beatae mollitia vel ipsum
              quibusdam quam tenetur doloremque voluptatum, distinctio illum
              perspiciatis repellat molestias totam nobis.
              <br /> <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              magnam veniam, nostrum vero, ducimus magni excepturi atque vel
              nesciunt nemo perspiciatis aperiam nisi ex quaerat ad qui eveniet
              laboriosam dolorum? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Totam similique cupiditate id commodi, mollitia
              ratione! Nam error culpa maxime eaque impedit! In odio possimus
              autem quod voluptas pariatur quaerat maiores? Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Cum magni doloremque
              praesentium suscipit aspernatur obcaecati enim facilis totam
              quaerat ut assumenda soluta, quam corporis dolorem eos mollitia
              ullam. Vitae, quisquam.
            </Para>
          </IPODetailsContainer>
        </>
      )}
    </Container>
  );
};

export default IpoDetails;
