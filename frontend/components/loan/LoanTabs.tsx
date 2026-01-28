"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Tabs, Tab, ActiveIndicator } from "./LoanStyles";

type Props = {
  activeTab: string;
  onChange: (tab: string) => void;
};

const tabList = [
  { key: "borrower", label: "Borrower Details" },
  { key: "loan", label: "Loan Account Details" },
  { key: "property", label: "Property Details" },
  { key: "payment", label: "Payment Behavior" },
  { key: "hardship", label: "Financial Hardship" },
  { key: "documents", label: "Documents" },
];

export default function LoanTabs({ activeTab, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    const indicator = indicatorRef.current;
    const container = containerRef.current;

    if (!activeEl || !indicator || !container) return;

    const tabRect = activeEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x = tabRect.left - containerRect.left;

    gsap.to(indicator, {
      x,
      width: tabRect.width,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [activeTab]);

  return (
    <Tabs ref={containerRef}>
      {tabList.map((tab) => (
        <Tab
          key={tab.key}
          ref={(el) => {
            tabRefs.current[tab.key] = el;
          }}
          $active={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </Tab>
      ))}

      {/* 🔥 Sliding underline */}
      <ActiveIndicator ref={indicatorRef} />
    </Tabs>
  );
}
