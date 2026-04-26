"use client";

import type { BundledLanguage } from "shiki/bundle/web";
import { useEffect, useMemo, useState } from "react";

const SHIKI_THEME = "vesper" as const;

export function ShikiCodeView({
  code,
  lang,
  className,
  lineNumbers = true
}: {
  code: string;
  lang: BundledLanguage;
  className?: string;
  /** Gutter with 1-based line indices (off for one-line install snippets, etc.). */
  lineNumbers?: boolean;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const lines = useMemo(() => code.split("\n"), [code]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { codeToHtml } = await import("shiki/bundle/web");
      const next = await codeToHtml(code, {
        lang,
        theme: SHIKI_THEME
      });
      if (!cancelled) {
        setHtml(next);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div
      className={[
        lineNumbers
          ? "grid min-h-0 min-w-0 grid-cols-[minmax(2.25rem,auto)_minmax(0,1fr)] gap-x-0"
          : "min-h-0 min-w-0",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={html ? undefined : true}
    >
      {lineNumbers ? (
        <div
          className="select-none py-0 pr-2.5 font-mono text-[12px] text-zinc-600 tabular-nums"
          aria-hidden
        >
          {lines.map((_, i) => (
            <div
              key={i}
              className="flex min-h-lh items-center justify-end text-right leading-relaxed"
            >
              {i + 1}
            </div>
          ))}
        </div>
      ) : null}
      <div className="min-h-0 min-w-0 py-0">
        {html ? (
          <div
            className={[
              "shiki-embed min-w-0 [&_code]:block [&_code]:whitespace-normal [&_pre]:m-0 [&_pre]:min-h-0 [&_pre]:bg-transparent [&_pre]:p-0 [&_pre]:font-mono [&_pre]:text-[12px] [&_pre]:leading-relaxed [&_pre]:whitespace-normal [&_span.line]:block [&_span.line]:min-h-lh [&_span.line]:whitespace-pre [&_span.line]:leading-relaxed"
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="m-0 bg-transparent p-0 font-mono text-[12px] leading-relaxed text-zinc-500 whitespace-pre">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}
