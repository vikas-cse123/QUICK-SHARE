import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../features/notes/services/noteApi";
import { Header } from "../components/Header";
import { fetchUser } from "../features/auth/services/authService";

export const NoteDetailsPage = () => {
  const noteId = useParams().noteId;
  const [note,setNote] = useState()
  const [noteOwner,setNoteOwner] = useState()


  
  console.log(note);
  console.log(noteOwner);
  useEffect(() => {
    (
      async () => {
        const result = await getNote(noteId)
        setNote(result.data)
      }
    )()
  },[])

  useEffect(() => {
 
    if(note && !note?.isGuestUser){
     (
      async () => {
         const result = await fetchUser(note.userId)
         if(result.success){
          setNoteOwner(result.data)
         }
      }
     )()

    }
  },[note])


  return <>
{
  note &&   <div>
    <p>{note.name}</p>
 {
  noteOwner &&    <div>
      <img src={noteOwner.avatarUrl} alt="" referrerPolicy="no-referrer" />
      <p>{noteOwner.name}</p>
    </div>
 }
    <p>{note.category}</p>
    <p>{new Date(note.createdAt).toLocaleString()}</p>
    <textarea name="" id="" value={note.content}></textarea>
  </div>
}
  </>;
};
