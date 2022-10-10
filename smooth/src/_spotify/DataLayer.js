import React, { createContext, useContext, useReducer } from 'react';

export const DataLayerContext = createContext();

export const DataLayer = ({ initialSatate, reducer, children }) => (
     <DataLayerContext.Provider value={useReducer(reducer, initialSatate)}>
          {children}
     </DataLayerContext.Provider>
);

export const useDataLayerValue = () => useContext(DataLayerContext);