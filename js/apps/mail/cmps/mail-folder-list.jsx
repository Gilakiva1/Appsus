export class MailFolderList extends React.Component {

    state = {
        mark: 'all'
    }

    markFolder = (filter, folder) => {
        let {mark} = this.state
        mark = folder
        this.props.filterBy(filter)
        this.setState({mark})
    }

   render() {
       const {mark} = this.state
        return<React.Fragment>
<button className="btn-folders">Folders</button>

        <div onClick={() => this.markFolder('all', 'all')} className={mark==='all' ? 'mark-folder folder flex ': 'folder flex' } >
    <img src="assets/img/mail/envelope.png" />
    <li className="all">All</li>
</div>
    <div onClick={() => this.markFolder('inbox', 'inbox')} className={mark==='inbox' ? 'folder flex mark-folder': 'folder flex' }>
        <img src="assets/img/mail/inbox.png" />
        <li className="inbox">Inbox</li>
    </div>
    <div onClick={() => this.markFolder('sent', 'sent')} className={mark==='sent' ? 'folder flex mark-folder': 'folder flex' }>
        <img src="assets/img/mail/sent.png" />
        <li className="sent">Sent</li>
    </div>
    <div onClick={() => this.markFolder('star', 'star')} className={mark==='star' ? 'folder flex mark-folder': 'folder flex' }>
    <img className="star" src="assets/img/mail/star.png" />
        <li className="sent">Star</li>
    </div>
    <div onClick={() => this.markFolder('draft', 'draft')} className={mark==='draft' ? 'folder flex mark-folder': 'folder flex' }>
        <img src="assets/img/mail/draft.png" />
        <li className="draft">Draft</li>
    </div>
    <div onClick={() => this.markFolder('trash', 'trash')} className={mark==='trash' ? 'folder flex mark-folder': 'folder flex' }>
        <img src="assets/img/mail/trash.png" />
        <li className="trash">Trash</li>
    </div>
    </React.Fragment >
   }
}