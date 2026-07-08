import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="max-w-lg rounded-lg border border-border bg-surface p-8">
        <p className="text-sm font-semibold uppercase text-evidence">404</p>
        <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
        <p className="mt-4 text-sm leading-6 text-body">
          This route is not part of the Project 250 foundation yet.
        </p>
        <Link
          className="mt-6 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
          href="/"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
