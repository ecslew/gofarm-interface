import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        basisCash.unstake(bank.contract, amountBn),
        `从 ${bank.contract} 取出 ${amount} ${bank.depositTokenName} `,
      );
    },
    [bank, basisCash,handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
