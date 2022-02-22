import { Link } from "react-router-dom";
import { useAuthentication } from "../auth/authenticationSlice";
import { useUsers } from "./usersSlice";

export const SuggestionsSection = () => {
  const {
    authentication: { name, userName, avatar },
  } = useAuthentication();

  const { users } = useUsers();

  const getFiveUnfollowedUser = (users) => {
    let unfollowedUsers = users.filter(
      (user) => !user.followedByViewer && userName !== user.userName
    );
    if (unfollowedUsers.length > 5) {
      return [
        unfollowedUsers[0],
        unfollowedUsers[1],
        unfollowedUsers[2],
        unfollowedUsers[3],
        unfollowedUsers[4],
      ];
    }
    return unfollowedUsers;
  };

  return (
    <div>
      <div className="mt-5">
        <Link to={`/profile/${userName}`}>
          <div className="flex gap-3">
            <img
              src={avatar}
              alt={userName}
              className="border-2 border-blue-600 w-12 h-12 rounded-full"
            />

            <div className="flex flex-col">
              <p className="text-xl font-semibold">{userName}</p>
              <p className="text-gray-500 font-normal">{name}</p>
            </div>
          </div>
        </Link>
        <div className="mt-4">
          <p className="font-semibold text-lg text-gray-600">
            {" "}
            People to follow
          </p>
          {getFiveUnfollowedUser(users).map((user) => (
            <div className="my-4" key={user.userName}>
              {/* <div userDetails={user} /> */}
              <Link to={`/profile/${user.userName}`}>
                <div className="flex items-center gap-2">
                  <img src={user.avatar} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-gray-700 font-medium">{user.userName}</p>
                    <p className="text-gray-400">{user.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
