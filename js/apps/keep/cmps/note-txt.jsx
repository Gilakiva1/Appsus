import { NoteTools } from "./note-tools.jsx"; 
import { TxtNote } from "./txt-note.jsx"


export class NoteTxt extends React.Component {
    state = {
        isEdit: false
    }

    componentDidMount() {
    }
    toggleEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !prevState.isEdit }))
    }

    render() {
        const note = this.props
        const backgroundColor = note.style
        const { isEdit } = this.state
        if(!note.info.title&&!note.info.txt) return
        return (
            <div style={backgroundColor} className="note-txt" >
                {note.info.title&&<TxtNote note={note} type="title" loadNotes={this.props.loadNotes} />}
                {note.info.txt&&<TxtNote note={note} type="txt" loadNotes={this.props.loadNotes} />}
                <NoteTools note={note} loadNotes={this.props.loadNotes} />
            </div >
        )
    }
}