import { eventBusService } from "../../../services/event-bus-service.js";
import { noteService } from "../services/note.service.js";



export class NoteTools extends React.Component {
    state = {
        color:''
    }
    onRemoveNote = () => {
        const note = this.props.note;
        noteService.removeAllNote(note)
        this.props.loadNotes()
       eventBusService.emit('user-msg', 'note removed successfully')

    }
    onChangeColor = (ev) => {
        const note = this.props.note;
        var color = ev.target.value;
        noteService.changeColorNote(note,color)
        this.props.loadNotes()
    }
    render() {
        const note = this.props.note
        return (
            <div className='note-tools'>
                <img className='edit-done' src='assets\img\keep\remove.png' onClick={this.onRemoveNote} />
                <label htmlFor={note.id}><img src='assets\img\keep\bgc.png'/></label>
                <input id={note.id} className="bg-color" onChange={this.onChangeColor} type="color" value="#000000"></input>
             
            </div>
        )
    }

}