import { log } from '@kot-shrodingera-team/germes-utils';

const getReactInstance = (element: Element): unknown => {
  if (element) {
    return (element as unknown as Record<string, unknown>)[
      Object.keys(element).find((key) => key.startsWith('__reactFiber'))
    ];
  }
  return null;
};

const findButton = async (betId: string): Promise<HTMLElement> => {
  const allButtons = [
    ...window.germesData.sportsFrame.contentDocument.querySelectorAll<HTMLElement>(
      '.OddsButton'
    ),
  ];

  log(`Появилось ${allButtons.length} кнопок `, 'orange');

  const targetButton = allButtons.find((button) => {
    const buttonReactInstance = getReactInstance(
      button
    ) as OddButtonReactInstance;

    if (
      !buttonReactInstance ||
      !buttonReactInstance.pendingProps ||
      !buttonReactInstance.pendingProps['data-ubt-label']
    ) {
      return null;
    }
    log(`${buttonReactInstance.pendingProps['data-ubt-label']}`, 'orange');
    return buttonReactInstance.pendingProps['data-ubt-label'] === betId;
  });

  return targetButton;
};

export default findButton;
