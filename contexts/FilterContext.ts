import { createContext } from 'react';


type Filter = {
    categories: Set<string>,
    showSolved: boolean,
}

export const defaultFilter: Filter = {
    categories: new Set(),
    showSolved: false
}

type FilterContext = {
    filter: Filter,
    setFilter: (f: Filter) => void
}
const FilterContext = createContext<FilterContext>({
    filter: defaultFilter,
    setFilter: () => {}
});
export default FilterContext;
