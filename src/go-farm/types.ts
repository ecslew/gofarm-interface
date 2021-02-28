import ERC20 from './ERC20';

export type ContractName = string;

export interface FarmInfo {
  name: string;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  TokenA: ContractName;
  TokenB: ContractName;
  pairName: string;
  pairUrl: string;
  sort: number;
  finished: boolean;
  pid: number;
}

export interface Farm extends FarmInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type TokenStat = {
  priceInDAI: string;
  totalSupply: string;
};

export type UserInfo = {
  amount: string;
  rewardDebt: string;
};

export type TreasuryAllocationTime = {
  prevAllocation: Date;
  nextAllocation: Date;
}
