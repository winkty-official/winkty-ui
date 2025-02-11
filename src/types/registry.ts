export interface RegistryType {
  name: string;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: {
    type: string;
    path: string;
    content: string;
    target: string;
  }[];
  styles?: {
    name: string;
    type: string;
    content: string;
    target: string;
  }[];
  author?: string;
  title?: string;
  description?: string;
  featiures?: string[];
  version?: string;
  license?: string;
}
