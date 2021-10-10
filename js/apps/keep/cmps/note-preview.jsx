



import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteTxt } from "./note-txt.jsx"
import { NoteVideo } from "./note-video.jsx"



export class NotePreview extends React.Component {

    DynamicCmp = (props) => {
        
        switch (this.noteType) {
            case 'note-txt':
                return <NoteTxt {...props} loadNotes={this.props.loadNotes} />
            case 'note-img':
                return <NoteImg {...props} loadNotes={this.props.loadNotes}  />
            case 'note-todos':
                return <NoteTodos {...props} loadNotes={this.props.loadNotes}/>
            case 'note-video':
                return <NoteVideo {...props} loadNotes={this.props.loadNotes} />
            default:
                return <div>Error loading note</div>
        }
    }

    get noteType() {
        return this.props.note.type
    }


    render() {
        const { note } = this.props
        const { DynamicCmp } = this

        return (
                <DynamicCmp {...note} />
            
           
        )
    }
}