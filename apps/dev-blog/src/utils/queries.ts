'use server';
import { cache, query } from '@solidjs/router';
import { getAllContent, getAllMetadata } from './content';

export const getDoc = cache(async (id: string) => {
  const path = `/${id}`;
  const content = getAllContent();
  const doc = content[path];
  return doc || null;
}, 'doc');

export const getMetadata = query(async () => {
  const content = getAllMetadata();
  return content;
}, 'metadata');
