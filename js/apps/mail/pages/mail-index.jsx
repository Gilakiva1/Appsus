import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { AddEmail } from "../cmps/mail-add.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./mail-details.jsx"
const { Route, Link } = ReactRouterDOM


export class MailApp extends React.Component {


    state = {
        filterBy: {
            folder: 'all'
        },
        reload: false,
        sortBy: '',
        emailForDetails: null
    }

    removeEventBus;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('unread-emails-change', () => {
            this.getUnreadEmails()
            let { reload } = this.state
            this.setState({ reload: !reload })

        })
    }

    componentWillUnmount() {
        this.removeEventBus()
    }


    filterBy = (folder) => {
        let { filterBy } = this.state
        filterBy.folder = folder
        this.setState({ filterBy })
        eventBusService.emit('filter/sort-change', folder)
    }


    addMail = () => {
        return <AddEmail />
    }

    mailList = () => {
        return <MailList filterBy={this.state.filterBy} sortBy={this.state.sortBy} getSelectedEmail={this.getSelectedEmail} />
    }

    mailDetails = () => {

        return <MailDetails email={this.state.emailForDetails} />

    }

    getSelectedEmail = (email) => {
        let { emailForDetails } = this.state
        emailForDetails = email
        this.setState({ emailForDetails })
    }

    getUnreadEmails = () => {
        return mailService.getUnreadEmailsNum()
    }

    onSortEmails = (sort) => {
        let {sortBy} = this.state
        sortBy = sort.target.value
        this.setState({ sortBy })
        eventBusService.emit('filter/sort-change', sortBy)
    }


    render() {
        return <main className="main-container-mail flex">
            <section className="menu-container-mail flex column">
                <div className="upper-menu-container-mail flex ">
                    <Link to="/mail/compose"><button className="btn-new-email"><span>+</span> Compose</button></Link>
                    <p className="unread">Unread emails: <span className="unread-num"> {this.getUnreadEmails()}</span></p>
                </div>
                <ul className="menu-mail">
                    <MailFolderList filterBy={this.filterBy} />
                </ul>
                <p className="sort-select">Sort: <select name="sort" id="sort" onChange={() => this.onSortEmails(event)}>
                    <option value="">Choose sort</option>
                    <option value="date">By Date</option>
                    <option value="title">By Title</option>
                </select></p>
            </section>
            <Route path="/mail/compose" component={this.addMail} />
            <Route path="/mail" exact component={this.mailList} />
            <Route path="/mail/details" component={this.mailDetails} />



        </main>



    }


}

