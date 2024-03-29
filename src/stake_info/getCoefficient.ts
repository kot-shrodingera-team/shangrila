import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';

export const coefficientSelector = '.BetslipSelectionDetails__Odd';
// export const coefficientSelector = '.BetslipSelectionDetails__Odd, .BetslipBet__Details.BetslipSelectionDetails__Odd';

const coefficientOptions: StakeInfoValueOptions = {
  name: 'coefficient',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      // getText: () => '',
      selector: coefficientSelector,
      context: () => window.germesData.sportsFrame.contentDocument,
    },
    replaceDataArray: [
      {
        searchValue: '',
        replaceValue: '',
      },
    ],
    removeRegex: /[\s,']/g,
    matchRegex: /(\d+(?:\.\d+)?)/,
    errorValue: 0,
  },
  zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modifyValue: (value: number, extractType: string) => value,
  disableLog: false,
};

const getCoefficient = getStakeInfoValueGenerator(coefficientOptions);

export const coefficientReady =
  stakeInfoValueReadyGenerator(coefficientOptions);

export default getCoefficient;
