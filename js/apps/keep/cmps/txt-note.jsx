import { noteService } from "../services/note.service.js";
// todo : smart component to edit txt and title
export class TxtNote extends React.Component {

    state = {
        isEdit: false,
        txt: ''
    }

    componentDidMount() {
        const isEdit = this.props.isEdit;
        const note = this.props.note;
        const type = this.props.type
        const noteTxt = note.info[type]
        this.setState({ isEdit, txt: noteTxt })
    }
    toggleEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !prevState.isEdit }))
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ txt: value })
    }

    saveEdit = () => {

        const note = this.props.note;
        const { txt } = this.state;
        const type = this.props.type

        if (!note.title && !note.info.txt) {
            noteService.removeNote(note.id)
            this.toggleEdit()
            this.props.loadNotes()
        }

        else {
            noteService.setEditTxt(txt, note.id, type)
        }
        this.toggleEdit()
        this.props.loadNotes()
    }

    exitEditor = () => {
        this.toggleEdit()
    }



    render() {
        const { isEdit, txt } = this.state;
        const note = this.props.note;
        const type = this.props.type
        return (
            <div className="container flex">
                {note.info[type] && type === 'title' && !isEdit && <h1 className="title">{note.info.title}</h1>}
                {note.info[type] && type === 'txt' && !isEdit && <p className="txt">{note.info.txt}</p>}
                {note.info[type] && isEdit && <input onChange={this.handleChange} type='text' value={txt} />}
                {note.info[type] && !isEdit && <img className="edit" src='assets\img\keep\edit.png' onClick={this.toggleEdit} alt="" />}
                {note.info[type] && isEdit && <img className="edit-done" src='assets\img\keep\v.png' alt="" onClick={this.saveEdit} />}
                {note.info[type] && isEdit && <img className="edit-done" src='assets\img\keep\x.png' alt="" onClick={this.exitEditor} />}

                

            </div>
        )
    }


}