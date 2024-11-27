// src/components/ui/modal.tsx
import { ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
    children: ReactNode
    onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
                <div className="p-4">
                    {children}
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                        aria-label="Close Modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
