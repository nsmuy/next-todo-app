import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/app/firebase";
import { collection, query, where, onSnapshot, Timestamp, addDoc, orderBy } from "firebase/firestore";
import { useParams } from "next/navigation";
import { Comment } from "@/types/Comment";

const Comments = () => {

  const params = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [sendComments, setSendComments] = useState<string>('');

  useEffect(() => {
    const commentsRef = collection(db, 'comments');

    // idフィールドの値とURLのパラメーターIDが一致し、sendAtでソートされたドキュメントを取得
    const q = query(commentsRef, where('id', '==', params.id), orderBy('sendAt', 'asc'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        ...(doc.data() as Comment),
        docId: doc.id,
      }));

      setComments(commentsData);
    });
  
    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const handleSendComments = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "comments"), {
      docId: uuidv4(),
      id: params.id,
      text: sendComments,
      sendAt: Timestamp.now(),
    });

    setSendComments('');
  }

  return (
    <div className="w-full mt-6">
      <h3 className="text-2xl font-bold">コメント</h3>
      <div className="bg-white p-4 rounded-lg">
        {comments.map((comment) => (
          <div key={comment.docId} className="flex justify-between">
            <p>{comment.text}</p>
            <p className="text-gray-500 text-sm">{comment.sendAt.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendComments} className="mt-4 w-full">
        <div>
          <input type="text" placeholder="コメントを入力してください" onChange={(e) => setSendComments(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>
      </form>
    </div>
  );
};

export default Comments;
