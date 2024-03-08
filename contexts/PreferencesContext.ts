import {createContext} from 'react';


type Preferences = {
    grid: boolean,
}

export const defaultPreferences: Preferences = {
    grid: false
}

type PreferencesContext = {
    preferences: Preferences,
    setPreferences: (f: Preferences) => void
}
const PreferencesContext = createContext<PreferencesContext>({
    preferences: defaultPreferences,
    setPreferences: () => {}
});
export default PreferencesContext;
