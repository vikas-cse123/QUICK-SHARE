import Note from "../models/notes.model.js";

import { logWithTime } from "../utils/logger.js";

const getNoteId = (idLength = 4) => {
  logWithTime("Running this function : getNoteId")
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id = id + characters[Math.floor(Math.random() * characters.length)];
  }
  return id;
};

export const getNoteUniqueId = async(idLength=4) => {
  logWithTime("Running this function : getNoteUniqueId");
  const id = getNoteId(idLength)
  let note = await Note.findOne({ id });

  if (note) {
    getNoteUniqueId(++idLength)
    return 

  }
  return id
};