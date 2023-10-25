import {useContext} from 'react';
import { LoggedUserContext } from '../contexts';

export const useLoggedUser = () => {
    const context = useContext(LoggedUserContext);
    return context;
};