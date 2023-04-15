export async function getChats({ email }: { email: string }) {
  const res = await fetch(`/api/getChats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await res.json();
  return data;
}

export const getFiles = ({
  email,
  chatId,
}: {
  email: string;
  chatId: string;
}) =>
  fetch(`/api/getFiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      chatId,
    }),
  }).then((res) => res.json());
