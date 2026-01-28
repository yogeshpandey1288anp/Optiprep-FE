"use client";

import gsap from "gsap";

export function animateTabSwitch(
  ref: React.RefObject<HTMLDivElement | null>,
  onMidway: () => void
) {
  if (!ref.current) {
    onMidway();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
  });

  // 🔹 Animate OUT
  tl.to(ref.current, {
    opacity: 0,
    y: -8,
    duration: 0.2,
  });

  // 🔹 Switch content in the middle
  tl.add(() => {
    onMidway();
  });

  // 🔹 Animate IN
  tl.fromTo(
    ref.current,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
    }
  );
}
