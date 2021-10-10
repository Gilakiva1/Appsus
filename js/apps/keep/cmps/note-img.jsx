import { NoteTools } from "./note-tools.jsx"
import { TxtNote } from "./txt-note.jsx"

export class NoteImg extends React.Component {
    state = {
        isEdit: false
    }
    toggleEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !prevState.isEdit }))
    }
    // export function NoteImg(note){
    render() {
        const note = this.props
        const backgroundColor = note.style
        return (
            <div style={backgroundColor} className="note-img">

                <img  className="image" src={note.info.url} alt="" />
                <TxtNote className="txt" note={note} type="txt"  loadNotes={this.props.loadNotes} />
                <NoteTools note={note} loadNotes={this.props.loadNotes}/>
            </div>
        )
    }
}