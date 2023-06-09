"use client";

import { useContext, createContext, useMemo } from "react";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ToastNotifications from "@/components/ToastNotifications";
import { Provider } from "react-redux";
import store from "@/store";
import Modal from "@/components/Modal";

const ClientContext = createContext<User | null>({
  email: "",
  name: "",
  image: "",
});

export const useClient = () => {
  return useContext(ClientContext);
};

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const user = useMemo(
    () => ({
      email: session?.user?.email!,
      name: session?.user?.name!,
      image: session?.user?.image!,
    }),
    [session]
  );

  const queryClient = new QueryClient();

  return (
    <ClientContext.Provider value={user}>
      <ToastNotifications />
      <Modal />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </ClientContext.Provider>
  );
};
