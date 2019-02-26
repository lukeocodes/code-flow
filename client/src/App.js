import React, { Component } from 'react'
import './App.css'
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
    const { error, isLoaded, items } = this.state
    return (
      <div className="App">
        <header className="App-header">
        Nexmo
        </header>
        <div class="Row">
          <div class="Column Column--examples">
              <img class="Img-example-webhook" src={webhookImg} alt="Example Webhook Endpoint" />
          </div>
          <div class="Column">
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
      </div>
    )
  }
}

export default App
