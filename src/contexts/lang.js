import {createContext} from 'react';

const LangContext = createContext({});

export const LangProvider = LangContext.Provider;
export const LangConsumer = LangContext.Consumer;
