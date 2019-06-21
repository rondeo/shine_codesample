import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Add from 'components/Add'
import Button from 'components/Button'
import Action from 'components/Action'
import Pagination from 'components/Pagination'
//import css from './style.scss'

class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div
        className={`
          panel
          ${this.props.noMobileBorder ? 'panel--without-mobile-border' : ''}
          ${this.props.fullWidth ? 'panel--full-width' : ''}
          ${this.props.textLeft ? 'panel--text-left' : ''}
          ${this.props.accountPageSubtitle ? 'panel--account-page-subtitle' : ''}
          ${this.props.accountPage ? 'panel--account-page' : ''}
          ${this.props.borderBottom ? 'panel--border-bottom' : ''}
          ${this.props.action ? 'panel--with-action' : ''}
          ${this.props.small ? 'panel--small' : ''}
          ${this.props.center ? 'panel--center' : ''}
          ${this.props.button ? 'panel--button' : ''}
          ${this.props.withoutBorder ? 'panel--withoutBorder' : ''}
          ${this.props.noOverflow ? 'panel--no-overflow' : ''}
          ${this.props.noContentPadding ? 'panel--without-content-padding' : ''}
          ${this.props.boxShadow ? 'panel--boxshadow' : ''}
          ${this.props.noScroll ? 'panel--noscroll' : ''}
        `}
        style={this.props.style}
        id={this.props.id}
      >
        {
          this.props.noTitle
            ?
              ''
            :
              <div className={`
                panel__title
                ${this.props.noTitleBorder ? 'panel__title--noBorder' : ''}
                `}
              >
                <div className="panel__title-content">
                  <div className="panel__title-content_text">
                    <span className={`
                      panel__title__header
                      ${this.props.boldTitle ? 'panel__title__header--bold' : ''}
                    `}>
                      {this.props.title}
                    </span>
                    {
                      this.props.subtitle && this.props.subtitle.length > 0
                        ?
                          <div>
                            <div className="panel__title__subtitle">
                              {this.props.subtitle}
                            </div>
                            <div className="panel__pagination">
                              {
                                this.props.pagination
                                  ? <Pagination />
                                  : ''
                              }
                            </div>
                          </div>
                        : ''
                    }
                  </div>
                  {
                    this.props.action
                      ?
                        <Add
                          onClick={this.props.action}
                        />
                      :
                        ''
                  }
                  {
                    this.props.button
                      ?
                        <div className="panel__button">
                          <Button
                            text={this.props.buttonText}
                            mod={this.props.buttonMod}
                            orange={true}
                            small={this.props.smallButton}
                            modalId="1"
                            onClick={this.props.buttonAction}
                          />
                        </div>
                      : ''
                  }
                  {
                    this.props.actionButton
                      ?
                        <Action
                          orange={this.props.orange}
                          text={this.props.text}
                          icon={this.props.icon}
                        />
                      : ''
                  }
                  {
                    this.props.actionButtonWithClick
                      ?
                        <div
                          className={`
                            action
                            ${this.props.orange ? 'action--orange' : ''}
                          `}
                          onClick={this.props.buttonAction}
                        >
                          {
                            this.props.icon
                              ?
                                <span className="action__circle">
                                  {this.props.icon}
                                </span>
                              :
                                ''
                          }
                          {
                            this.props.text
                              ?
                                <span className="action__text">
                                  {this.props.text}
                                </span>
                              :
                                ''
                          }
                        </div>
                      : ''
                  }
                </div>
              </div>
        }
        <div
          className={`
            panel__content
            ${this.props.reverseContent ? 'panel__content--reversed' : ''}
          `}
          style={this.props.contentStyle}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Panel.propTypes = {
  accountPage: PropTypes.bool,
  accountPageSubtitle: PropTypes.bool,
  // text
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  textLeft: PropTypes.bool,
  small: PropTypes.bool,
  fullWidth: PropTypes.bool,
  // buttons
  icon: PropTypes.string,
  action: PropTypes.func,
  buttonAction: PropTypes.func,
  actionButton: PropTypes.bool,
  center: PropTypes.bool,
  button: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonMod: PropTypes.bool,
  smallButton: PropTypes.bool,
  orange: PropTypes.bool,
  // border
  noMobileBorder: PropTypes.bool,
  withoutBorder: PropTypes.bool,
  noContentPadding: PropTypes.bool,
  borderBottom: PropTypes.bool,
  // reversed content
  reverseContent: PropTypes.bool,
  // style the scrolling content panel
  contentStyle: PropTypes.object,
  // hide top section
  noTitle: PropTypes.bool,
  noTitleBorder: PropTypes.bool,
  // all content is visible
  noScroll: PropTypes.bool,
  // panel-wide attrs
  style: PropTypes.object, // style the panel header + body
  id: PropTypes.string,
}

export default Panel

