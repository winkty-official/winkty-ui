import { createContext, useContext, useState, useCallback } from 'react';

interface DirectoryConfig {
  selectable?: boolean;
  multiSelect?: boolean;
  showIcons?: boolean;
}

interface DirectoryContextType {
  expandedIds: Set<string>;
  selectedIds: Set<string>;
  config: DirectoryConfig;
  toggleExpand: (id: string) => void;
  isExpanded: (id: string) => boolean;
  toggleSelect: (id: string) => void;
  isSelected: (id: string) => boolean;
}

const DirectoryContext = createContext<DirectoryContextType | undefined>(undefined);

interface DirectoryProviderProps {
  children: React.ReactNode;
  config?: DirectoryConfig;
}

export function DirectoryProvider({ children, config }: DirectoryProviderProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const defaultConfig: DirectoryConfig = {
    selectable: false,
    multiSelect: false,
    showIcons: true,
    ...config
  };

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (!defaultConfig.multiSelect) {
        next.clear();
      }
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, [defaultConfig.multiSelect]);

  const isExpanded = useCallback((id: string) => {
    return expandedIds.has(id);
  }, [expandedIds]);

  const isSelected = useCallback((id: string) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  return (
    <DirectoryContext.Provider 
      value={{ 
        expandedIds, 
        selectedIds,
        config: defaultConfig, 
        toggleExpand, 
        isExpanded,
        toggleSelect,
        isSelected
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
}

export const useDirectory = () => {
  const context = useContext(DirectoryContext);
  if (!context) throw new Error('useDirectory must be used within DirectoryProvider');
  return context;
};
