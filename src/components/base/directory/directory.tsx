import { Skeleton } from "@/components/ui/skeleton";
import FileItem from "./file-item";
import FolderWrapper from "./folder-wrapper";

export interface DirectoryProps {
  name: string;
  children?: DirectoryProps[];
  isFile?: boolean;
  isLoading?: boolean;
  onSelect?: (path: string, id: string) => void;
  path: string;
  id: string;
}

export default function Directory({
  name,
  children,
  isFile,
  isLoading,
  onSelect,
  path,
  id,
}: DirectoryProps) {

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-2 py-1">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    );
  }

  if (isFile) {
    return (
      <div className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
        <FileItem
          id="id"
          name={name}
        />
      </div>
    );
  }

  return (
    <FolderWrapper
      id={id}
      name={name}
    >
      {children?.map((item) => (
        <Directory
          key={item.id}
          {...item}
          path={`${path}/${item.name}`}
          onSelect={onSelect}
        />
      ))}
    </FolderWrapper>
  );
}
