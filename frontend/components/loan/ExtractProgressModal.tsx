"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import gsap from "gsap";

/* ---------- Overlay ---------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ---------- Card ---------- */

const Card = styled.div`
  width: 420px;
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
`;

/* ---------- Text ---------- */

const Text = styled.p`
  font-size: 14px;
  margin-bottom: 14px;
  color: #111827;
`;

/* ---------- Progress ---------- */

const ProgressWrapper = styled.div`
  height: 6px;
  width: 100%;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #4c1d95, #7c3aed);
  border-radius: 6px;
`;

const Percentage = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-left: 8px;
`;

/* ---------- Component ---------- */

type Props = {
    progress: number;
};

export default function ExtractProgressModal({ progress }: Props) {
    const barRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!barRef.current || !cardRef.current) return;

        gsap.fromTo(
            cardRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.3 }
        );
    }, []);

    useEffect(() => {
        if (!barRef.current) return;

        gsap.to(barRef.current, {
            width: `${progress}%`,
            duration: 0.4,
            ease: "power2.out",
        });
    }, [progress]);

    return createPortal(
        <Overlay>
            <Card ref={cardRef}>
                <Text>Extracting your file, this may take a moment</Text>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <ProgressWrapper>
                        <ProgressBar ref={barRef} />
                    </ProgressWrapper>

                    <Percentage>{progress}%</Percentage>
                </div>
            </Card>
        </Overlay>,
        document.body
    );
}
