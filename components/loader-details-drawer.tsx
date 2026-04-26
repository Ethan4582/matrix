"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  PackageManagerInstallCard,
  TitledCodeCopyCard,
  shadcnRegistryAddCommand,
  type ShadcnPackageManager
} from "@/components/package-manager-install-toolbar";
import { HIDE_CODE_SCROLLBARS } from "@/lib/hide-code-scrollbar-class";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const CLI_MANUAL_DOT_ROW_H = 6;
const CLI_MANUAL_DOT_GAP_PX = 9;

function MeasuredCliManualDotRail({
  activeTab,
  onTabChange
}: {
  activeTab: "cli" | "manual";
  onTabChange: (tab: "cli" | "manual") => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const cliRef = useRef<HTMLButtonElement>(null);
  const manualRef = useRef<HTMLButtonElement>(null);
  const [{ width, cli, manual }, setGeom] = useState<{
    width: number;
    cli: [number, number] | null;
    manual: [number, number] | null;
  }>({ width: 0, cli: null, manual: null });

  const measure = useCallback(() => {
    const rail = railRef.current;
    const c = cliRef.current;
    const m = manualRef.current;
    if (!rail || !c || !m) {
      return;
    }
    const r = rail.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    const mr = m.getBoundingClientRect();
    setGeom({
      width: r.width,
      cli: [cr.left - r.left, cr.right - r.left],
      manual: [mr.left - r.left, mr.right - r.left]
    });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, activeTab]);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") {
      return;
    }
    const ro = new ResizeObserver(() => measure());
    ro.observe(rail);
    return () => ro.disconnect();
  }, [measure]);

  const dotCount = width > 0 ? Math.max(25, Math.round(width / CLI_MANUAL_DOT_GAP_PX)) : 0;

  return (
    <div ref={railRef} className="inline-flex flex-col items-stretch gap-0 w-max">
      <div className="inline-flex gap-0">
        <button
          ref={cliRef}
          type="button"
          onClick={() => onTabChange("cli")}
          className={`rounded-lg pr-2 pl-1.5 text-xs font-medium transition ${activeTab === "cli" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
            }`}
        >
          CLI
        </button>
        <button
          ref={manualRef}
          type="button"
          onClick={() => onTabChange("manual")}
          className={`rounded-lg pl-2 pr-1.5 text-xs font-medium transition ${activeTab === "manual" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
            }`}
        >
          Manual
        </button>
      </div>
      <div
        className="relative shrink-0"
        style={{ height: CLI_MANUAL_DOT_ROW_H }}
        aria-hidden
      >
        {width > 0 && cli && manual && dotCount > 0
          ? Array.from({ length: dotCount }, (_, i) => {
            const t = (i + 0.5) / dotCount;
            const x = t * width;
            const inCli = x >= cli[0] && x <= cli[1];
            const inManual = x >= manual[0] && x <= manual[1];
            const lit = activeTab === "cli" ? inCli : inManual;
            return (
              <span
                key={i}
                className={`absolute top-1/2 size-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200 ease-out ${lit ? "bg-zinc-100" : "bg-zinc-600"
                  }`}
                style={{ left: `${t * 100}%` }}
              />
            );
          })
          : null}
      </div>
    </div>
  );
}

export interface LoaderCard {
  slug: string;
  title: string;
  description: string;
  componentName: string;
  motionOptional: boolean;
  sourceCode: string;
}

export interface ManualSetupSources {
  coreFilePath: string;
  coreSource: string;
  hooksFilePath: string;
  hooksSource: string;
  cssFilePath: string;
  cssSource: string;
}

interface LoaderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: LoaderCard | null;
  preview: ReactNode;
}

export function LoaderDetailsDrawer({
  open,
  onOpenChange,
  selected,
  preview
}: LoaderDetailsDrawerProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cli" | "manual">("cli");
  const [packageManager, setPackageManager] = useState<ShadcnPackageManager>("pnpm");
  const scopedRegistryName = "@dotmatrix";
  const scopedItemName = selected ? `${scopedRegistryName}/${selected.slug}` : "";
  const installCommand = selected ? shadcnRegistryAddCommand(packageManager, scopedItemName) : "";
  const demoUsageCode = selected
    ? `import { ${selected.componentName} } from "@/components/ui/${selected.slug}";

export function Example() {
  return <${selected.componentName} />;
}`
    : "";

  useEffect(() => {
    setActiveTab("cli");
    setPackageManager("pnpm");
  }, [selected?.slug]);

  const copySnippet = async (token: string, content: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopiedToken(token);
      window.setTimeout(() => {
        setCopiedToken((prev) => (prev === token ? null : prev));
      }, 1400);
    } catch {
      // Ignore copy failures in unsupported environments.
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[2px] transition-opacity duration-175 ease-[cubic-bezier(.215, .61, .355, 1)] data-starting-style:opacity-0 data-ending-style:opacity-0" />
        <Dialog.Viewport className="fixed inset-0 z-50">
          <Dialog.Popup
            className={`${GeistSans.className} absolute left-2 inset-y-2 w-[calc(50%-0.75rem)] rounded-lg bg-[#0c0c0c] transition-transform duration-175 ease-[cubic-bezier(.215, .61, .355, 1)] data-starting-style:-translate-x-full data-ending-style:-translate-x-full`}
          >
            {selected ? (
              <section className="grid h-full place-items-center rounded-lg">
                <div className="flex items-center justify-center">{preview}</div>
              </section>
            ) : null}
          </Dialog.Popup>
          <Dialog.Popup
            className={`${GeistSans.className} absolute right-2 inset-y-2 flex min-h-0 w-[calc(50%-0.75rem)] flex-col rounded-lg bg-[#0c0c0c] transition-transform duration-175 ease-[cubic-bezier(.215, .61, .355, 1)] data-starting-style:translate-x-full data-ending-style:translate-x-full`}
          >
            {selected ? (
              <div className="flex min-h-0 flex-1 flex-col pb-4">
                <section className="flex min-h-0 flex-1 flex-col gap-3 p-4">
                  <div className="shrink-0">
                    <MeasuredCliManualDotRail activeTab={activeTab} onTabChange={setActiveTab} />
                  </div>

                  {activeTab === "cli" ? (
                    <div className="grid gap-4">
                      <PackageManagerInstallCard
                        value={packageManager}
                        onValueChange={setPackageManager}
                        copied={copiedToken === "install-command"}
                        onCopy={() => copySnippet("install-command", installCommand)}
                        command={installCommand}
                        codeBlockClassName={HIDE_CODE_SCROLLBARS}
                      />
                      <TitledCodeCopyCard
                        title="Demo Usage"
                        code={demoUsageCode}
                        highlightLang="tsx"
                        copied={copiedToken === "demo-usage"}
                        onCopy={() => copySnippet("demo-usage", demoUsageCode)}
                        copyAriaLabel="Copy demo usage"
                        codeBlockClassName={HIDE_CODE_SCROLLBARS}
                      />
                      <div className="flex items-center gap-1 overflow-hidden">
                        {Array.from({ length: 150 }).map((_, i) => (
                          <div
                            key={i}
                            className="size-0.5 rounded-full bg-white/10 shrink-0"
                          >
                          </div>
                        ))}
                      </div>

                      
                    </div>
                  ) : (
                    <div className="flex min-h-0 flex-1 flex-col gap-4">
                      <div className="grid shrink-0 gap-1">
                        <h3 className="text-lg text-zinc-200">
                          Manual Usage
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-300">
                          You need to manually create the shared runtime files before using individual loaders. Follow the{" "}
                          <Link
                            href="/getting-started/manual"
                            className="underline underline-offset-4 text-zinc-100 hover:text-white"
                          >
                            Getting Started Manually
                          </Link>{" "}
                          guide first.
                        </p>
                      </div>
                      <TitledCodeCopyCard
                        title={`components/ui/${selected.slug}.tsx`}
                        titleClassName="truncate text-left font-mono text-xs font-medium normal-case tracking-normal text-zinc-500"
                        code={selected.sourceCode}
                        highlightLang="tsx"
                        shellClassName="flex min-h-0 flex-1 flex-col"
                        codeWrapperClassName="flex min-h-0 flex-1 flex-col"
                        codeBlockClassName="min-h-0 flex-1"
                        codeScrollClassName={[
                          "min-h-0 flex-1 overflow-y-auto overflow-x-auto",
                          HIDE_CODE_SCROLLBARS
                        ].join(" ")}
                        copied={copiedToken === "loader-source"}
                        onCopy={() => copySnippet("loader-source", selected.sourceCode)}
                        copyAriaLabel="Copy loader source"
                      />
                    </div>
                  )}
                </section>
              </div>
            ) : null}
          </Dialog.Popup>
          <AnimatePresence>
            {open ? (
              <motion.div
                key="floating-close"
                initial={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1, transition: { delay: 0.08 } }}
                exit={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none absolute inset-x-0 bottom-20 z-50 flex justify-center"
              >
                <Dialog.Close
                  aria-label="Close dialog"
                  className="pointer-events-auto inline-grid p-2.5  border-white/5 place-items-center rounded-lg text-white bg-black"
                >
                  <span className="grid grid-cols-5 gap-px">
                    {Array.from({ length: 25 }).map((_, index) => {
                      const row = Math.floor(index / 5);
                      const col = index % 5;
                      const isCross = row === col || row + col === 4;
                      return (
                        <span
                          key={index}
                          className={`h-[2px] w-[2px] rounded-full ${isCross ? "bg-white" : "bg-white/5"}`}
                        />
                      );
                    })}
                  </span>
                </Dialog.Close>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
