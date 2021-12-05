import { log } from '@kot-shrodingera-team/germes-utils';
import {
  JsFailError,
  NewUrlError,
} from '@kot-shrodingera-team/germes-utils/errors';

const openEvent = async (): Promise<void> => {
  /* ======================================================================== */
  /*             Если не было попытки перехода на страницу события            */
  /* ======================================================================== */
  const newEventUrl = worker.EventUrl.replace(
    `${worker.BookmakerMainUrl}en`,
    '//sports2.shangrilalive.com/ru'
  );
  // if (
  //   worker.GetSessionData(
  //     `${window.germesData.bookmakerName}.TransitionToEventPage`
  //   ) === '0'
  // ) {
  // if (frameHref === worker.EventUrl) {
  //   log('Уже открыто нужное событие', 'steelblue');
  //   return;
  // }
  // log(`${frameHref} !== ${worker.EventUrl}`, 'white', true);
  // worker.SetSessionData(
  //   `${window.germesData.bookmakerName}.TransitionToEventPage`,
  //   '1'
  // );
  // throw new NewUrlError('Переходим на событие');
  // }
  // log(`NEW EVENT URL ${newEventUrl}`);
  window.germesData.sportsFrame.src = newEventUrl;
  log('Переходим на событие');
  // log(`frameHref ${window.germesData.sportsFrame.src} `);

  /* ======================================================================== */
  /*              Если была попытка перехода на страницу события              */
  /* ======================================================================== */

  // if (frameHref === newEventUrl) {
  //   log('Открыли нужное событие', 'steelblue');
  //   return;
  // }
  // log(`${frameHref} !== ${newEventUrl}`, 'crimson');
  // throw new JsFailError('Не удалось перейти на нужное событие');
};

export default openEvent;
