import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import { refreshBalance } from '../stake_info/getBalance';

const preOpenBet = async (): Promise<void> => {
  await refreshBalance();
  log('проверяем маркеты');
  const marketsContainer = await getElement(
    // '.MatchDetails',
    '.PageScrollableContent',
    10000,
    window.germesData.sportsFrame.contentDocument
  );
  if (!marketsContainer) {
    throw new JsFailError('Маркеты не загрузились');
  } else {
    log('Есть маркеты');
  }
};

export default preOpenBet;
