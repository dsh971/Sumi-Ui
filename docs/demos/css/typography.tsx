"use client";

// Shipped CSS classes only (no Tailwind utilities): the docs app doesn't load
// @sumiui/react/theme.css, so this renders exactly as it would in an app that
// imports just @sumiui/react/styles. `not-prose` keeps the docs' own article
// typography from restyling the specimen.
export default function CssTypography() {
  return (
    <div className="not-prose" style={{ display: "grid", gap: "var(--space-6)" }}>
      <div>
        <div className="eyebrow">Issue twelve · Spring</div>
        <h1 className="display">
          A <span className="ink-em">quiet</span> place to write.
        </h1>
        <hr className="brush-rule" />
        <p className="lead">Essays and notes on craft, restraint and the long arc of practice.</p>
      </div>

      <div style={{ display: "grid", gap: "var(--space-2)" }}>
        <div className="h3">Heading three — Song display face</div>
        <div className="h4">Heading four — Inter semibold</div>
        <p>
          Body copy sits at 15px on a 1.55 line height. Inline <code>code</code> and <kbd>⌘K</kbd>{" "}
          share the mono face on a sunken wash.
        </p>
        <p className="small">Small text for secondary detail.</p>
        <p className="caption">Caption · 12px · muted ink</p>
      </div>

      <blockquote className="quote">
        The brush does not hurry, and neither does the reader.
      </blockquote>
    </div>
  );
}

export const code = `// Import once at the app root: import "@sumiui/react/styles";
<div>
  <div className="eyebrow">Issue twelve · Spring</div>
  <h1 className="display">
    A <span className="ink-em">quiet</span> place to write.
  </h1>
  <hr className="brush-rule" />
  <p className="lead">Essays and notes on craft, restraint and the long arc of practice.</p>
</div>

<div className="h3">Heading three — Song display face</div>
<div className="h4">Heading four — Inter semibold</div>
<p>Body copy … inline <code>code</code> and <kbd>⌘K</kbd>.</p>
<p className="small">Small text for secondary detail.</p>
<p className="caption">Caption · 12px · muted ink</p>

<blockquote className="quote">
  The brush does not hurry, and neither does the reader.
</blockquote>`;
