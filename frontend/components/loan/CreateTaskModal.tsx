"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import Image from "next/image";

import PdfIcon from "@/public/Images/pdf_icon.svg";
import VerifiedIcon from "@/public/Images/verified.svg";

/* ---------- Overlay ---------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

/* ---------- Modal ---------- */

const Modal = styled.div`
  width: 460px;
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

/* ---------- Header ---------- */

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const Close = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

/* ---------- Form ---------- */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  color: #6b7280;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
`;

const Upload = styled.div`
  grid-column: span 2;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 13px;
  color: #6b21a8;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Textarea = styled.textarea`
  grid-column: span 2;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  resize: none;
  height: 100px;
`;

/* ---------- Footer ---------- */

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
`;

const Button = styled.button`
  background: #4c1d95;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  cursor: pointer;
`;

/* ---------- Success ---------- */

const SuccessWrap = styled.div`
  padding: 40px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SuccessText = styled.h4`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
`;

/* ---------- Component ---------- */

export default function CreateTaskModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [success, setSuccess] = useState(false);
    const TASK_ID = "675793";

    useEffect(() => {
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: 0.9, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
    }, []);

    const handleCreate = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            onComplete: () => {
                setSuccess(true);

                gsap.fromTo(
                    modalRef.current,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.3 }
                );

                // 🔥 Auto-close after 2 seconds
                setTimeout(() => {
                    onClose();
                }, 2000);
            },
        });
    };


    return (
        <Overlay onClick={onClose}>
            <Modal ref={modalRef} onClick={(e) => e.stopPropagation()}>
                {!success ? (
                    <>
                        <Header>
                            <Title>Create Task</Title>
                            <Close onClick={onClose}>×</Close>
                        </Header>

                        <Grid>
                            <Field>
                                <Label>Task ID</Label>
                                <Input defaultValue="675793" disabled />
                            </Field>

                            <Field>
                                <Label>Date</Label>
                                <Input defaultValue="11-07-2025" disabled />
                            </Field>

                            <Field>
                                <Label>Name</Label>
                                <Input defaultValue="Naresh Kumar" />
                            </Field>

                            <Field>
                                <Label>Category</Label>
                                <Select>
                                    <option>Document Requirement</option>
                                    <option>Verification</option>
                                    <option>Mismatch</option>
                                </Select>
                            </Field>

                            <Upload>
                                <Image src={PdfIcon} alt="PDF" width={32} height={32} />
                                Attach File
                            </Upload>

                            <Textarea placeholder="Please share the SMART Integrated Portal document..." />
                        </Grid>

                        <Footer>
                            <Button onClick={handleCreate}>Create</Button>
                        </Footer>
                    </>
                ) : (
                    <SuccessWrap>
                        <Image
                            src={VerifiedIcon}
                            alt="Success"
                            width={120}
                            height={120}
                        />

                        <SuccessText>Task Created Successfully!</SuccessText>

                        <p
                            style={{
                                marginTop: "8px",
                                fontSize: "13px",
                                color: "#6b7280",
                            }}
                        >
                            Task ID: <b>{TASK_ID}</b>
                        </p>
                    </SuccessWrap>

                )}
            </Modal>
        </Overlay>
    );
}
