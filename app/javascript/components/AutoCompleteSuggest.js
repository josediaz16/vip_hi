import React from 'react'

import AutoSuggest  from 'react-autosuggest'
import { debounce } from 'throttle-debounce'

import { getRequest, isPresent } from 'components/Utils'

class AutoCompleteSuggest extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  componentDidUpdate(prevProps) {
    const { externalSuggestion } = this.props

    if (isPresent(externalSuggestion) && externalSuggestion !== prevProps.externalSuggestion ) {
      this.setState({value: externalSuggestion}, () => {
        this.onSuggestionsFetchRequested({value: externalSuggestion})
      })
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    getRequest(this.props.endpoint, {query: value})
      .then(this.handleSuccess)
  }

  onSuggestionsClearRequested = () => {
    setTimeout(() => {
      const value = isPresent(this.state.value) ? this.state.value : "*"
      this.onSuggestionsFetchRequested({value})
    }, 100)
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.known_as
  }

  renderSuggestion = (suggestion) => {
    return (
      <div className="autocomplete-result">
        <span>{`${suggestion.country} - `}</span>
        <strong>{suggestion.known_as}</strong>
      </div>
    )
  }

  handleSuccess = (data) => {
    this.setState({suggestions: data.results}, () => {
      this.props.onResultsFetched(data)
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({value: newValue})
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Search a celebrity',
      value,
      onChange: this.onChange
    }

    return (
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default AutoCompleteSuggest

