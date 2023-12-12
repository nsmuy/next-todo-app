/**
 * トップページ（/）
 */

"use client";
import Button from '@mui/material/Button';
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useAuthContext } from './context/AuthContext';

export default function Home() {

  const router = useRouter();
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="flex items-center justify-center gap-4">
        <Button><Link href="/signup">新規登録</Link></Button>
        <Button><Link href="/signin">ログイン</Link></Button>
      </div>
    );
  } else {
    //userがログインしている時は、todosページにリダイレクト
    router.push('/todos');
  }
}
