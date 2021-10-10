import { eventBusService } from '../../../services/event-bus-service.js';
import { mailService } from '../services/mail.service.js'
import { EmailPreview } from './mail-preview.jsx'


export class MailList extends React.Component {

    state = {
        emails: null,
        emailPreviewId: null,
        sortBy : null
    }

    removeEventBus;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('filter/sort-change', () => {
            this.loadEmails()
        })

        this.loadEmails()
    }

    componentWillUnmount() {
        this.removeEventBus()
    }

    loadEmails = () => {
        mailService.query(this.props.filterBy).then(emails => {
            if (this.state.sortBy !== this.props.sortBy) {
                let { sortBy } = this.state
                sortBy = this.props.sortBy
              emails =  this.sortEmails(sortBy,emails)
            }
            this.setState({ emails })
        })
    }


    sortEmails = (sortBy,emails) => {
        switch (sortBy) {
            case 'date':
                emails = emails.sort((a, b) => b.sentAt - a.sentAt)
                break;
                case 'title' :
                emails = emails.sort((a, b) => (a.subject > b.subject) ? 1 : (b.subject > a.subject) ? -1 : 0)
                break;
        }
        return emails
    }

    showDate = (date) => {
        date = new Date(date)
        let fullDate = date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() + ":"
        if (date.getMinutes() < 10) {
            fullDate += '0' + date.getMinutes()
        } else fullDate += date.getMinutes()
        return fullDate
    }

    toggleEmailPreview = (email) => {
        let { emailPreviewId, emails } = this.state
        if (!email) {
            this.loadEmails()
            return
        }
        emailPreviewId = email.id
        email.isRead = true
        mailService.saveUpdatedEmail(email,'read')
        this.loadEmails()
        this.setState({ emails, emailPreviewId })
        eventBusService.emit('unread-emails-change', '')
    }

    isEmailRead = (isRead) => {
        if (isRead) return 'assets/img/mail/open-envelope.png'
        else return 'assets/img/mail/envelope.png'
    }
    

    toggleIsStarEmail = (email) => {
        email.isStar = !email.isStar
        mailService.saveUpdatedEmail(email,'star')
        this.loadEmails()
     }


    render() {
        const { emails, emailPreviewId } = this.state
        if (!emails) return 'Loading...'
        return <section className="email-list-container flex column">
            {emails.map(email => {
                if (email.id === emailPreviewId) return <EmailPreview key={email.id} getSelectedEmail={this.props.getSelectedEmail} isEmailRead={this.isEmailRead} id={emailPreviewId} loadEmails={this.loadEmails} toggleEmailPreview={this.toggleEmailPreview} />
                return <div key={email.id} className="big-email-container flex" >
                     <div className="star-container">  <img className="btn-email-container star" onClick={()=>this.toggleIsStarEmail(email)} src={email.isStar ? 'assets/img/mail/yellow-star.png': 'assets/img/mail/star.png'}  />  </div>
                    
                <div key={email.id} onClick={() => this.toggleEmailPreview(email)} className="email-container flex space-between">
                    <div className="email-left-container flex">
                    <p><span className={email.isRead ? '' : 'bold'}> {email.from.substring(0, email.from.indexOf('@'))}</span></p>
                    </div>
                    <p> <span className={email.isRead ? '' : 'bold'}>{email.subject}</span></p>
                    <div className="email-right-container flex">
                        <img className="btn-email-container" src={this.isEmailRead(email.isRead)} />
                        <p><span className={email.isRead ? '' : 'bold'}>{this.showDate(email.sentAt)}</span></p>
                    </div>
                </div>
                </div>
            })}
        </section>
    }

}

