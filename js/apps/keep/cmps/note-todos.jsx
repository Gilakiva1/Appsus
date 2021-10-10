import { NoteTools } from "./note-tools.jsx"; 
import { noteService } from "../services/note.service.js"
import { TodoPreview } from "./todoPreview.jsx";

export class NoteTodos extends React.Component {
    state = {
        isEdit:false
    }

    
    editTxt = () => {
        
    }
    render() {
        const note = this.props
        const backgroundColor = note.style
        return (
            <div style={backgroundColor} className="todo-continuer">
                {note.info.label && <h1>{note.info.label}</h1>}
                {note.info.todos.map((todo, idx) => <TodoPreview key={Math.random()} todo={todo} idx={idx} id={note.id} loadNotes={this.props.loadNotes} />)}
                <NoteTools note={note} loadNotes={this.props.loadNotes}/>
            </div>
        )

    }
}