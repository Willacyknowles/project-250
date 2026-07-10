import type { Route } from "next";
import Link from "next/link";

type MuseumButtonProps = {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  disabledLabel?: string;
  href?: Route;
  type?: "button" | "submit" | "reset";
};

const baseClassName =
  "inline-flex min-h-11 items-center justify-center gap-3 rounded-sm border px-5 py-3 text-sm font-bold text-left uppercase transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brass/40 focus-visible:ring-offset-2 focus-visible:ring-offset-parchment sm:min-h-12";

const enabledClassName =
  "border-brass/80 bg-walnut text-cream shadow-[0_14px_34px_rgb(36_23_16_/_0.22)] hover:-translate-y-0.5 hover:border-brass hover:bg-[#3a261b] hover:shadow-[0_18px_42px_rgb(36_23_16_/_0.28)] active:translate-y-0 active:border-brass/70 active:bg-[#1d120d] active:shadow-[0_8px_18px_rgb(36_23_16_/_0.2)]";

const disabledClassName =
  "cursor-not-allowed border-border bg-muted/15 text-muted shadow-none";

function MuseumButtonContent({
  children,
  disabled,
  disabledLabel,
}: {
  children: React.ReactNode;
  disabled: boolean;
  disabledLabel: string;
}) {
  return (
    <>
      <span>{children}</span>
      {disabled ? (
        <span className="border-l border-border pl-3 text-xs text-muted">
          {disabledLabel}
        </span>
      ) : null}
      <span aria-hidden="true" className="text-brass transition group-hover:translate-x-0.5">
        -&gt;
      </span>
    </>
  );
}

export function MuseumButton({
  ariaLabel,
  children,
  className = "",
  disabled = false,
  disabledLabel = "Unavailable",
  href,
  type = "button",
}: MuseumButtonProps) {
  const classNames = `${baseClassName} ${
    disabled ? disabledClassName : enabledClassName
  } group ${className}`;

  if (href && !disabled) {
    return (
      <Link aria-label={ariaLabel} className={classNames} href={href}>
        <MuseumButtonContent disabled={disabled} disabledLabel={disabledLabel}>{children}</MuseumButtonContent>
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span aria-disabled="true" aria-label={ariaLabel} className={classNames}>
        <MuseumButtonContent disabled={disabled} disabledLabel={disabledLabel}>{children}</MuseumButtonContent>
      </span>
    );
  }

  return (
    <button aria-label={ariaLabel} className={classNames} disabled={disabled} type={type}>
      <MuseumButtonContent disabled={disabled} disabledLabel={disabledLabel}>{children}</MuseumButtonContent>
    </button>
  );
}