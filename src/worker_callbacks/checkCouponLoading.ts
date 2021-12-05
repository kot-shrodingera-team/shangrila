import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  log,
  getElement,
  awaiter,
  getRemainingTimeout,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  text,
  sendTGBotMessage,
} from '@kot-shrodingera-team/germes-utils';
import { StateMachine } from '@kot-shrodingera-team/germes-utils/stateMachine';

const loaderSelector = '.BetslipBet.BetslipBetLoading';
// const errorSelector = '.BetslipFooter__Link--Warning';
const errorSelector =
  '.BetslipFooter__Link--Warning, .BetslipSelection.BetslipSelection--Error, .BetslipSelection.BetslipSelection--Disabled, .BetslipFooter__ErrorMessage';
const betPlacedSelector = '.BetslipBet__BetSuccesMessage';

const asyncCheck = async () => {
  const machine = new StateMachine();

  machine.promises = {
    loader: () =>
      getElement(
        loaderSelector,
        getRemainingTimeout(),
        window.germesData.sportsFrame.contentDocument
      ),
    error: () =>
      getElement(
        errorSelector,
        getRemainingTimeout(),
        window.germesData.sportsFrame.contentDocument
      ),
    betPlaced: () =>
      getElement(
        betPlacedSelector,
        getRemainingTimeout(),
        window.germesData.sportsFrame.contentDocument
      ),
  };

  machine.setStates({
    start: {
      entry: async () => {
        log('Начало обработки ставки', 'steelblue');
      },
    },
    loader: {
      entry: async () => {
        log('Появился индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = 'индикатор';
        delete machine.promises.loader;
        machine.promises.loaderDissappeared = () =>
          awaiter(
            () =>
              window.germesData.sportsFrame.contentDocument.querySelector(
                loaderSelector
              ) === null,
            getRemainingTimeout()
          );
      },
    },
    loaderDissappeared: {
      entry: async () => {
        log('Исчез индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        delete machine.promises.loaderDissappeared;
      },
    },
    error: {
      entry: async () => {
        log('Появилась ошибка', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        const errorText = text(machine.data.result as HTMLElement);
        log(errorText, 'tomato');
        if (/Вы должны войти, чтобы поставить ставку!/i.test(errorText)) {
          log(
            'Вы должны войти, чтобы поставить ставку! Необходимо перезайти в аккаунт БК',
            'tomato'
          );
        }
        worker.Helper.SendInformedMessage(errorText);
        sendTGBotMessage(
          '1786981726:AAE35XkwJRsuReonfh1X2b8E7k9X4vknC_s',
          126302051,
          errorText
        );
        checkCouponLoadingError({});
        machine.end = true;
      },
    },
    betPlaced: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingSuccess('Ставка принята');
        machine.end = true;
      },
    },
    timeout: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingError({
          botMessage: 'Не дождались результата ставки',
          informMessage: 'Не дождались результата ставки',
        });
        machine.end = true;
      },
    },
  });

  machine.start('start');
};

const checkCouponLoading = checkCouponLoadingGenerator({
  asyncCheck,
});

export default checkCouponLoading;
