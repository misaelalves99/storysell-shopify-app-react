import React, { useState, useEffect } from 'react';
import { CollectionContext, CollectionContextType, CollectionType } from './CollectionContext';
import { getCollections } from '../../api/collection.api';

type Props = { children: React.ReactNode };

export const CollectionProvider: React.FC<Props> = ({ children }) => {
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const fetchCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCollections(); }, []);

  const contextValue: CollectionContextType = { collections, fetchCollections };

  return <CollectionContext.Provider value={contextValue}>{children}</CollectionContext.Provider>;
};
