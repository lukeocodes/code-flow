import React, { Component } from 'react'
import './App.css'
import logo from './logo.svg';
import webhookImg from './webhook.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  fetchData() {
    const headers = new Headers()
    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    const config = {
      method: 'GET',
      headers: headers,
    }

    fetch("/api", config)
      .then(res => res.json())
      .then(
        (items) => {
          this.setState({
            isLoaded: true,
            items: items
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    console.log(this.props)
    const { NEXMO_NUMBER } = this.props
    console.log(NEXMO_NUMBER)
    const { error, isLoaded, items } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Main">
          <div className="Main--Column Main--Column--examples">
              <img className="Img-example-webhook" src={webhookImg} alt="Example Webhook Endpoint" />
          </div>
          <div className="Main--Column">
          {!isLoaded &&
            <h2>Loading</h2>
          }
          {error &&
            <h2>Error: {error}</h2>
          }
          {items.length > 0 &&
            <ul>
              {items.map(item => {
                const numberId = item.msisdn.substr(item.msisdn.length - 3)
                return (
                  <li key={item.messageId}>
                    07xxxxxx{numberId}: {item.text}
                  </li>
                )
              })}
            </ul>
          }
          </div>
        </div>
        <header className="App-footer">
          Message {NEXMO_NUMBER} and see the result!
        </header>
      </div>
    )
  }
}

export default App
