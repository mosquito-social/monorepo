import { Button, Heading, SectionWrapper } from 'mosquito-design-system';
import { For } from 'solid-js';
import { CommunityHeader } from '../components/community-header';
import { MOCK_COMMUNITIES } from '../mocks';

function CommunityCard(props: {
  community: (typeof MOCK_COMMUNITIES)[number];
}) {
  const c = props.community;
  return (
    <a
      href={`/community/${c.slug}`}
      class="group flex flex-col rounded-2xl overflow-hidden bg-col-bg border border-col-line hover:border-col-accent transition-colors no-underline"
    >
      <CommunityHeader
        bgImageUrl={c.bgImageUrl}
        logoUrl={c.logoUrl}
        name={c.name}
        description={c.description}
        descriptionClass="line-clamp-2"
      />
      <div class="px-4 pb-4">
        <p class="text-fs-1 text-col-fg-weak font-medium">
          {c.members.length} {c.members.length === 1 ? 'member' : 'members'}
        </p>
      </div>
    </a>
  );
}

export default function HomePage() {
  return (
    <main>
      <SectionWrapper bg="weak">
        <Heading
          level={1}
          super="Community Platform"
          sub="Connect, organize, and grow together — mosquito.social brings communities to life."
        >
          Where communities thrive
        </Heading>

        <div class="flex flex-col sm:flex-row gap-4 mt-10">
          <Button href="/new-community" size="lg">
            Create your own community
          </Button>
          <Button href="#communities" variant="secondary" size="lg">
            Browse communities
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper id="communities">
        <Heading
          level={2}
          sub="Explore active communities and find your people."
        >
          Communities
        </Heading>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <For each={MOCK_COMMUNITIES}>
            {(community) => <CommunityCard community={community} />}
          </For>
        </div>

        <div class="flex justify-center mt-16">
          <Button href="/new-community" size="lg">
            Create your own community
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
