import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import HoverBox from '@component/HoverBox';
import { H2, H4 } from '@component/Typography';
import React from 'react';
import styled from 'styled-components';

interface ClientProps {
  slides?: number;
  isProductDetails?: boolean;
  clients: any;
}

const RelatedClients: React.FC<ClientProps> = (props) => {
  const { clients } = props;
  const Clients = clients?.map((item, ind) => (
    <Box key={ind} className="client client_related" mr="1rem">
      <HoverBox borderRadius={5} className="client__body">
        <img
          src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}
          alt={`Nobarun-Client-${item.title}`}
          className="client__image"
        />
      </HoverBox>
      <H4 fontSize="1.4rem" fontWeight="600" className="client__title">
        {item.title}
      </H4>
    </Box>
  ));
  return (
    <Box pt="1em" mb="2rem">
      <FlexBox justifyContent="center" alignItems="center" mb="1em">
        <FlexBox alignItems="center">
          <H2
            fontWeight="600"
            fontSize="26px"
            textAlign="center"
            lineHeight="1"
          >
            Our Clients
          </H2>
        </FlexBox>
      </FlexBox>
      <div className="slider-container">
        <ScrollWrapper className="scroll" length={clients.length}>
          {Clients}
        </ScrollWrapper>
        <ScrollWrapper className="scroll" length={clients.length}>
          {Clients}
        </ScrollWrapper>
      </div>
    </Box>
  );
};

const ScrollWrapper = styled.div<{ length: number }>`
  display: flex;
  -webkit-animation: marquee ${(props) => props.length * 4}s linear infinite;
  animation: marquee ${(props) => props.length * 4}s linear infinite;
`;

export default RelatedClients;
