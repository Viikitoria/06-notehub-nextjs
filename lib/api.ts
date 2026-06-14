import axios from "axios";
import { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};

export const fetchNotes = async (
  page: number,
  search?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = {
    page,
    perPage: 12,
  };

  if (search?.trim()) {
    params.search = search;
  }

  const { data } = await axios.get<FetchNotesResponse>(BASE_URL, {
    params,
    headers,
  });

  return data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const { data } = await axios.post<Note>(BASE_URL, payload, {
    headers,
  });

  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${noteId}`, {
    headers,
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers,
  });

  return data;
};