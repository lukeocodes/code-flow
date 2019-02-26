import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import logo from './logo.svg';
import App from './App'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      env: []
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

    fetch("/api/config", config)
      .then(res => res.json())
      .then(
        (env) => {
          this.setState({
            isLoaded: true,
            env: env
          })
        }
      )
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { isLoaded, env } = this.state
    console.log(env.NEXMO_NUMBER)
    if (!isLoaded) {
      return (
        <div className="App">
          <header className="App-hero">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Loading...</h1>
          </header>
        </div>
      )
    }
    if (typeof env.NEXMO_NUMBER === "undefined") {
      return (
        <div className="App">
          <header className="App-hero">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Please configure a NEXMO_NUMBER environment variable.</h1>
          </header>
        </div>
      )
    }
    return (
      <App {...env} />
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'))
