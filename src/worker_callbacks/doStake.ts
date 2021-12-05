import doStakeGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/doStake';
import { log } from '@kot-shrodingera-team/germes-utils';
import getCoefficient from '../stake_info/getCoefficient';

const preCheck = (): boolean => {
  return true;
};

const postCheck = (): boolean => {
  return true;
};

const doStake = doStakeGenerator({
  preCheck,
  doStakeButtonSelector:
    '.BetslipFooter__PlaceBetButtonWrapper > button.OM-Button',
  errorClasses: [
    // {
    //   className: '.BetslipFooter__LoginButton--disabled',
    //   message: '',
    // },
  ],
  disabledCheck: true,
  getCoefficient,
  postCheck,
  context: () => window.germesData.sportsFrame.contentDocument,
});

export default doStake;
