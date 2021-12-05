import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '.BetslipGroup__Content .BetslipSelection',
  context: () => window.germesData.sportsFrame.contentDocument,
});

export default getStakeCount;
