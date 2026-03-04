import { HastParseResult } from 'hast-mds';

export interface Metadata {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
}

export type ContentEntry = HastParseResult<Metadata, {}>;
