import { FundingSource } from '$/utils/src/enums/FundingSourceEnum';
import { PaymentType } from '$/utils/src/enums/PaymentTypeEnum';

export const FundingSourceLabels: Record<FundingSource, string> = {
  [FundingSource.BUDGET]: 'Бюджет',
  [FundingSource.CONTRACT]: 'Контракт',
};

export const PaymentTypeLabels: Record<PaymentType, string> = {
  [PaymentType.MONTHLY]: 'Щомісячно',
  [PaymentType.QUARTERLY]: 'Щорічно',
  [PaymentType.SEMESTERLY]: 'Щосеместрово',
};
