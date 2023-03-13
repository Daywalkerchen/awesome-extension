export interface LinkGroup {
  label: string;
  links: Link[];
  linkGroups: LinkGroup[];
  color?: string;
  backgroundColor?: string;
}

export interface Link {
  label: string;
  url: string;
  color?: string;
  backgroundColor?: string;
}
