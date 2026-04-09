import { ThemeToggle } from 'mosquito-design-system/ThemeToggle';
import { Button } from 'mosquito-design-system/Button';
import { Logo } from '~/components/Logo';
import { LanguageSwitcher } from '~/components/language-switcher';
import { useT } from '~/i18n/index';

export function SiteHeader() {
  const { t } = useT();

  return (
    <header class="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-col-border bg-col-bg/95 backdrop-blur-sm">
      <div class="flex items-center gap-2 font-fam-msq font-black text-xl text-col-text">
        <Logo class="w-8 h-8 text-col-accent" />
        {t('nav.brand')}
      </div>
      <nav class="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button size="sm">{t('nav.cta')}</Button>
      </nav>
    </header>
  );
}
