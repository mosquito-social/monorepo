import { Navigate, useParams } from "@solidjs/router";

export default function CommunityChatsIndex() {
  const params = useParams<{ slug: string }>();
  return <Navigate href={`/community/${params.slug}/chats/general`} />;
}
