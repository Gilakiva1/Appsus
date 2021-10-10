import { eventBusService } from "../../../services/event-bus-service.js";
import { MailDetails } from "../pages/mail-details.jsx";
import { mailService } from "../services/mail.service.js";
const { Route, Link } = ReactRouterDOM


export class EmailPreview extends React.Component {

    state = {
        email: null,
        isRead: null
    }


    componentDidMount() {
        let { email,isRead } = this.state
        email = mailService.getEmailById(this.props.id)
        isRead = email.isRead
        this.setState({ email,isRead })
    }


    onDeleteEmail = () => {
        const { email } = this.state
        if (!email.isTrash && !email.isDraft) {
        email.isTrash = true
       mailService.saveUpdatedEmail(email,'trash')
       eventBusService.emit('filter/sort-change', email)
       eventBusService.emit('user-msg', 'email moved to trash')
    } else {
        mailService.deleteEmail(email.id)
        eventBusService.emit('user-msg', 'email deleted successfully')
        }
        this.props.toggleEmailPreview(null)
    }


    toggleIsReadEmail = () => {
       let {isRead,email} = this.state
       email.isRead = !email.isRead
       mailService.saveUpdatedEmail(email,'read')
       isRead = !isRead
       this.setState({isRead,email})
       this.props.loadEmails()
       eventBusService.emit('unread-emails-change', '')
    }



 
    render() {
        const { email,isRead } = this.state
        if (!email) return 'loading...'
        return <div className="preview-container">
            <div className="flex space-between">
                <h1>{email.subject}</h1>
                <div>
                <button className="preview-btn"><img  onClick={() => this.toggleIsReadEmail()} src={isRead ? 'assets/img/mail/open-envelope.png':'assets/img/mail/envelope.png' } /></button>
                    <button className="preview-btn"><img src="assets/img/mail/trash.png" onClick={() => this.onDeleteEmail()} /></button>
                    <Link onClick={()=>this.props.getSelectedEmail(email)} to="/mail/details"> <button className="preview-btn"> <img src="assets/img/mail/full-screen.png" /> </button> </Link>
                </div>
            </div>
            <h4 className="preview-sub-header">{email.from.substring(0, email.from.indexOf('@'))}{'  '}{'<'}{email.from}{'>'}</h4>
            <p>{email.body}</p>
        </div>
        
    }


}