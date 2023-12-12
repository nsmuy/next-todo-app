import { Timestamp } from 'firebase/firestore'

export type Comment = {
  docId: string,
  id: string,
  text: string,
  sendAt: Timestamp,
}
