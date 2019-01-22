import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from './utils/constants'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      windowWidth: window.innerWidth,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: window.innerWidth,
      })
    })
  }

  render() {
    let { messages, label } = this.props
    const { windowWidth } = this.state

    const weekButtons = (
      <span className="rbc-btn-group">
        <button
          type="button"
          onClick={this.navigate.bind(null, navigate.TODAY)}
        >
          {messages.today}
        </button>
        <button
          type="button"
          onClick={this.navigate.bind(null, navigate.PREVIOUS)}
        >
          {messages.previous}
        </button>
        <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>
          {messages.next}
        </button>
      </span>
    )

    const monthLabel = <span className="rbc-toolbar-label">{label}</span>

    const calenderViewButtons = (
      <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
    )

    if (windowWidth < 500) {
      return (
        <div className="rbc-toolbar">
          {monthLabel}
          {calenderViewButtons}
          {weekButtons}
        </div>
      )
    }
    return (
      <div className="rbc-toolbar">
        {weekButtons}
        {monthLabel}
        {calenderViewButtons}
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

export default Toolbar
