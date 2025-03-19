import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

import { boardData } from "../lib/data";

type ContextType = {
    data: any;
    setData: Dispatch<SetStateAction<any>>;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState(boardData);

    return (
        <AppContext.Provider value={{ data, setData }}>
            {children}
        </AppContext.Provider>
    );
};
