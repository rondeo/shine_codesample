import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Add from 'components/Add'
//import css from './style.scss'

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className={`
          field
          ${this.props.className ? this.props.className : ''}
          ${this.props.add ? 'field--add' : ''}
          ${this.props.length ? 'js-field' : ''}
        `}
      >
        <div className="field__head">
          <label htmlFor={this.props.fieldFor || this.props.id} className="field__label">
            <div className={`
              field__title
              ${this.props.labelBold ? 'field__title--bold' : ''}
            `}>
              {this.props.label}
            </div>
            {
              this.props.subtitle
                ? <div className="field__subtitle">{this.props.subtitle}</div>
                : ''
            }
          </label>
          {
            this.props.add
              ?
                <div className="field__add">
                  {
                    <Add />
                  }
                </div>
              : ''
          }
        </div>
        <div className={`
            field__input
            ${this.props.length ? 'js-field-input' : ''}
          `}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Field.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  fieldFor: PropTypes.string,
  charCount: PropTypes.number,
  subtitle: PropTypes.string,
  add: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelBold: PropTypes.bool,
}

export default Field

