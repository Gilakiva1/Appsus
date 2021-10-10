import { NoteTools } from "./note-tools.jsx"; 
import { TxtNote } from "./txt-note.jsx"


export class NoteVideo extends React.Component {
    state = {
        isEdit: false
    }

    componentDidMount() {
        const note = this.props
        
    }
    toggleEdit = () => {
        this.setState(prevState => ({ ...prevState, isEdit: !prevState.isEdit }))
    }
    get youTubeFixed () {
        const note = this.props
        let { url } = this.props.info
        let fixedUrl = url.split('?v=')
        return `https://www.youtube.com/embed/${fixedUrl[1]}`
    }
    render() {
        const note = this.props
        const backgroundColor = note.style
        const { isEdit } = this.state
        return (
            <div style={backgroundColor} className="note-video" >
               {note.info.title && <TxtNote note={note} type="title" loadNotes={this.props.loadNotes} />}
                <iframe src={this.youTubeFixed} frameBorder="0"></iframe>
                { note.info.txt && <TxtNote note={note} type="txt" loadNotes={this.props.loadNotes} />}
                <NoteTools note={note} loadNotes={this.props.loadNotes}/>
            </div >
        )
    }
}