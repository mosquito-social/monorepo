import { A as RouterA } from '@solidjs/router';
import { JSX } from 'solid-js';

export function H1(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      class={`font-mos text-cf-0 text-4xl mb-6 mt-8 ${props.class || ''}`.trim()}
    />
  );
}

export function H2(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      class={`font-mos text-cf-0 text-3xl mb-4 mt-6 ${props.class || ''}`.trim()}
    />
  );
}

export function H3(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      class={`font-mos text-cf-0 text-2xl mb-4 mt-6 ${props.class || ''}`.trim()}
    />
  );
}

export function H4(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      {...props}
      class={`font-serif text-cf-0 text-xl font-bold mb-3 mt-5 ${props.class || ''}`.trim()}
    />
  );
}

export function H5(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      {...props}
      class={`font-serif text-cf-0 text-lg font-bold mb-2 mt-4 ${props.class || ''}`.trim()}
    />
  );
}

export function H6(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      {...props}
      class={`font-serif text-cf-0 text-base font-bold mb-2 mt-4 ${props.class || ''}`.trim()}
    />
  );
}

export function Paragraph(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      class={`font-sans text-cf-10 text-base mb-4 leading-relaxed ${props.class || ''}`.trim()}
    />
  );
}

export function Ul(props: JSX.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      {...props}
      class={`font-sans text-cf-10 list-disc list-outside ml-6 mb-4 space-y-2 ${props.class || ''}`.trim()}
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
      class={`border-t border-cl-20 my-8 ${props.class || ''}`.trim()}
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
};
