import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';

const preCheck = async (): Promise<boolean> => {
  return true;
};

const apiClear = (): void => {
  const clearButtons =
    window.germesData.sportsFrame.contentDocument.querySelectorAll<HTMLElement>(
      '.OM-Icon--close, BetslipNotification__Close, .OM-Icon--recycle-many'
    );
  clearButtons.forEach((button) => button.click());
};

const postCheck = async (): Promise<boolean> => {
  return true;
};

const clearCoupon = clearCouponGenerator({
  preCheck,
  getStakeCount,
  apiClear,
  // clearSingleSelector: '.BetslipSelection__IconWrapper',
  // clearAllSelector: '',
  postCheck,
  context: () => window.germesData.sportsFrame.contentDocument,
});

export default clearCoupon;
