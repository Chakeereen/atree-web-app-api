"use client";
import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* พื้นหลัง */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* กล่อง Modal */}
      <div className="relative bg-white rounded-2xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto p-6 z-10">
        {children}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
