import '@fontsource/share-tech-mono';
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/dm-serif-display';
import '@fontsource/dm-sans';
import '@fontsource/dm-mono';
import '@fontsource/shippori-mincho/700.css';
import '@fontsource/noto-sans-jp';
import '@fontsource/noto-sans-mono';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/source-sans-3';
import '@fontsource-variable/source-code-pro';
import '@fontsource/syne/700.css';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/commit-mono';
import '@fontsource/bebas-neue';
import '@fontsource/work-sans';
import '@fontsource-variable/bricolage-grotesque';

import { type RouteSectionProps, useParams } from '@solidjs/router';
import { createMemo } from 'solid-js';
import { communityThemeToStyle } from '../../config/theme-utils';
import { MOCK_COMMUNITIES } from '../../mocks/communities';

export default function CommunityLayout(props: RouteSectionProps) {
  const params = useParams<{ slug: string }>();

  const community = createMemo(
    () => MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null,
  );

  const themeStyle = createMemo(() => {
    const c = community();
    if (!c) return {};
    return communityThemeToStyle(c.theme);
  });

  return <div style={themeStyle()}>{props.children}</div>;
}
