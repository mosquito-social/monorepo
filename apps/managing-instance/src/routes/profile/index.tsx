import { Navigate } from "@solidjs/router";
import { MOCK_USERS } from "../../mocks/users";

const CURRENT_USER = MOCK_USERS[0];

export default function ProfileRedirect() {
  return <Navigate href={`/profile/${CURRENT_USER.id}`} />;
}
