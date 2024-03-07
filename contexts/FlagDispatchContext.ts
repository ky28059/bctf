import {createContext} from 'react';


type FlagDispatchContext = {
    rejectFlag: () => void,
    acceptFlag: () => void
}

const FlagDispatchContext = createContext<FlagDispatchContext>({
    rejectFlag: () => {},
    acceptFlag: () => {}
});
export default FlagDispatchContext;
