import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { memo } from "react";
import { useDirectory } from './directory-context';
import { Checkbox } from "@/components/ui/checkbox";

interface FolderWrapperProps {
  id: string;
  name: string;
  children?: React.ReactNode;
}

function FolderWrapper({ id, name, children }: FolderWrapperProps) {
  const { config, isExpanded, toggleExpand, isSelected, toggleSelect } = useDirectory();
  const expanded = isExpanded(id);
  const selected = isSelected(id);

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
        onClick={() => toggleExpand(id)}
      >
        <div className="flex items-center gap-1">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          {config.showIcons && <Folder size={16} className="text-blue-500" />}
        </div>
        {config.selectable && (
          <Checkbox
            checked={selected}
            onCheckedChange={() => toggleSelect(id)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <span>{name}</span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(FolderWrapper);