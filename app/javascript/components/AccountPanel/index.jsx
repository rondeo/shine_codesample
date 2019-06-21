import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Separator from 'components/Separator'
import Button from 'components/Button'
import Field from 'components/Field'
import Input from 'components/Input'
//import css from './style.scss'

class AccountPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className={`
        account-panel
        ${this.props.uppercase ? 'account-panel--uppercase' : ''}
      `}>
        {
          this.props.button
            ?
              <div className="account-panel__button">
                <Button
                  orange={true}
                  text={this.props.button}
                  textTransform={this.props.textTransform}
                  submit={this.props.submit}
                  bigWidth={this.props.bigWidth}
                  transparent={this.props.transparent}
                  onClick={this.props.onClick}
                />
              </div>
            :
              <div>
                {
                  this.props.title
                    ?
                      <div className="account-panel__title">
                        {this.props.title}
                      </div>
                    : ''
                }
                {
                  this.props.input
                    ?
                      <Field
                        label={this.props.label}
                        labelBold={this.props.labelBold}
                      >
                        <Input
                          name={this.props.name}
                          placeholder={this.props.placeholder}
                          type={this.props.type}
                          hasError={this.props.hasError}
                          onChange={this.props.onChange}
                        />
                      </Field>
                    :
                      <div className="account-panel__text">
                        {this.props.text}
                        {this.props.children}
                      </div>
                }
                {
                  this.props.separator
                    ?
                      <div className="account-panel__separator">
                        <Separator />
                      </div>
                    : ''
                }
                {
                  this.props.separatorLast
                    ?
                      <div className="account-panel__separator-last">
                        <Separator />
                      </div>
                    : ''
                }
              </div>
        }
      </div>
    )
  }
}

AccountPanel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  separator: PropTypes.bool,
  separatorLast: PropTypes.bool,
  uppercase: PropTypes.bool,
  button: PropTypes.string,
  bigWidth: PropTypes.bool,
  transparent: PropTypes.bool,
  textTransform: PropTypes.bool,
  input: PropTypes.bool,
  label: PropTypes.string,
  labelBold: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  submit: PropTypes.bool,
}

export default AccountPanel

