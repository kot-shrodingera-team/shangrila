import { getElement, log, awaiter } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const setFrameReference = async (): Promise<void> => {
  window.germesData.sportsFrame = await getElement<HTMLIFrameElement>(
    'iframe#sportsFrame'
  );

  if (!window.germesData.sportsFrame) {
    throw new JsFailError('Не найден sportsFrame');
  }
  log('Есть rsiframe', 'cadetblue', true);
  if (
    window.germesData.sportsFrame.contentWindow.location.href === 'about:blank'
  ) {
    log('Ждём появления документа sportsFrame', 'steelblue');
    const result = await awaiter(
      () => {
        return (
          window.germesData.sportsFrame.contentWindow.location.href !==
          'about:blank'
        );
      },
      10000,
      50
    );
    if (!result) {
      throw new JsFailError('Не дождались появления документа sportsFrame');
    }
    log('Появился документ rsiframe', 'steelblue');
  } else {
    log('Есть документ rsframe', 'cadetblue', true);
  }

  const document = await awaiter(() => {
    if (
      window.germesData.sportsFrame.contentDocument &&
      window.germesData.sportsFrame.contentDocument.body
    ) {
      return window.germesData.sportsFrame.contentDocument;
    }
    return null;
  });
  if (!document) {
    throw new JsFailError('Документ In-Play фрейма пуст');
  }
};

export default setFrameReference;
