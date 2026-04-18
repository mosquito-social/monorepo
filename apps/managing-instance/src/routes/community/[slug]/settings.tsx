import { useParams } from '@solidjs/router';
import { Show, createMemo } from 'solid-js';
import { Button } from 'mosquito-design-system';
import { MOCK_COMMUNITIES } from '../../../mocks/communities';
import { CommunityCreateForm } from '../../../components/community-create-form';

export default function CommunitySettingsPage() {
  const params = useParams<{ slug: string }>();

  const community = createMemo(() =>
    MOCK_COMMUNITIES.find((c) => c.slug === params.slug) ?? null
  );

  return (
    <Show
      when={community()}
      fallback={
        <div class="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
          <div class="text-5xl font-black font-fam-msq text-col-fg-weak">404</div>
          <h1 class="text-fs-6 font-fam-msq font-bold text-col-fg-strong">Community not found</h1>
          <p class="text-fs-3 text-col-fg-soft max-w-sm">
            We couldn't find a community at this address.
          </p>
          <Button href="/" variant="secondary">
            Back to Homepage
          </Button>
        </div>
      }
    >
      {(c) => (
        <main>
          <CommunityCreateForm
            initialData={{
              name: c().name,
              description: c().description,
              communityType: c().type,
              themeStyle: c().theme.style,
              primaryHue: c().theme.primaryHue,
              font: c().theme.font,
              density: c().theme.spacing,
            }}
            heading="Community Settings"
            subheading="Update your community details and appearance."
            submitLabel="Save Settings"
            backHref={`/community/${c().slug}`}
            backLabel={`Back to ${c().name}`}
          />
        </main>
      )}
    </Show>
  );
}
