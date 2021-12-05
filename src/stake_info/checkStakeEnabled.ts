import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  return true;
};

const checkStakeEnabled = checkStakeEnabledGenerator({
  preCheck,
  getStakeCount,
  betCheck: {
    selector: '.BetslipSelection',
    errorClasses: [
      // {
      //   className: '.BetslipSelection--Disabled',
      //   message: '',
      // },
      // {
      //   className: '.BetslipSelection--Error',
      //   message: '',
      // },
      {
        className: '.BetslipSelection--Disabled.BetslipSelection--Error',
        message: 'DIS ERROR',
      },
    ],
  },
  errorsCheck: [
    {
      selector: '.BetslipSelection--Disabled',
      message: 'errorsCheck Disabled',
    },
    {
      selector: '.BetslipSelection--Error',
      message: 'errorsCheck Error',
    },
    {
      selector: '.BetslipBet__ErrorMessageText',
      message: '',
    },
    {
      selector: '.BetslipBlockingNotification',
      message: '',
    },
  ],
  context: () => window.germesData.sportsFrame.contentDocument,
});

export default checkStakeEnabled;
