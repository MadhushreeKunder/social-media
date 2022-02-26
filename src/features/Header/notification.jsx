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
        <div className="overflow-scroll h-full max-h-96">
          {notifications.length === 0 ? (
            <p>No notifications.</p>
          ) : (
            notifications.map((activity) => (
              <div className="m-4 capitalize text-lg ">
                <Link to={`/profile/${activity.activityUserId.userName}`}>
                  <div className="flex">
                    <img
                      src={activity.activityUserId.avatar}
                      alt={activity.activityUserId.userName}
                      className="w-12 h-12 rounded-full mr-2 self-center"
                    />
                    <div className="flex flex-col text-left">
                      <p>{activity.activityUserId.userName}</p>

                      <p className="font-normal text-base">
                        {activity.activityTitle}
                        <span>
                          {activity?.likedPost?.caption &&
                            `: ${activity?.likedPost?.caption}`}
                        </span>
                      </p>
                      <p className=" font-normal text-base text-gray-400">
                        {activity.time}
                      </p>
                    </div>
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
