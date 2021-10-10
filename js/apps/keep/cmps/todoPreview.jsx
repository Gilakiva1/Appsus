import { eventBusService } from "../../../services/event-bus-service.js";
import { noteService } from "../services/note.service.js";

export class TodoPreview extends React.Component {
    state = {
        isDone: false,
        isEdit: false
    }

    componentDidMount() {
        const { todo } = this.props
        this.setState(prevState => ({ ...prevState, isDone: todo.doneAt }))
    }

    toggleTodo = (isDoneTodo) => {
        const { isDone, isEdit } = this.state
        if (isDoneTodo) {
            this.setState({ isEdit: isEdit, isDone: Date.now() })
        } else {
            this.setState({ isEdit: isEdit, isDone: null })
        }
        this.toggleEdit()
    }

    toggleEdit = () => {
        const { isEdit } = this.state
        this.setState(prevState => ({ ...prevState, isEdit: !prevState.isEdit }))
    }

    onRemoveTodo = () => {
        const { id } = this.props
        noteService.removeTodo(id, this.props.idx)
            .then(() => {
                this.props.loadNotes()
            })
       eventBusService.emit('user-msg', 'todo removed successfully')
    }

    render() {
        const { todo } = this.props
        const { isDone, isEdit } = this.state
        return (
            <div className="todos todo ">
                <span className={(isDone) ? 'todo-complete' : ''}>
                    {todo.txt}
                </span>
                {!isEdit && <img className="edit" src='assets\img\keep\edit.png' onClick={this.toggleEdit} alt="" />}
                {!isEdit && <img className="todo-done" src='assets\img\keep\remove.png' onClick={this.onRemoveTodo} alt="" />}
                {isEdit && <img className="todo-done" src='assets\img\keep\v.png' onClick={() => { this.toggleTodo(true) }} alt="" />}
                {isEdit && <img className="todo-done" src='assets\img\keep\x.png' onClick={() => { this.toggleTodo(false) }} alt="" />}
            </div>
        )
    }
}