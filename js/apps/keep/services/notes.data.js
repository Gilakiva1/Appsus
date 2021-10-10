export const notes = [
    {
    id: 'n101',
    type: 'note-txt',
    isPinned: true,
    info: {
        title:'my first title',
        txt: 'Fullstack Me Baby!'
    }
}, {
    id: 'n102',
    type: 'note-img',
    info: {
        url: 'https://picsum.photos/id/237/200/300',
        title: 'Bobi and Me',
        txt:'hello'
    },
    style: {
        backgroundColor: '#00d'
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
    }
}];