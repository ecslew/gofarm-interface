import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useGoFarm from '../../hooks/useGoFarm';
import background_1 from '../../assets/img/background_1.png';
// import Notice from '../../components/Notice';

const Home: React.FC = () => {
  const goFarm = useGoFarm();

  const [{ GOT}, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [GOT] = await Promise.all([
      goFarm.getGOTStatFromUniswap()
    ]);
    setStats({ GOT });
  }, [goFarm, setStats]);

  useEffect(() => {
    if (goFarm) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [goFarm,fetchStats]);

  const GOTAddr = useMemo(() => goFarm?.GOC.address, [goFarm]);

  return (
    <Background>
    <Page>
      <PageHeader
        // icon={<img src={require("../../assets/img/goCash (3).png")} width="80%" alt="goCash" height="100%"/>}
        subtitle="在GoSwap上购买，出售和提供GoCash现金和GoCash股份的流动性"
        title="欢迎来到 Go Cash!"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="GoCash现金"
          symbol="GOC"
          color="#EEA7ED"
          supplyLabel="循环供应"
          address={GOTAddr}
          stat={GOT}
        />
      </CardWrapper>
    </Page>
    </Background>
  );
};

// const StyledOverview = styled.div`
//   align-items: center;
//   display: flex;
//   @media (max-width: 768px) {
//     width: 100%;
//     flex-flow: column nowrap;
//     align-items: center;
//   }
// `;

const Background = styled.div`
background: url(${background_1});
background-size: cover;
background-repeat: no-repeat;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

// const StyledNoticeContainer = styled.div`
//   max-width: 768px;
//   width: 90vw;
// `;

// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `;

// const StyledLink = styled.a`
//   font-weight: 700;
//   text-decoration: none;
//   color: ${(props) => props.theme.color.primary.main};
// `;

export default Home;
