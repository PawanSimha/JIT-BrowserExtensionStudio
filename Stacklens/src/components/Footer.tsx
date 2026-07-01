export default function Footer() {
  return (
    <footer className="shrink-0 border-t border-surface-border px-4 py-1.5 flex items-center justify-between">
      <span className="text-2xs text-text-muted font-code">
        StackLens v1.0.0
      </span>
      <span className="text-2xs text-text-muted flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
        Ready
      </span>
    </footer>
  );
}
