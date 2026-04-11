import { A as RouterA } from '@solidjs/router';
import { JSX } from 'solid-js';
import { CustomBlockProps } from 'solid-mds';
import { Button } from './button';

export function H1(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      class={`font-fam-msq text-col-fg-strong text-fs-6 mb-6 mt-8 font-black ${props.class || ''}`.trim()}
    />
  );
}

export function H2(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      class={`font-fam-msq text-col-fg-strong text-fs-5 mb-6 mt-8 font-black ${props.class || ''}`.trim()}
    />
  );
}

export function H3(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      class={`text-col-fg-strong text-fs-4 mb-6 mt-8 font-black ${props.class || ''}`.trim()}
    />
  );
}

export function H4(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      {...props}
      class={`text-col-fg-strong text-fs-3 mb-6 mt-8 font-black ${props.class || ''}`.trim()}
    />
  );
}

export function H5(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      {...props}
      class={`text-fs-3 mb-6 mt-8 italic ${props.class || ''}`.trim()}
    />
  );
}

export function H6(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      {...props}
      class={`text-fs-3 text-col-fg-soft font-light mb-2 mt-4 ${props.class || ''}`.trim()}
    />
  );
}

export function Paragraph(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      class={`text-fs-3 mb-4 leading-relaxed ${props.class || ''}`.trim()}
    />
  );
}

export function Ul(props: JSX.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      {...props}
      class={`list-disc list-outside ml-6 mb-4 space-y-2 ${props.class || ''}`.trim()}
    />
  );
}

export function Ol(props: JSX.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      {...props}
      class={`font-sans text-cf-10 list-decimal list-outside ml-6 mb-4 space-y-2 ${props.class || ''}`.trim()}
    />
  );
}

export function Li(props: JSX.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} class={props.class || ''} />;
}

export function Blockquote(props: JSX.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      class={`border-l-4 border-cp-main pl-4 italic text-cf-20 my-6 bg-cb-10 py-2 pr-4 rounded-r-md ${props.class || ''}`.trim()}
    />
  );
}

export function HR(props: JSX.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      {...props}
      class={`border-t border-col-line my-8 ${props.class || ''}`.trim()}
    />
  );
}

export function Img(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      loading="lazy"
      {...props}
      class={`max-w-full rounded-md shadow-sm my-6 ${props.class || ''}`.trim()}
    />
  );
}

export function Strong(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <strong
      {...props}
      class={`font-bold text-cf-0 ${props.class || ''}`.trim()}
    />
  );
}

export function Em(props: JSX.HTMLAttributes<HTMLElement>) {
  return <em {...props} class={`italic ${props.class || ''}`.trim()} />;
}

export function A(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = () =>
    typeof props.href === 'string' && props.href.startsWith('http');
  const baseClass =
    'text-cp-main hover:text-cs-main underline underline-offset-4 decoration-cl-20 hover:decoration-cs-main transition-colors';

  return isExternal() ? (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      class={`${baseClass} ${props.class || ''}`.trim()}
    >
      {props.children}
    </a>
  ) : (
    <RouterA
      {...(props as any)}
      class={`${baseClass} ${props.class || ''}`.trim()}
    >
      {props.children}
    </RouterA>
  );
}

export function CTA({ data }: CustomBlockProps) {
  console.log('cta', data);
  if (!data) {
    console.warn('Cta component: data is missing');
    return null;
  }

  const href = Array.isArray(data.href) ? data.href[0] : data.href;
  const label = Array.isArray(data.label) ? data.label[0] : data.label;

  if (!href || !label) {
    console.warn('Cta component: url or text is missing', { data });
    return null;
  }

  return (
    <div class="my-8">
      <Button variant="primary" size="md" href={href}>
        {label}
      </Button>
    </div>
  );
}

export const canonicalComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: HR,
  img: Img,
  strong: Strong,
  em: Em,
  a: A,
  cta: CTA,
};
