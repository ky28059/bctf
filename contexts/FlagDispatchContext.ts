import { createContext } from 'react';


type FlagDispatchContext = {
    rejectFlag: () => void,
    acceptFlag: () => void,
    dispatchNotif: (m: string, success: boolean) => void
}

const FlagDispatchContext = createContext<FlagDispatchContext>({
    rejectFlag: () => {},
    acceptFlag: () => {},
    dispatchNotif: () => {}
});
export default FlagDispatchContext;
