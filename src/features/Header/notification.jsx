import { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { useAuthentication } from "../auth/authenticationSlice";
import { Modal } from "../posts";

export const Notification = () => {
  const { notifications } = useAuthentication();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        <MdNotifications className="ml-6 text-mediumGray" />
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
            {notifications.length === 0 ? (
                <p>
                    No notifications.
                </p>
            ): (
                notifications.map((activity) => (
                <div>
                        
                    </div>
                ))
            )}
        </div>
      </Modal>
    </>
  );
};
