/* import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  onforwarding = () => {
    const {history} = this.props
    history.push('/')
  }

  onSubmiting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const Url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(Url, options)
    await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onforwarding()
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.onSubmiting}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm  */

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangingPassword = event => {
    this.setState({password: event.target.value})
  }

  onChangingName = event => {
    this.setState({username: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    // console.log(jwtToken)
  }

  onFailure = error => {
    this.setState({errorMsg: error, showErrorMsg: true})
  }

  onSubmitting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  userNameInput = () => {
    const {username} = this.state
    return (
      <>
        <div className="formItem">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="for-input"
            type="text"
            placeholder="username"
            value={username}
            onChange={this.onChangingName}
            required
          />
        </div>
      </>
    )
  }

  userPasswordInput = () => {
    const {password} = this.state

    return (
      <>
        <div className="formItem">
          <label htmlFor="password">Password</label>
          <input
            className="for-input"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={this.onChangingPassword}
            required
          />
        </div>
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="Login-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              alt="login"
              className="Login-image"
            />
          </div>

          <form onSubmit={this.onSubmitting} className="form-element">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="login"
              className="Login-logo"
            />
            <div className="first">{this.userNameInput()}</div>
            <div className="first sec">{this.userPasswordInput()}</div>
            {showErrorMsg && <p>*{errorMsg}</p>}
            <button className="form-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm
