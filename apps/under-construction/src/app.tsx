import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { I18nProvider } from '~/i18n/index';
import './app.css';

export default function App() {
  return (
    <I18nProvider>
      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <FileRoutes />
      </Router>
    </I18nProvider>
  );
}
