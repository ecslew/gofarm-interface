import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import Context from './context';
import useGoFarm from '../../hooks/useGoFarm';
import { Farm } from '../../go-farm';
import config, { bankDefinitions } from '../../config';

const Farms: React.FC = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const  goFarm = useGoFarm();

  const fetchPools = useCallback(async () => {
    const farms: Farm[] = [];

    for (const farmInfo of Object.values(bankDefinitions)) {
      if (farmInfo.finished) {
        if (! goFarm.isUnlocked) continue;

        // only show pools staked by user
        const {amount} = await  goFarm.stakedBalanceOnFarm(farmInfo.pid,  goFarm.myAccount);
        if (BigNumber.from(amount).lte(0)) {
          continue;
        }
      }
      farms.push({
        ...farmInfo,
        address: config.MasterChef,
        depositToken:  goFarm.externalTokens[farmInfo.depositTokenName],
        earnToken:  goFarm.GOT,
      });
    }
    farms.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setFarms(farms);
  }, [ goFarm, setFarms]);

  useEffect(() => {
    if ( goFarm) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [ goFarm, fetchPools]);

  return <Context.Provider value={{ farms }}>{children}</Context.Provider>;
};

export default Farms;
