import img from '../under-construction.jpg';

export default function Home() {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center p-3 font-sans">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
        <div class="">
          <img src={img} alt="Under Construction" class="w-full h-auto" />
        </div>
        <div class="col-span-2 text-center">
          <h1 class="text-3xl sm:text-5xl font-mos mos-effect mb text-cb-0">
            mosquito.social
          </h1>
          <h2 class="text-2xl mb-8">We're building something new</h2>
          <p class="text-lg text-cf-20 ">
            Our platform is currently under construction. Please check back
            later or checkout our development progress at{' '}
            <a
              href="https://dev.mosquito.social"
              class="text-cp-main underline underline-offset-4 hover:text-cs-main"
            >
              dev.mosquito.social
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
