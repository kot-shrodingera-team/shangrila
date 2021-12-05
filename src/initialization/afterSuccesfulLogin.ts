import { log } from '@kot-shrodingera-team/germes-utils';
import { refreshBalance } from '../stake_info/getBalance';

const afterSuccesfulLogin = async (): Promise<void> => {
  await refreshBalance();
  if (window.location.pathname !== '/sports') {
    document.querySelector<HTMLElement>('a[href="/sports"]').click();
    log('Переходим на страницу c фреймом');
  }
};

export default afterSuccesfulLogin;
