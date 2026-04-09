import { JSX } from 'solid-js';

export interface CarouselProps {
  children: JSX.Element;
}

export function Carousel(props: CarouselProps) {
  return (
    <div class="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-6 px-6 md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {props.children}
    </div>
  );
}
