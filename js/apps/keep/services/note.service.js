
import { utilService } from '../../../services/util.service.js';
import {storageService} from '../../../services/storage.service.js'
export const noteService = {
    query,
    setTodosDoneAt,
    removeTodo,
    setEditTxt,
    saveNewNote,
    removeAllNote,
    changeColorNote
}
const KEY = 'keepDb'
var gNotes ;
_createNotes()

function changeColorNote(note, backgroundColor) {
    var noteIdx = findNoteById(note.id);
    
    gNotes[noteIdx].style = {backgroundColor}

}

function removeAllNote(note) {
    var noteIdx = findNoteById(note.id);
    gNotes.splice(noteIdx, 1);
    _saveToStorage()
    return Promise.resolve();
}

function saveNewNote(newNote) {
    var note
    if (newNote.type === 'note-txt') {
        note = {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: newNote.title,
                txt: newNote.txt
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }
    } else if (newNote.type === 'note-img') {

        note = {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            info: {
                title: newNote.title,
                url: newNote.url,
                txt: newNote.txt
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }
    } else if (newNote.type === 'note-todos') {
        note = {
            id: utilService.makeId(),
            type: 'note-todos',
            info: {
                label: newNote.title,
                todos: addDoneAt(newNote.todos)
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }
    } else if (newNote.type === 'note-video') {
        note = {
            id: utilService.makeId(),
            type: 'note-video',
            isPinned: false,
            info: {
                title: newNote.title,
                url: newNote.url,
                txt: newNote.txt
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }
    }
    gNotes.push(note)
    _saveToStorage()
}

function addDoneAt(todosNote) {
    var newTodos = []
    for (var i = 0; i < todosNote.length; i++) {
        newTodos.push({
            txt: todosNote[i],
            doneAt: null
        })
    }
    return newTodos

}

function query(filterBy) {
    if (filterBy) {
        const carsToShow = gNotes.filter(note => {
            return note.type.includes(filterBy) 
                
        })
        return Promise.resolve(carsToShow)
    }
    return Promise.resolve(gNotes)
}


function setTodosDoneAt(noteTodo, todosIdx, isChecked) {
    var idx = findNoteById(noteTodo.id)
    if (isChecked) gNotes[idx].info.todos[todosIdx].doneAt = Date.now();
    else gNotes[idx].info.todos[todosIdx].doneAt = null
}

function findNoteById(noteId) {
    return gNotes.findIndex(note => {
        return note.id === noteId
    })
}

function removeTodo(noteId, todoIdx) {
    let noteIdx = findNoteById(noteId)
    gNotes[noteIdx].info.todos.splice(todoIdx, 1)
    if (!gNotes[noteIdx].info.todos.length) {
        gNotes.splice(noteIdx, 1)
    }
    _saveToStorage()

    return Promise.resolve()
}

function setEditTxt(txt, noteId, type) {
    var noteIdx = findNoteById(noteId);
    if (txt === '') {
        gNotes[noteIdx].info[type] = txt;
    }
    gNotes[noteIdx].info[type] = txt;
}

function _createNotes() {
    let notes = storageService.loadFromStorage(KEY)
    if (!notes || notes.length < 1) {
        notes = [{
            id: 'n101',
            type: 'note-txt',
            isPinned: true,
            info: {
                title: 'my first title',
                txt: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }, {
            id: 'n102',
            type: 'note-img',
            info: {
                url: 'assets/img/keep/yaron.jpeg',
                title: 'always remember',
                txt: ''
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }, {
            id: 'n103',
            type: 'note-todos',
            info: {
                label: 'Get my stuff together',
                todos: [{
                    txt: 'Driving liscence',
                    doneAt: null
                }, {
                    txt: 'Coding power',
                    doneAt: 187111111
                }]
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            info: {
                title: 'my first title',
                txt: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            info: {
                title: 'my first title',
                txt: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: true,
            info: {
                title: 'my first title',
                txt: 'Fullstack Me Baby!'
            },
            style: {
                backgroundColor: '#a8e6cf'
            }
        }];
        gNotes = notes
        storageService.saveToStorage(KEY, gNotes)
    }
    gNotes = storageService.loadFromStorage(KEY)
}

function _saveToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}