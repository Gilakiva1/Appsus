import { eventBusService } from "../../../services/event-bus-service.js";
import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js"

const todoIds = ['adsfgasdf', 'asdfvmadfskl', '23f245rf8urewf', 'adfsm=e3498r', '234234f89j4f3']
export class AddNote extends React.Component {
    state = {
        title: '',
        txt: '',
        type: 'note-txt',
        url: '',
        todos: [''],
        isAdd: false
    }
    componentDidMount() {
    }
    handleChange = (ev) => {
        const value = ev.target.value;
        const type = ev.target.className;
        if (type === 'todos') {
            let todos = [...this.state.todos]
            console.log('todos', todos);
            const idx = +ev.target.name;
            todos[idx] = value
            this.setState({ todos })
        } else {
            this.setState({ [type]: value })
        }
    }
    addTypeNote = (ev) => {
        const value = ev.target.name;
        this.setState({ type: value })
    }
    onSaveNewNote = () => {
        const { title, txt, done,todos, url,type } = this.state
        console.log(todos);
        console.log(type ==='note-todos' , !title , !txt,!todos[0]);
        if(type==='note-todos' && !title && !txt &&!todos) return
        if(type ==='note-txt' && !title && !txt ) return
        // if (!title && !txt  && url) return
        noteService.saveNewNote(this.state);
        this.props.loadNotes();
        this.setState({
            title: '',
            txt: '',
            type: 'note-txt',
            url: '',
            todos: [''],

        })
       eventBusService.emit('user-msg', 'note added successfully')

    }

    addTodo = () => {
        let { todos } = this.state
        todos.push('')
        this.setState({ todos })

    }
    render() {
        const { txt, title, type, url, todos } = this.state
        return (
            <form className="new-note" >
                <input className="title" value={title} onChange={this.handleChange} placeholder="Add New Title..." type="text" />
                {(type === 'note-img' || type === 'note-video') &&
                    <input className="url" value={url} onChange={this.handleChange} placeholder="Add Url" type="text" />}
                {type === 'note-todos' &&
                    todos.map((todo, idx) => {
                        return <input name={idx} key={todoIds[idx]} className="todos" value={todo} onChange={this.handleChange} placeholder="Add Todo" type="text" />
                    })}

                {type === 'note-todos' && <button type="button" onClick={this.addTodo}>+</button>}
                <input className="txt" value={txt} onChange={this.handleChange} placeholder="Add New Text..." type="text" />
                <div className="tools flex">
                    <img className={type === 'note-txt' ? 'mark' : ''} onClick={this.addTypeNote} name="note-txt" src='assets\img\keep\chat.png' alt="" />
                    <img className={type === 'note-todos' ? 'mark' : ''} onClick={this.addTypeNote} name="note-todos" src='assets\img\keep\list1.png' alt="" />
                    <img className={type === 'note-img' ? 'mark' : ''} onClick={this.addTypeNote} name="note-img" src='assets\img\keep\add-image.png' alt="" />
                    <img className={type === 'note-video' ? 'mark' : ''} onClick={this.addTypeNote} name="note-video" src='assets\img\keep\video.png' alt="" />
                    <button onClick={this.onSaveNewNote} type="button">Add Note !</button>
                </div>
            </form>
        )

        // todo = {
        //     adads:'asdd',
        //     title:'a'
        // }

        // todo.title.sort()
    }
}