import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <main class="min-h-screen bg-white font-custom text-dark p-xl">
      <Title>Rebuild</Title>
      <h1 class="text-4xl mb-lg">Rebuild</h1>
      <p class="text-lg text-darker">Platform is running.</p>
      <div class="mt-xl flex gap-sm">
        <span class="inline-block w-lg h-lg bg-red rounded-sm" />
        <span class="inline-block w-lg h-lg bg-blue rounded-sm" />
        <span class="inline-block w-lg h-lg bg-green rounded-sm" />
        <span class="inline-block w-lg h-lg bg-blush rounded-sm" />
        <span class="inline-block w-lg h-lg bg-blonde rounded-sm" />
        <span class="inline-block w-lg h-lg bg-orange rounded-sm" />
        <span class="inline-block w-lg h-lg bg-dark rounded-sm" />
      </div>
    </main>
  );
}
