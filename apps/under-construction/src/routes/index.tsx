import { For } from 'solid-js';
import { Button } from 'mosquito-design-system/Button';
import { Tag } from 'mosquito-design-system/Tag';
import { SectionWrapper } from 'mosquito-design-system/SectionWrapper';
import { SiteHeader } from '~/components/site-header';
import { Carousel } from '~/components/carousel';
import { UseCaseCard } from '~/components/use-case-card';
import { FeatureTile } from '~/components/feature-tile';
import { RoadmapStep } from '~/components/roadmap-step';
import { ContributorCard } from '~/components/contributor-card';
import { CtaCard } from '~/components/cta-card';
import { useT } from '~/i18n/index';

// ─── Inline SVG icons ────────────────────────────────────────────────────────

function IconLock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconBroken() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconFork() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="6" cy="18" r="3" /><circle cx="18" cy="18" r="3" /><circle cx="12" cy="6" r="3" />
      <path d="M12 9v3m0 0l-3.464 2M12 12l3.464 2M6 15V9" />
    </svg>
  );
}

function IconNodes() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
      <line x1="12" y1="8" x2="5" y2="16" /><line x1="12" y1="8" x2="19" y2="16" /><line x1="5" y1="19" x2="19" y2="19" />
    </svg>
  );
}

function IconKey() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function IconButterfly() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12C12 12 8 4 3 5c-3 .5-3 4-1 6s5 2 7 1" />
      <path d="M12 12C12 12 16 4 21 5c3 .5 3 4 1 6s-5 2-7 1" />
      <path d="M12 12v6" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconMove() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="5 9 2 12 5 15" /><polyline points="19 9 22 12 19 15" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

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
    'card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7',
  ] as const;

  const conceptKeys = [
    { key: 'concept1', icon: <IconFork /> },
    { key: 'concept2', icon: <IconNodes /> },
    { key: 'concept3', icon: <IconKey /> },
    { key: 'concept4', icon: <IconButterfly /> },
    { key: 'concept5', icon: <IconChat /> },
    { key: 'concept6', icon: <IconMove /> },
  ] as const;

  const featureKeys = [
    'feature1', 'feature2', 'feature3', 'feature4',
    'feature5', 'feature6', 'feature7', 'feature8',
  ] as const;

  const roadmapSteps: Array<{ key: string; current?: boolean }> = [
    { key: 'step1', current: true },
    { key: 'step2' },
    { key: 'step3' },
    { key: 'step4' },
    { key: 'step5' },
  ];

  const contributors = [
    { name: 'Matthias Reis', role: 'Founder & Design', initials: 'MR' },
  ];

  return (
    <div class="font-fam-main bg-col-bg text-col-text min-h-screen">
      <SiteHeader />

      <main>
        {/* ── 1: Hero ─────────────────────────────────────────────────── */}
        <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-col-bg">
          {/* Image placeholder — warm gradient right side */}
          <div
            class="absolute right-0 top-0 w-full md:w-3/5 h-full hidden md:block"
            style="background: linear-gradient(135deg, oklch(78% 0.14 52) 0%, oklch(68% 0.16 28) 50%, oklch(55% 0.18 10) 100%)"
            aria-hidden="true"
          />
          {/* Gradient fade to background */}
          <div class="absolute inset-0 bg-gradient-to-r from-col-bg via-col-bg/95 md:via-col-bg/80 to-col-bg/10" />

          <div class="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
            <div class="max-w-xl flex flex-col gap-7">
              {/* Tags */}
              <div class="flex flex-wrap gap-2">
                <Tag>{t('hero.tagOpenSource')}</Tag>
                <Tag>{t('hero.tagFederated')}</Tag>
                <Tag>{t('hero.tagPersonal')}</Tag>
              </div>

              {/* Headline */}
              <h1 class="text-5xl md:text-7xl font-fam-msq font-black text-col-text leading-[0.92]">
                {t('hero.headline')}
              </h1>

              {/* Subline */}
              <p class="text-xl text-col-text-muted leading-relaxed">
                {t('hero.sub')}
              </p>

              {/* CTAs */}
              <div class="flex flex-wrap gap-4">
                <Button size="lg">{t('hero.ctaPrimary')}</Button>
                <Button size="lg" variant="ghost">
                  {t('hero.ctaSecondary')} →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2: Problem ──────────────────────────────────────────────── */}
        <SectionWrapper bg="surface">
          <p class="text-xs font-semibold uppercase tracking-widest text-col-tag-text mb-4 font-fam-msq">
            {t('problem.label')}
          </p>
          <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text mb-4 max-w-2xl">
            {t('problem.headline')}
          </h2>
          <p class="text-col-text-muted leading-relaxed max-w-2xl mb-12">
            {t('problem.intro')}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <For each={[
              { icon: <IconLock />, text: t('problem.bullet1') },
              { icon: <IconBroken />, text: t('problem.bullet2') },
              { icon: <IconEye />, text: t('problem.bullet3') },
            ]}>
              {(item) => (
                <div class="flex flex-col gap-4">
                  <div class="w-10 h-10 text-col-text-subtle">{item.icon}</div>
                  <p class="text-col-text-muted leading-relaxed">{item.text}</p>
                </div>
              )}
            </For>
          </div>
        </SectionWrapper>

        {/* ── 3: Solution ─────────────────────────────────────────────── */}
        <SectionWrapper>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="flex flex-col gap-6">
              <p class="text-xs font-semibold uppercase tracking-widest text-col-tag-text font-fam-msq">
                {t('solution.label')}
              </p>
              <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text leading-tight">
                {t('solution.headline')}
              </h2>
              <p class="text-col-text-muted leading-relaxed">{t('solution.body')}</p>
              <div class="flex flex-wrap gap-3">
                <For each={['tile1', 'tile2', 'tile3', 'tile4', 'tile5'] as const}>
                  {(key) => (
                    <Tag variant="default">{t(`solution.${key}`)}</Tag>
                  )}
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
        <section class="w-full py-16 md:py-24 bg-col-surface overflow-hidden">
          <div class="max-w-6xl mx-auto px-6 mb-10">
            <p class="text-xs font-semibold uppercase tracking-widest text-col-tag-text mb-4 font-fam-msq">
              {t('useCases.label')}
            </p>
            <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text mb-3">
              {t('useCases.headline')}
            </h2>
            <p class="text-col-text-muted">{t('useCases.sub')}</p>
          </div>
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
        <SectionWrapper bg="default">
          <p class="text-xs font-semibold uppercase tracking-widest text-col-tag-text mb-4 font-fam-msq">
            {t('howItWorks.label')}
          </p>
          <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text mb-12">
            {t('howItWorks.headline')}
          </h2>

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
          <div class="border-t border-col-border pt-12">
            <h3 class="text-xl font-fam-msq font-bold text-col-text mb-6">
              {t('howItWorks.featuresHeadline')}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <For each={featureKeys}>
                {(key) => (
                  <div class="flex items-start gap-3 text-col-text-muted">
                    <span class="text-col-accent mt-0.5 shrink-0">✓</span>
                    <span class="text-sm">{t(`howItWorks.${key}`)}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </SectionWrapper>

        {/* ── 6: CTA ──────────────────────────────────────────────────── */}
        <SectionWrapper bg="surface">
          <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text mb-12 text-center">
            {t('cta.headline')}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CtaCard
              title={t('cta.card1Title')}
              body={t('cta.card1Body')}
              cta={t('cta.card1Cta')}
              icon={<IconStar />}
            />
            <CtaCard
              title={t('cta.card2Title')}
              body={t('cta.card2Body')}
              cta={t('cta.card2Cta')}
              icon={<IconNodes />}
              variant="accent"
            />
            <CtaCard
              title={t('cta.card3Title')}
              body={t('cta.card3Body')}
              cta={t('cta.card3Cta')}
              icon={<IconUsers />}
            />
          </div>
        </SectionWrapper>

        {/* ── 7: Roadmap ──────────────────────────────────────────────── */}
        <SectionWrapper>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-col-tag-text mb-4 font-fam-msq">
                {t('roadmap.label')}
              </p>
              <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text">
                {t('roadmap.headline')}
              </h2>
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
                    currentLabel={item.current ? t('roadmap.currentLabel') : undefined}
                  />
                )}
              </For>
            </div>
          </div>
        </SectionWrapper>

        {/* ── 8: Contributors ─────────────────────────────────────────── */}
        <SectionWrapper bg="surface">
          <p class="text-xs font-semibold uppercase tracking-widest text-col-tag-text mb-4 font-fam-msq">
            {t('contributors.label')}
          </p>
          <h2 class="text-3xl md:text-4xl font-fam-msq font-black text-col-text mb-12">
            {t('contributors.headline')}
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
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
          <p class="text-col-text-muted">{t('contributors.joinCta')}</p>
        </SectionWrapper>

        {/* ── 9: Contact ──────────────────────────────────────────────── */}
        <section class="w-full py-16 md:py-24 bg-col-text text-col-bg">
          <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div class="flex flex-col gap-3">
                <h2 class="text-3xl md:text-4xl font-fam-msq font-black">
                  {t('contact.headline')}
                </h2>
                <p class="text-col-bg/70 leading-relaxed">{t('contact.tagline')}</p>
              </div>
              <div class="flex flex-wrap gap-4">
                <a
                  href="https://bsky.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-col-bg/30 text-col-bg hover:bg-col-bg/10 transition-colors text-sm font-semibold"
                >
                  {t('contact.bluesky')}
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-col-bg/30 text-col-bg hover:bg-col-bg/10 transition-colors text-sm font-semibold"
                >
                  {t('contact.linkedin')}
                </a>
                <a
                  href="mailto:hello@mosquito.social"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-col-bg text-col-text hover:bg-col-bg/90 transition-colors text-sm font-semibold"
                >
                  {t('contact.email')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
