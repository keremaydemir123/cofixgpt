export function getChatIdFromPathname(pathname: string | null) {
  if (!pathname) return null;
  const pathSegments = pathname.split("/");
  if (pathSegments[1] === "chat" && pathSegments.length >= 3) {
    const chatId = pathSegments[2];
    return chatId;
  } else {
    return null;
  }
}
