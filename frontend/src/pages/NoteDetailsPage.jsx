import { useState } from "react";
import { useParams } from "react-router-dom";

export const NoteDetailsPage = () => {
  const [noteId, setNoteId] = useState(useParams().noteId);

  return <div>NoteDetailsPage</div>;
};
