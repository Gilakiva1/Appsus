
import { NotePreview } from "./note-preview.jsx"


export function NoteList({notes, loadNotes}){
    return (
        <div className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note} loadNotes={loadNotes} />)}
        </div>
    )
}