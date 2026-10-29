import type { ReactNode } from "react";
import { clsx } from "clsx";

export const controlClass =
  "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base text-ink outline-none transition-colors focus-visible:border-primary disabled:cursor-not-allowed disabled:bg-paper disabled:text-muted";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={clsx("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-medium leading-snug">{label}</span>
      {children}
      {hint ? <span className="text-xs leading-relaxed text-muted">{hint}</span> : null}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  className,
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  className?: string;
  placeholder?: string;
  inputMode?: "text" | "tel" | "numeric" | "decimal";
  autoComplete?: string;
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      <input
        className={controlClass}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

export function NumField({
  label,
  value,
  onChange,
  hint,
  className,
  disabled,
  suffix,
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  hint?: string;
  className?: string;
  disabled?: boolean;
  suffix?: string;
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      <span className="relative block">
        <input
          className={clsx(controlClass, suffix && "pr-14")}
          inputMode="decimal"
          disabled={disabled}
          value={value ?? ""}
          onChange={(event) => {
            const raw = event.target.value.replace(/,/g, "").trim();
            if (!raw) {
              onChange(null);
              return;
            }
            const next = Number(raw);
            if (Number.isFinite(next)) onChange(next);
          }}
        />
        {suffix ? (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted">
            {suffix}
          </span>
        ) : null}
      </span>
    </Field>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "ይምረጡ",
  hint,
  className,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  hint?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Field label={label} hint={hint} className={className}>
      <select
        className={controlClass}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Btn({
  children,
  onClick,
  type = "button",
  tone = "line",
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "primary" | "line" | "ghost" | "accent";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        tone === "primary" && "bg-primary text-primary-fg hover:bg-primary/90",
        tone === "line" && "border border-line bg-surface text-ink hover:bg-paper",
        tone === "ghost" && "text-ink hover:bg-ink/5",
        tone === "accent" && "bg-accent text-accent-fg hover:bg-accent/90",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("rounded-xl border border-line bg-surface p-4 sm:p-5", className)}>
      {title ? (
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="font-serif text-lg leading-snug">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Note({
  tone = "plain",
  children,
}: {
  tone?: "plain" | "good" | "bad";
  children: ReactNode;
}) {
  return (
    <p
      className={clsx(
        "rounded-lg px-3 py-2 text-sm leading-relaxed",
        tone === "plain" && "bg-paper text-ink",
        tone === "good" && "bg-primary/10 text-primary",
        tone === "bad" && "bg-accent/10 text-accent",
      )}
    >
      {children}
    </p>
  );
}
