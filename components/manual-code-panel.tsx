"use client";

import {
  TitledCodeCopyCard
} from "@/components/package-manager-install-toolbar";
import { HIDE_CODE_SCROLLBARS } from "@/lib/hide-code-scrollbar-class";
import { useCallback, useState } from "react";
import type { BundledLanguage } from "shiki/bundle/web";

const pathTitleClass =
  "truncate text-left font-mono text-xs font-medium normal-case tracking-normal text-zinc-500";

export function ManualCodePanel({
  title,
  code,
  lang,
  scrollClassName = "max-h-[60dvh] overflow-x-auto overflow-y-auto"
}: {
  title: string;
  code: string;
  lang: BundledLanguage;
  /** Scroll / max-height on the inner code shell (Tailwind classes). */
  scrollClassName?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch {
      // Ignore copy failures in unsupported environments.
    }
  }, [code]);

  return (
    <TitledCodeCopyCard
      title={title}
      titleClassName={pathTitleClass}
      code={code}
      highlightLang={lang}
      codeScrollClassName={[scrollClassName, HIDE_CODE_SCROLLBARS].filter(Boolean).join(" ")}
      copied={copied}
      onCopy={onCopy}
      copyAriaLabel={`Copy ${title}`}
    />
  );
}
