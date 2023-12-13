"use client";

import "./globals.css";
import { RecoilRoot } from "recoil";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { Button} from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from '../app/firebase';

const metadata = {
  title: "Next.js + Recoil + FirebaseでTodoアプリ",
  description: "Next.js + Recoil + FirebaseでTodoアプリを作りました",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const auth = getAuth(app);
  const { user, loading } = useAuthContext();
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    console.log('userまたはloadingの状態が変更されました');
    console.log('user:', user);
    console.log('user:', loading);

    if(user && !loading) {
      setIsLogging(true);
    } else {
      setIsLogging(false);
    }
  }, [user, router, loading])

  const handleLogout = async () => {
    await signOut(auth);
    await router.push("/");
  }

  return (
    <html lang="ja">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <AuthProvider>
          <header className="mb-12">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todoリスト
                  </Typography>
                  {isLogging ? (
                    <Button style={{ color: 'white' }} onClick={handleLogout}>ログアウト</Button>
                  ) : (
                    <Button style={{ color: 'white' }} onClick={handleLogout}>ログアウト</Button>
                  )}
                </Toolbar>
              </AppBar>
            </Box>
          </header>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </AuthProvider>
      </body>
    </html>
  );
}