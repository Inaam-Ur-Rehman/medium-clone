"use client";
import { SessionProvider, useSession } from "next-auth/react";

const AuthWrapper = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthWrapper;
