"use client";
import { GeistSans } from "geist/font/sans";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

const classApp =
  "h-10 w-full cursor-pointer border-b-2 border-white p-2 text-center";
export default function ClientLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const router = useRouter();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="flex">
          <div className="min-h-screen min-w-40 border-r-2 border-r-white bg-slate-900 text-white">
            <div onClick={(e) => router.push("/")} className={classApp}>
              Home
            </div>
            <div
              onClick={(e) => router.push("/apps/password/")}
              className={classApp}
            >
              Password
            </div>
            <div
              onClick={(e) => router.push("/apps/whois/")}
              className={classApp}
            >
              Whois
            </div>
            <div className={classApp}>Home</div>
          </div>
          <div className="h-full min-h-screen w-full">
            <Toaster />
            {children}
          </div>
        </div>
        {session == null && (
          <div className="absolute bottom-0 flex h-32 w-screen items-center justify-center bg-blue-500">
            <div className="text-center">
              <div className="text-5xl">Vous n'êtes pas connecté</div>
              <div onClick={() => router.push("/api/auth/signin")}>
                Connection
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
