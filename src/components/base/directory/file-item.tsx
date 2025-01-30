import { File } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { memo } from "react";
import { useDirectory } from "./directory-context";

interface FileItemProps {
  id: string;
  name: string;
}

function FileItem({ id, name }: FileItemProps) {
  const { config, isSelected, toggleSelect } = useDirectory();
  const selected = isSelected(id);

  return (
    <div className="flex items-center gap-2">
      {config.showIcons && <File size={16} />}
      {config.selectable && (
        <Checkbox
          checked={selected}
          onCheckedChange={() => toggleSelect(id)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      )}
      <span>{name}</span>
    </div>
  );
}

export default memo(FileItem);