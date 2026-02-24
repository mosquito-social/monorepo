import { getAllContent } from '../../utils/content';

export function GET() {
  const content = getAllContent();
  return new Response(JSON.stringify(content), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
