import { eventBusService } from "../../../services/event-bus-service.js";
import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service.js";


const { withRouter } = ReactRouterDOM

class _AddEmail extends React.Component {

    state = {
        email: {
            to: '',
            subject: '',
            body: '',
            id: '',
            sentAt: '',
            from: '',
            isRead: '',
            isStar: '',
            isTrash: '',
            isDraft: ''
        },
        saveInterval: null,

    }




    componentDidMount() {
        const { email } = this.state
        email.id = utilService.makeId()
        this.setState({ email })
        this.state.saveInterval = setInterval(() => {
            let draftEmail = {}
            draftEmail.from = mailService.getUserEmail()
            draftEmail.id = email.id
            draftEmail.sentAt = Date.now()
            draftEmail.isRead = true
            draftEmail.isStar = false
            draftEmail.isTrash = false
            draftEmail.isDraft = true
            draftEmail.subject = email.subject
            draftEmail.body = email.body
            draftEmail.to = email.to
            if (mailService.checkForDraft(draftEmail.id)) {
                mailService.deleteEmail(draftEmail.id)
            }
            mailService.addEmail(draftEmail)
            console.log('draft saved* (does\'nt fully work yet)');
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.state.saveInterval)
    }


    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ email: { ...this.state.email, [field]: value } });
    }


    onSubmit = (ev) => {
        ev.preventDefault()
        let { email } = this.state

        email.sentAt = Date.now()
        email.from = mailService.getUserEmail()
        email.isRead = true
        email.isStar = false
        email.isTrash = false
        email.isDraft = false
        email.subject = email.subject = email.subject.charAt(0).toUpperCase() + email.subject.slice(1);
        this.setState({ email })
        if (mailService.checkForDraft(email.id)) {
            mailService.deleteEmail(email.id)
        }
        mailService.addEmail(email)
        this.props.history.push(`/mail`);
        eventBusService.emit('user-msg', 'email sent successfully')
    }

    goBack = () => {
        this.props.history.push('/mail')
    }



    render() {
        return <form className="email-form" onSubmit={this.onSubmit}>
            <header className="header-form">New Email</header>
            <label htmlFor="to">To:</label>
            <input
                type="text"
                id="to"
                name="to"
                className="to-form"
                onChange={this.handleChange}
            />
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                id="subject"
                name="subject"
                className="subject-form"
                onChange={this.handleChange}
            />
            <label htmlFor="body">Content:</label>
            <textarea
                type="text"
                id="body"
                name="body"
                className="body-form"
                onChange={this.handleChange}>
            </textarea>
            <button className="btn-send">Send</button>
            <img className="btn-trash trash-form" src="../../../assets/img/mail/trash.png" onClick={this.goBack} />
        </form>
    }
}

export const AddEmail = withRouter(_AddEmail)