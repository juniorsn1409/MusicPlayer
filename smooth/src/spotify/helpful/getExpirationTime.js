import { EXPIRES_IN } from './env-smooth';
import {minutesAndSeconds} from './minutesAndSeconds';

export const getExpirationTime = () => {
     const expiration = localStorage.getItem(EXPIRES_IN);
     console.log(`EXPIRATION -> ${minutesAndSeconds(expiration)}`);
     return expiration;
}