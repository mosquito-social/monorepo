import {
  AtSign,
  Check,
  CircleUserRound,
  Flower,
  GitPullRequest,
  HeartHandshake,
  LockOpen,
  MessagesSquare,
  MoveUpRight,
  SearchX,
  ShieldOff,
  Star,
  Users,
} from 'lucide-solid';
import ArrowRight from 'lucide-solid/icons/arrow-right';
import { Button, Heading, SectionWrapper, Tag } from 'mosquito-design-system';
import { For } from 'solid-js';
import { Carousel } from '~/components/carousel';
import { ContributorCard } from '~/components/contributor-card';
import { CtaCard } from '~/components/cta-card';
import { FeatureTile } from '~/components/feature-tile';
import { RoadmapStep } from '~/components/roadmap-step';
import { SiteHeader } from '~/components/site-header';
import { UseCaseCard } from '~/components/use-case-card';
import { useT } from '~/i18n/index';
import heroImage from '../components/hero.jpg';

// ─── Inline SVG icons ────────────────────────────────────────────────────────

// ─── Use case card data ───────────────────────────────────────────────────────

const cardGradients = [
  'linear-gradient(135deg, oklch(60% 0.12 230), oklch(45% 0.18 250))',
  'linear-gradient(135deg, oklch(75% 0.08 60), oklch(60% 0.14 40))',
  'linear-gradient(135deg, oklch(55% 0.14 310), oklch(45% 0.18 280))',
  'linear-gradient(135deg, oklch(40% 0.20 20), oklch(30% 0.15 350))',
  'linear-gradient(135deg, oklch(70% 0.10 100), oklch(55% 0.14 80))',
  'linear-gradient(135deg, oklch(45% 0.22 25), oklch(35% 0.18 10))',
  'linear-gradient(135deg, oklch(65% 0.09 40), oklch(55% 0.12 20))',
];

// ─── Main page component ──────────────────────────────────────────────────────

export default function Home() {
  const { t } = useT();

  const useCaseKeys = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
    'card6',
    'card7',
  ] as const;

  const conceptKeys = [
    { key: 'concept1', icon: <GitPullRequest size={32} /> },
    { key: 'concept2', icon: <Flower size={32} /> },
    { key: 'concept3', icon: <CircleUserRound size={32} /> },
    { key: 'concept4', icon: <AtSign size={32} /> },
    { key: 'concept5', icon: <MessagesSquare size={32} /> },
    { key: 'concept6', icon: <MoveUpRight size={32} /> },
  ] as const;

  const featureKeys = [
    'feature1',
    'feature2',
    'feature3',
    'feature4',
    'feature5',
    'feature6',
    'feature7',
    'feature8',
  ] as const;

  const roadmapSteps: Array<{ key: string; current?: boolean }> = [
    { key: 'step1', current: true },
    { key: 'step2' },
    { key: 'step3' },
    { key: 'step4' },
    { key: 'step5' },
  ];

  const contributors = [
    { name: 'Irena Makar', role: 'Concept, Coding', initials: 'IM' },
    { name: 'Anne Reis', role: 'Copywriting, Communication', initials: 'AR' },
    { name: 'Silke Voigts', role: 'Design', initials: 'SV' },
    { name: 'Matthias Reis', role: 'Concept, Architecture', initials: 'MR' },
    { name: 'Bernhard Häussner', role: 'Engineering, DevOps', initials: 'BH' },
  ];

  return (
    <div>
      <SiteHeader />

      <main>
        {/* ── 1: Hero ─────────────────────────────────────────────────── */}
        <section class="relative min-h-[70vh] flex items-center overflow-hidden bg-col-bg">
          {/* Image placeholder — warm gradient right side */}
          <img
            src={heroImage}
            alt=""
            class="absolute right-0 top-0 w-full h-full object-cover"
          />
          {/* Gradient fade to background */}
          <div class="absolute inset-0 bg-linear-to-r from-col-bg via-col-bg/95 md:via-col-bg/80 to-col-bg/10" />

          <div class="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
            <div class="max-w-xl flex flex-col gap-7">
              {/* Tags */}
              <div class="flex flex-wrap gap-2">
                <Tag>{t('hero.tagOpenSource')}</Tag>
                <Tag>{t('hero.tagFederated')}</Tag>
                <Tag>{t('hero.tagPersonal')}</Tag>
              </div>

              {/* Headline */}
              <h1 class="text-fs-6 md:text-fs-7 font-fam-msq font-black text-col-fg-strong leading-none">
                {t('hero.headline')}
              </h1>

              {/* Subline */}
              <p class="text-fs-4 text-col-fg-soft">{t('hero.sub')}</p>

              {/* CTAs */}
              <div class="flex flex-wrap gap-4">
                <Button size="lg">{t('hero.ctaPrimary')}</Button>
                <Button size="lg" variant="ghost">
                  {t('hero.ctaSecondary')} <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2: Problem ──────────────────────────────────────────────── */}
        <SectionWrapper bg="weak">
          <Heading
            level={2}
            super={t('problem.label')}
            sub={t('problem.intro')}
          >
            {t('problem.headline')}
          </Heading>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <For
              each={[
                { icon: <SearchX size={40} />, text: t('problem.bullet1') },
                { icon: <LockOpen size={40} />, text: t('problem.bullet2') },
                { icon: <ShieldOff size={40} />, text: t('problem.bullet3') },
              ]}
            >
              {(item) => (
                <div class="flex flex-col gap-4">
                  <div class="text-col-accent">{item.icon}</div>
                  <p class="text-fs-3 text-col-fg-soft leading-relaxed">
                    {item.text}
                  </p>
                </div>
              )}
            </For>
          </div>
        </SectionWrapper>

        {/* ── 3: Solution ─────────────────────────────────────────────── */}
        <SectionWrapper bg="default">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="flex flex-col gap-6">
              <Heading
                level={2}
                super={t('solution.label')}
                sub={t('solution.body')}
              >
                {t('solution.headline')}
              </Heading>
              <div class="flex flex-wrap gap-3">
                <For
                  each={['tile1', 'tile2', 'tile3', 'tile4', 'tile5'] as const}
                >
                  {(key) => <Tag variant="default">{t(`solution.${key}`)}</Tag>}
                </For>
              </div>
            </div>

            {/* Diptych image placeholder */}
            <div class="grid grid-cols-2 gap-3 h-80 md:h-full min-h-[300px]">
              <div
                class="rounded-2xl overflow-hidden"
                style="background: linear-gradient(160deg, oklch(82% 0.08 40), oklch(70% 0.10 25))"
                aria-hidden="true"
              />
              <div
                class="rounded-2xl overflow-hidden"
                style="background: linear-gradient(160deg, oklch(72% 0.12 200), oklch(55% 0.18 210))"
                aria-hidden="true"
              />
            </div>
          </div>
        </SectionWrapper>

        {/* ── 4: Use Cases (Carousel) ──────────────────────────────────── */}
        <section class="w-full py-16 md:py-24 bg-col-bg-soft overflow-hidden">
          <Heading
            class="px-6"
            level={2}
            super={t('useCases.label')}
            sub={t('useCases.sub')}
          >
            {t('useCases.headline')}
          </Heading>

          <Carousel>
            <For each={useCaseKeys}>
              {(key, i) => (
                <UseCaseCard
                  name={t(`useCases.${key}Name`)}
                  description={t(`useCases.${key}Desc`)}
                  gradient={cardGradients[i()] ?? cardGradients[0]}
                />
              )}
            </For>
          </Carousel>
        </section>

        {/* ── 5: How it Works ─────────────────────────────────────────── */}
        <SectionWrapper bg="weak">
          <Heading level={2} super={t('howItWorks.label')}>
            {t('howItWorks.headline')}
          </Heading>

          {/* Concept tiles */}
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            <For each={conceptKeys}>
              {(item) => (
                <FeatureTile
                  icon={item.icon}
                  title={t(`howItWorks.${item.key}Title`)}
                  body={t(`howItWorks.${item.key}Body`)}
                />
              )}
            </For>
          </div>

          {/* Planned features */}
          <div class="border-t border-col-line pt-12">
            <h3 class="text-fs-4 font-bold text-col-fg mb-6">
              {t('howItWorks.featuresHeadline')}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <For each={featureKeys}>
                {(key) => (
                  <div class="flex items-start gap-3 text-col-fg-soft">
                    <span class="text-col-accent shrink-0">
                      <Check />
                    </span>
                    <span class="text-fs-3">{t(`howItWorks.${key}`)}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </SectionWrapper>

        {/* ── 6: CTA ──────────────────────────────────────────────────── */}
        <SectionWrapper bg="strong">
          <Heading level={2}>{t('cta.headline')}</Heading>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CtaCard
              title={t('cta.card1Title')}
              body={t('cta.card1Body')}
              cta={t('cta.card1Cta')}
              icon={<Star />}
            />
            <CtaCard
              title={t('cta.card2Title')}
              body={t('cta.card2Body')}
              cta={t('cta.card2Cta')}
              icon={<HeartHandshake />}
              variant="accent"
            />
            <CtaCard
              title={t('cta.card3Title')}
              body={t('cta.card3Body')}
              cta={t('cta.card3Cta')}
              icon={<Users />}
            />
          </div>
        </SectionWrapper>

        {/* ── 7: Roadmap ──────────────────────────────────────────────── */}
        <SectionWrapper>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <Heading level={2} super={t('roadmap.label')}>
                {t('roadmap.headline')}
              </Heading>
            </div>
            <div>
              <For each={roadmapSteps}>
                {(item, i) => (
                  <RoadmapStep
                    step={i() + 1}
                    title={t(`roadmap.${item.key}Title`)}
                    body={t(`roadmap.${item.key}Body`)}
                    current={item.current ?? false}
                    last={i() === roadmapSteps.length - 1}
                    currentLabel={
                      item.current ? t('roadmap.currentLabel') : undefined
                    }
                  />
                )}
              </For>
            </div>
          </div>
        </SectionWrapper>

        {/* ── 8: Contributors ─────────────────────────────────────────── */}
        <SectionWrapper bg="weak">
          <Heading level={2} super={t('contributors.label')}>
            {t('contributors.headline')}
          </Heading>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <For each={contributors}>
              {(c) => (
                <ContributorCard
                  name={c.name}
                  role={c.role}
                  initials={c.initials}
                />
              )}
            </For>
          </div>
          <p class="text-col-fg-weak">{t('contributors.joinCta')}</p>
        </SectionWrapper>

        {/* ── 9: Contact ──────────────────────────────────────────────── */}
        <SectionWrapper>
          <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div class="flex flex-col gap-3">
                <h2 class="text-3xl md:text-4xl font-fam-msq font-black">
                  {t('contact.headline')}
                </h2>
                <p class="text-col-bg/70 leading-relaxed">
                  {t('contact.tagline')}
                </p>
              </div>
              <div class="flex flex-wrap gap-4">
                <a
                  href="https://bsky.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-col-line bg-col-fg text-col-bg hover:bg-col-bg/50 transition-colors text-sm font-bold"
                >
                  {t('contact.bluesky')}
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-col-line bg-col-fg text-col-bg hover:bg-col-bg/50 transition-colors text-sm font-bold"
                >
                  {t('contact.linkedin')}
                </a>
                <a
                  href="mailto:hello@mosquito.social"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-col-line bg-col-fg text-col-bg hover:bg-col-bg/50 transition-colors text-sm font-bold"
                >
                  {t('contact.email')}
                </a>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </div>
  );
}
