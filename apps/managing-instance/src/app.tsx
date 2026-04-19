import './app.css';
import { type RouteSectionProps, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { Header } from './components/header';

function RootLayout(props: RouteSectionProps) {
  return (
    <>
      <Header />
      <Suspense>{props.children}</Suspense>
    </>
  );
}

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
