import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';
import { getElement, log } from '@kot-shrodingera-team/germes-utils';

// export const balanceSelector = '';
export const refreshBalance = async (): Promise<void> => {
  const balanceIcon = await getElement<HTMLElement>('#user-icon-btn');
  if (balanceIcon) {
    balanceIcon.click();
    const panelBalance = await getElement('.panel_balance_value');
    if (panelBalance) {
      window.germesData.balance = Number(
        document.querySelectorAll('.panel_balance_value .user-balance-amt')[1]
          .textContent
      );
      log(`BALANCE UPDATED ${window.germesData.balance}`);
    }
  }
  const closeModalButton = document.querySelector<HTMLElement>(
    '.modal-content .sidebar_close_btn'
  );
  if (window.germesData.balance !== undefined) {
    closeModalButton.click();
  }

  ((): void => {
    worker.StakeInfo.Balance = window.germesData.balance;
    worker.JSBalanceChange(window.germesData.balance);
  })();
};

const balanceOptions: StakeInfoValueOptions = {
  name: 'balance',
  fixedValue: () => window.germesData.balance,
  // valueFromText: {
  //   text: {
  //     // getText: () => '',
  //     selector: '.panel_balance_value',
  //     context: () => document,
  //   },
  //   replaceDataArray: [
  //     {
  //       searchValue: '',
  //       replaceValue: '',
  //     },
  //   ],
  //   removeRegex: /[\s,']/g,
  //   matchRegex: /(\d+(?:\.\d+)?)/,
  //   errorValue: 0,
  // },
  zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modifyValue: (value: number, extractType: string) => value,
  disableLog: false,
};

const getBalance = getStakeInfoValueGenerator(balanceOptions);

export const balanceReady = stakeInfoValueReadyGenerator(balanceOptions);

export const updateBalance = (): void => {
  worker.StakeInfo.Balance = getBalance();
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
