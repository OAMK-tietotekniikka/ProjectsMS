import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext } from 'react';
const LangContext = createContext(null);
const LangContextProvider = (props) => {
    const [language, setLanguage] = useState('FI');
    return (_jsx(LangContext.Provider, { value: { language, setLanguage }, children: props.children }));
};
export const useLangContext = () => {
    const context = useContext(LangContext);
    if (context === undefined) {
        throw new Error('useLangContext must be used within a LangContextProvider');
    }
    return context;
};
export default LangContextProvider;
