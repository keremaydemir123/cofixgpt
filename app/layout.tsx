import { getServerSession } from "next-auth";

import "./global.css";
import { SessionProvider } from "@/components/SessionProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import App from "@/components/App";
import { ClientProvider } from "@/context/ClientProvider";

export const metadata = {
  title: "CoFixGPT",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <>
              <ClientProvider>
                <main className="flex flex-col h-screen">
                  {/* Navbars heigth is 5rem! */}
                  <div className="flex h-full">
                    <App>{children}</App>
                  </div>
                </main>
              </ClientProvider>
            </>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
