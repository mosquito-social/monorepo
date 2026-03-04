import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import { Layout } from './components/Layout';
import './app.css';
import { MetaProvider } from '@solidjs/meta';

export default function App() {
  return (
    <MetaProvider>
      <Router
        root={(props) => (
          <Layout>
            <Suspense>{props.children}</Suspense>
          </Layout>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
