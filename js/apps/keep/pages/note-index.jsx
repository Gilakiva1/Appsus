import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
export class KeepApp extends React.Component {

    state = {
        notes: [],
        filterBy: null
    }


    componentDidMount() {
        this.loadNotes()
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes);
      };


    loadNotes = () => {

        noteService.query(this.state.filterBy)
            .then((notes) => {
                this.setState({ notes })
            })
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app">
                <AddNote loadNotes={this.loadNotes}/>
                <NoteFilter onSetFilter={this.onSetFilter}/>
                <NoteList notes={notes} loadNotes={this.loadNotes}  />
                
            </section>
        )
    }















}