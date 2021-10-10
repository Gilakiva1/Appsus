const { Link} = ReactRouterDOM


export function AppHeader() {


    return (
        <div className="header-container">
            <div className="flex" >
            <p className="headline">Appsus</p>
            <img className="logo" src="./assets/img/main/logo.png"/>
            </div>
            <div className="links-container">
                <Link className="home" to={'/'}><img src="assets\img\main\home.png" /></Link> 
                <Link className="about" to={'/about'}><img src="assets\img\main\about.png" /></Link> 
                <Link className="mail" to={'/mail'}><img src="assets\img\main\mail.png" /></Link> 
                <Link className="keep" to={'/keep'}><img src="assets\img\main\note.png" /></Link> 
            </div>

        </div>
    )
}