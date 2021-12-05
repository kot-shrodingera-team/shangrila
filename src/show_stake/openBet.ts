import {
  getElement,
  log,
  repeatingOpenBet,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import findButton from '../helpers/findButton';
import getStakeCount from '../stake_info/getStakeCount';
import clearCoupon from './clearCoupon';

const openBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                              Очистка купона                              */
  /* ======================================================================== */
  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }

  /* ======================================================================== */
  /*                      Формирование данных для поиска                      */
  /* ======================================================================== */

  const { bet_id: betId } = JSON.parse(worker.BetId);
  const betSelector = `[data-ubt-label="${betId}"]`;
  log(`${betSelector}`, 'white', true);
  /* ======================================================================== */
  /*                               Поиск ставки                               */
  /* ======================================================================== */

  const bet = await getElement<HTMLElement>(
    betSelector,
    5000,
    window.germesData.sportsFrame.contentDocument
  );
  // const bet = await findButton(betId);

  if (bet && bet.classList.value.match('OddsButton--Suspended')) {
    throw new JsFailError('Кнопка ставки заблокирована');
  } else if (!bet) {
    throw new JsFailError('Ставка не найдена');
  }

  /* ======================================================================== */
  /*           Открытие ставки, проверка, что ставка попала в купон           */
  /* ======================================================================== */

  const openingAction = async () => {
    bet.click();
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  /* ======================================================================== */
  /*                    Вывод информации об открытой ставке                   */
  /* ======================================================================== */

  const eventNameSelector = '.BetslipSelectionDetails__MatchNameWrapper';
  const marketNameSelector = '.BetslipSelectionDetails__EventPart';
  const betNameSelector = '.BetslipSelectionDetails__OutcomeName';

  const eventNameElement =
    window.germesData.sportsFrame.contentDocument.querySelector(
      eventNameSelector
    );
  const marketNameElement =
    window.germesData.sportsFrame.contentDocument.querySelector(
      marketNameSelector
    );
  const betNameElement =
    window.germesData.sportsFrame.contentDocument.querySelector(
      betNameSelector
    );

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!marketNameElement) {
    throw new JsFailError('Не найден маркет открытой ставки');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = text(eventNameElement);
  const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  log(`Открыта ставка\n${eventName}\n${marketName}\n${betName}`, 'steelblue');
};

export default openBet;
