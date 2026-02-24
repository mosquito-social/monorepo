import fs from 'node:fs/promises';
import path from 'node:path';
import { APIEvent } from '@solidjs/start/server';
import { parse } from 'hast-mds';

export async function GET({ params }: APIEvent) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const ast = parse(content);
    return Response.json(ast);
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
