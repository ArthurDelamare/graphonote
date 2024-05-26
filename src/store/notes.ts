import { writable } from 'svelte/store';

export type Note = {
    content: String;
    date: Date;
}

export const notes = writable<Note[]>([]);

export const addNote = (content: string) => notes.update(notes => [...notes, {content: content, date: new Date()}]);