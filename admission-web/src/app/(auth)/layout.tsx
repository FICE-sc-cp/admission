import { FC } from 'react';
import type {Metadata} from "next";
import {registrationMetadata} from "@/lib/metadata/registration";

export const metadata: Metadata = registrationMetadata;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__content">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
