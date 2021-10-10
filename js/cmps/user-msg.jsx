import { eventBusService } from "../services/event-bus-service.js"

export class UserMsg extends React.Component {

  state = {
    msg: null
  }
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.onCloseMsg, 3000)
      })
    })
  }

  componentWillUnmount() {
    this.removeEventBus()
  }



  onCloseMsg = () => {
    this.setState({ msg: null })
    clearTimeout(this.timeoutId)
  }


  render() {
    const { msg } = this.state
    if (!msg) return <React.Fragment></React.Fragment>
    return (
      <section className={`user-msg`}>
        <h1>{msg}</h1>
        <button className="btn-x" onClick={this.onCloseMsg}>X</button>
      </section>
    )
  }
}
