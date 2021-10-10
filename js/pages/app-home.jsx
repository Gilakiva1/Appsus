const { Link } = ReactRouterDOM
export function Home() {

    return (
        <section className="main-home-container">
            <div className="hero">
                <h1>Welcome To Appsus</h1>
                <h3>The super app that let's you manage your day to day life - emails and notes wrapped in a single app!</h3>
            </div>
            <div className="home-container">
                <div className="apps">
                    <Link className="app-link" to={'/mail'}>MailApp</Link>
                    <img src="assets\img\main\email.png" />
                </div>
                <div className="apps">
                    <Link className="app-link" to={'/keep'}>KeepApp</Link>
                    <img src="assets\img\main\keep.png" />
                </div>
            </div>
        </section>
    )
}