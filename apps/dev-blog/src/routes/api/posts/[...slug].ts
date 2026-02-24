import { APIEvent } from '@solidjs/start/server';
import { parse } from 'hast-mds';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET({ params }: APIEvent) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const ast = parse(content);
    return Response.json(ast);
  } catch (e) {
    return new Response('Not found', { status: 404 });
  }
}
