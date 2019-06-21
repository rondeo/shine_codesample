import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import niceSelect from 'jquery-nice-select'
//import fastselect from 'fastselect'
//import css from './style.scss'

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedId: false,
    }

    this.optionSet = []
    this.optionTree = []

    this.listRef = null
    this.DOM = {}

    this.openDropdown = ::this.openDropdown
    this.closeDropdown = ::this.closeDropdown
    this.toggleDropdown = ::this.toggleDropdown
    this.shouldCloseDropdown = ::this.shouldCloseDropdown
    this.closeDropdownIfOutside = ::this.closeDropdownIfOutside
    this.selectOption = ::this.selectOption
    this.onFocus = ::this.onFocus
  }
  componentDidMount() {
    this.DOM = {
      //$select: document.querySelectorAll('.js-select'),
      $multiselect: document.querySelector('.js-multiselect'),
    }

    $(document).on('click touchend', this.closeDropdownIfOutside)
    //$(this.DOM.$multiselect).fastselect()

    this.optionSet = this.optionsById(this.props.options)
    this.optionTree = this.optionsByCategory(this.props.options)
    this.selectDefaultOption(this.props.value, true)
  }
  componentWillReceiveProps(newProps) {
    // create optionSet for lookup on new Options
    if (newProps.options !== this.props.options) {
      this.optionSet = this.optionsById(newProps.options)
      this.optionTree = this.optionsByCategory(newProps.options)
    }

    if (newProps.value !== this.props.value) {
      this.selectDefaultOption(newProps.value)
    }
  }
  componentWillUnmount() {
    $(document).off('click touchend', this.closeDropdownIfOutside)
  }

  optionsById(optionsList) {
    return optionsList.reduce(
      (map, obj) => {
        // lookup key is obj.value
        map[obj.value] = obj
        return map
      },
      {}
    )
  }
  optionsByCategory(options) {
    let optsByCategory = options
      .reduce(
        (acc, opt) => {
          let categoryName = opt.category || 'Other'

          acc[categoryName] = acc[categoryName] || {
            name: categoryName,
            value: null,
            children: [],
          }

          acc[categoryName].children.push(opt)
          return acc
        },
        {}
      )

    return Object.values(optsByCategory)
      .sort((a,b) => {
        if (a.name === "Other") return 1
        return a.name > b.name ? 1 : -1
      })
      .map(cat => {
        cat
          .children
          .sort((a,b) => a.name > b.name ? 1 : -1)

        return cat
      })
  }

  selectDefaultOption(propValue, initialRun=false) {
    // select the option matching the new prop
    // - run once if initialRun is active, even if props match
    if (
      propValue &&
      ((propValue !== this.props.value) || initialRun)
    ) {
      this.selectOption(propValue)()
    }
    // or a default option
    else if (!this.props.value) {
      let selectedOption = this.props.options.filter((o,i) => (
        (o.selected || o.default)
      ))[0]
      this.selectedOption && this.selectOption(selectedOption.value)()
    }
    // display the placeholder value
    else {
      this.setState({
        selectedId: false,
      })
    }
  }
  openDropdown() {
    this.setState({
      open: true,
    })
  }
  closeDropdown() {
    this.setState({
      open: false,
    })
  }
  toggleDropdown() {
    this.setState({
      open: !this.state.open,
    })
  }
  shouldCloseDropdown(target) {
    return (
      target &&
      !this.listRef.contains(target)
    )
  }
  closeDropdownIfOutside(e) {
    if (this.shouldCloseDropdown(e.target)) {
      this.closeDropdown()
    }
  }
  // option.value is currently being used as `id`
  selectOption(id) {
    return () => {
      this.setState({
        selectedId: id.toString().toLowerCase(),
      }, () => {
        // fire onChange handler
        let selectedOption = this.optionSet[this.state.selectedId]

        let selectedOptionVal = selectedOption && selectedOption.value
        if (this.props.onChange) {
          this.props.onChange({
            target: {
              value: selectedOptionVal,
              // the Component `name` for some reason?
              name: this.props.name,
            }
          })
        }
      })
    }
  }
  onFocus() {
    this.openDropdown()
  }

  renderSubMenu(options) {
    if (!options || !options.length || options.length < 1) return ''

    return (
      <ul
        className={`
            list
            ${this.props.noMaxHeight ? 'list--noMaxHeight' : ''}
            ${this.props.isLeft ? 'list__left' : ''}
            ${this.props.isRight ? 'list__right' : ''}
          `}
        >
          {
            options.map(optionNode => (
              <li
                key={optionNode.name}
                data-value={optionNode.value}
                className={`
                  option
                  ${
                    optionNode.children &&
                    optionNode.children.length > 0
                    ? 'option--hasChildren'
                    : ''
                  }
                  ${this.state.selectedId === optionNode.value ? 'selected' : ''}
                `}
                onClick={this.selectOption(optionNode.value)}
              >
                {optionNode.name}
                {
                  this.renderSubMenu(optionNode.children)
                }
              </li>
            ))
          }
        </ul>
    )
  }

  render() {
    return (
      <div
        className={`
          nice-select
          js-select
          select
          ${this.props.isBig ? 'select--big' : ''}
          ${this.props.isMultiselect ? 'js-multiselect' : ''}
          ${this.state.open ? 'open' : ''}
          ${this.props.hasError ? 'select--error' : ''}
        `}
        style={this.props.style}
        onClick={this.toggleDropdown}
        ref={node => this.listRef = node}
        tabIndex={0}
      >
        <span
          className="option displayed selected"
        >
          {
            this.state.selectedId && this.props.options.length > 0
              ? this.optionSet[this.state.selectedId] && this.optionSet[this.state.selectedId].name
              : this.props.placeholder
          }
        </span>
        {
          this.renderSubMenu(this.optionTree)
        }
      </div>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  isBig: PropTypes.bool,
  isMultiselect: PropTypes.bool,
  isLeft: PropTypes.bool,
  isRight: PropTypes.bool,
  noMaxHeight: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  hasError: PropTypes.bool,
}

Select.defaultProps = {
  options: [],
  isBig: false,
  isMultiselect: false,
  noMaxHeight: false,
  placeholder: 'Please Select',
  hasError: false,
}

export default Select

