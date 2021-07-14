import { TOKEN } from '../constants/text';
import { getItemFromLocalStorage } from './localstorage';

export const checkIfAccesstokenIsValid = (): boolean => {
    const tokenObj = JSON.parse(getItemFromLocalStorage(TOKEN) as any);
    
    if (tokenObj) {
        const currentTime = new Date().getTime();

        if (currentTime > tokenObj.expiresIn) {
            return false;
        }
        return true;
    }
    return false;
};