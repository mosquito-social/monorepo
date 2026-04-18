import { For } from "solid-js";
import { Button, Heading, SectionWrapper } from "mosquito-design-system";
import { MOCK_COMMUNITIES } from "../mocks";

function CommunityCard(props: {
  community: (typeof MOCK_COMMUNITIES)[number];
}) {
  const c = props.community;
  return (
    <a
      href={`/community/${c.slug}`}
      class="group flex flex-col rounded-2xl overflow-hidden bg-col-bg border border-col-line hover:border-col-accent transition-colors no-underline"
    >
      <div class="relative h-36 overflow-hidden">
        <img
          src={c.bgImageUrl}
          alt=""
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <img
          src={c.logoUrl}
          alt={c.name}
          class="absolute bottom-3 left-4 w-12 h-16 rounded-lg bg-white/90 object-contain p-1.5 shadow-sm"
        />
      </div>

      <div class="flex flex-col gap-1 p-4 flex-1">
        <h3 class="text-fs-4 font-fam-msq font-bold text-col-fg-strong leading-tight">
          {c.name}
        </h3>
        <p class="text-fs-2 text-col-fg-soft line-clamp-2 flex-1">
          {c.description}
        </p>
        <p class="text-fs-1 text-col-fg-weak mt-2 font-medium">
          {c.members.length} {c.members.length === 1 ? "member" : "members"}
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
