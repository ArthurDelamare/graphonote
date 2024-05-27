import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export type Note = {
    id: string;
    content: String;
    date: Date;
}

export const notes = writable<Note[]>([]);

export const newNote = writable<Note>();

export const addNote = (content: string) => {
    const note: Note = { 
        id: uuidv4(),
        date: new Date(),
        content: content
    };
    newNote.set(note);
    notes.update(notes => [...notes, note]);
};