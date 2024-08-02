import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';

export const FundingSourceLabels: Record<FundingSource, string> = {
  [FundingSource.BUDGET]: 'Бюджет',
  [FundingSource.CONTRACT]: 'Контракт',
};
