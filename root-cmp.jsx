const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { KeepApp } from "./js/apps/keep/pages/note-index.jsx"
import { MailApp } from "./js/apps/mail/pages/mail-index.jsx"
import { AppHeader } from "./js/cmps/app-header.jsx"
import { UserMsg } from "./js/cmps/user-msg.jsx"
import { About } from "./js/pages/app-about.jsx"
import { Home } from "./js/pages/app-home.jsx"

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
                <UserMsg/>
            </header>
            <main>
                <Switch>
                    <Route path="/mail" component={MailApp} />
                    <Route path="/keep" component={KeepApp} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
        </Router>
    )
}



