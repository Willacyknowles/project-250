import { MuseumButton } from "@/components/museum/museum-button";

export default function NotFound() {
  return (
    <main className="museum-reading-room flex min-h-screen items-center justify-center px-6 text-cream">
      <section className="exhibition-object-wall max-w-lg rounded-sm p-8">
        <p className="text-sm font-semibold uppercase text-brass">404</p>
        <h1 className="mt-3 font-serif text-4xl">Gallery not found</h1>
        <p className="mt-4 text-sm leading-6 text-cream/70">
          This gallery is not open to visitors from the current exhibition path.
        </p>
        <MuseumButton className="mt-6" href="/">Return to the collection</MuseumButton>
      </section>
    </main>
  );
}
