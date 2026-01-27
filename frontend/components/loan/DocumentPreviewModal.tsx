"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import gsap from "gsap";
import { FiX } from "react-icons/fi";

/* ---------- Overlay ---------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(3px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ---------- Modal ---------- */

const Modal = styled.div`
  width: 85vw;
  height: 85vh;
  background: #ffffff;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);

  @media (max-width: 1440px) {
    width: 90vw;
    height: 88vh;
  }
`;

/* ---------- Header ---------- */

const Header = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 14px;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

/* ---------- Content ---------- */

const Body = styled.div`
  flex: 1;
  background: #f8fafc;
  padding: 12px;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: #ffffff;
`;

/* ---------- Props ---------- */

type Props = {
  fileUrl: string;
  fileName: string;
  onClose: () => void;
};

/* ---------- Component ---------- */

export default function DocumentPreviewModal({
  fileUrl,
  fileName,
  onClose,
}: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  /* Animate IN */
  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 }
    );

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.96, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      }
    );
  }, []);

  /* Animate OUT */
  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current) {
      onClose();
      return;
    }

    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.96,
      y: 20,
      duration: 0.25,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });
  };

  /* 🔥 PORTAL RENDER */
  return createPortal(
    <Overlay ref={overlayRef} onClick={handleClose}>
      <Modal ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{fileName}</Title>
          <CloseBtn onClick={handleClose}>
            <FiX />
          </CloseBtn>
        </Header>

        <Body>
          <Iframe src={fileUrl} title={fileName} />
        </Body>
      </Modal>
    </Overlay>,
    document.body
  );
}
