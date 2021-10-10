import { eventBusService } from "../../../services/event-bus-service.js"
import { mailService } from "../services/mail.service.js"

const { withRouter } = ReactRouterDOM


export class _MailDetails extends React.Component {


    state = {
        email: null
    }



    componentDidMount() {
        let { email } = this.state
        email = this.props.email
        this.setState({ email })
        console.log(this.state.email);
    }




    onDeleteEmail = () => {
        const { email } = this.state
        if (!email.isTrash) {
        email.isTrash = true
       mailService.saveUpdatedEmail(email,'trash')
       eventBusService.emit('filter/sort-change', email)
       eventBusService.emit('user-msg', 'email moved to trash')

        } else {
            mailService.deleteEmail(email.id)
        eventBusService.emit('user-msg', 'email deleted successfully')
        }
       this.props.history.push('/mail')
    }


    toggleIsReadEmail = () => {
        let {email} = this.state
        email.isRead = !email.isRead
        mailService.saveUpdatedEmail(email,'read')
        this.setState({email})
        eventBusService.emit('unread-emails-change', '')
     }

    render() {
        const { email } = this.state
        if (!email) return 'loading...'
        return <div className="details-container flex">
            <div className="datails-head-container">
                <div className="details-header-container flex ">
                    <h1>{email.subject}</h1>
                    <div>
                        <button className="preview-btn"><img onClick={() => this.toggleIsReadEmail()} src={email.isRead ? '../../../assets/img/mail/open-envelope.png' : '../../../assets/img/mail/envelope.png'} /></button>
                        <button className="preview-btn"><img src="assets/img/mail/trash.png" onClick={() => this.onDeleteEmail()} /></button>
                    </div>
                </div>
                    <h4 className="preview-sub-header">From: {email.from.substring(0, email.from.indexOf('@'))}{'  '}{'<'}{email.from}{'>'}</h4>
                    <h4 className="preview-sub-header">To: {email.to.substring(0, email.to.indexOf('@'))}{'  '}{'<'}{email.to}{'>'}</h4>
            </div>
            <p>{email.body}</p>
        </div>
    }

}

export const MailDetails = withRouter(_MailDetails)
