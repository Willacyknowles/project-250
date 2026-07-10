import { MuseumButton } from "@/components/museum/museum-button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-lg rounded-lg border border-border bg-surface p-8">
        <p className="text-sm font-semibold uppercase text-evidence">404</p>
        <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-body">
          This route is not part of the Project 250 foundation yet.
        </p>
        <MuseumButton className="mt-6" href="/">Return home</MuseumButton>
      </section>
    </main>
  );
}
