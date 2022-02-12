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
      <div className="sticky">
        People to follow
        <Link to={`/profile/${userName}`}>
          <img src={avatar} alt="" />
          <div>{userName}</div>
        </Link>
        {getFiveUnfollowedUser(users).map((user) => (
          <div mb="0.8rem" key={user.userName}>
            <div userDetails={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
