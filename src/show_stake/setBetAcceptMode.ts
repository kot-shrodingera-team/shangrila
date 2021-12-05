import { log } from '@kot-shrodingera-team/germes-utils';

export const setBetAcceptMode = async (): Promise<void> => {
  const settings =
    window.germesData.sportsFrame.contentDocument.querySelector<HTMLElement>(
      '.BetslipFooter__Link'
    ) || null;
  if (settings) {
    settings.click();

    const currentOption = [
      ...document.querySelectorAll<HTMLInputElement>('[name="acceptOdds"]'),
    ].find((item) => item.checked);

    // Если выбран режим только с исходным коэффициентом
    if (worker.StakeAcceptRuleShoulder === 0) {
      if (currentOption.defaultValue === 'WITHIN_THRESHOLD') {
        log(
          'Уже выбран режим принятия ставки с исходным коэффициентом',
          'steelblue'
        );
      } else {
        log(
          'Выбираем режим принятия ставки с исходным коэффициентом',
          'orange'
        );
        [...document.querySelectorAll<HTMLInputElement>('[name="acceptOdds"]')]
          .find((item) => item.defaultValue === 'WITHIN_THRESHOLD')
          .click();
      }
    }
    // Если выбран режим с повышением коэффициента
    if (worker.StakeAcceptRuleShoulder === 1) {
      if (currentOption.defaultValue === 'ACCEPT_HIGHER') {
        log(
          'Уже выбран режим принятия ставки с повышением коэффициента',
          'steelblue'
        );
      } else {
        log(
          'Выбираем режим принятия ставки с повышением коэффициента',
          'orange'
        );
        [...document.querySelectorAll<HTMLInputElement>('[name="acceptOdds"]')]
          .find((item) => item.defaultValue === 'ACCEPT_HIGHER')
          .click();
      }
    }

    // Если выбран режим с любым коэффициентом
    if (worker.StakeAcceptRuleShoulder === 2) {
      if (currentOption.defaultValue === 'ACCEPT_ANY') {
        log(
          'Уже выбран режим принятия ставки с любым коэффициентом',
          'steelblue'
        );
      } else {
        log('Выбираем режим принятия ставки с любым коэффициентом', 'orange');
        [...document.querySelectorAll<HTMLInputElement>('[name="acceptOdds"]')]
          .find((item) => item.defaultValue === 'ACCEPT_ANY')
          .click();
      }
    }
  }
};

export default setBetAcceptMode;
