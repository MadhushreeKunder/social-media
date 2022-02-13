import { MdClose } from "react-icons/md";

export function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-70 z-50"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 p-4">
        <button onClick={onClose}>
          <MdClose />
        </button>
        {children}
      </div>
    </>
  );
}
