
export class NoteFilter extends React.Component {
    state = {
        filterBy: ''
    }



    render() {

        return (
            <select className="filters" onChange= {()=>{
                
                this.props.onSetFilter(event.target.value)
            }} name="filters" id="filters">
                <option value="">All</option>
                <option value="note-txt">Text</option>
                <option value="note-img">Image</option>
                <option value="note-todos">Todos</option>
                <option value="note-video"> video</option>
            </select>
        )
    }
}

