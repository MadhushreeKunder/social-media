import { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
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
            <p>No notifications.</p>
          ) : (
            notifications.map((activity) => (
              <div>
                <Link to={`/profile/${activity.activityUserId.userName}`}>
                  <div className="flex">
                    <img
                      src={activity.activityUserId.avatar}
                      alt={activity.activityUserId.userName}
                    />
                    <div>
                      <p>{activity.activityUserId.userName}</p>
                    </div>
                    <p>
                      {activity.activityTitle}
                      <span>
                        {activity?.likedPost?.caption &&
                          `: ${activity?.likedPost?.caption}`}
                      </span>
                    </p>
                    <p>{activity.time}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
};
