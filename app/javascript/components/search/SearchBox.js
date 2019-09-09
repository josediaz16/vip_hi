import React         from 'react'
import AutoSuggest   from 'react-autosuggest'
import Icon          from 'components/inputs/Icon'
import classNames    from 'classnames'

const getSuggestionValue = (suggestion) => {
  return suggestion.known_as
}

const renderSuggestion = (suggestion) => {
  return (
   <span>{suggestion.known_as}</span>
  )
}

const onKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.target.blur()
  }
}

const SearchBox = ({
    t,
    search,
    searchText,
    onChangeInput,
    onSuggestionAccepted,
    ...autoSuggestProps
  }) => {

  const withSuggestions = search.suggestions.length > 0 && search.results.length === 0

  const inputProps = {
    id: "search_celebrity",
    placeholder: t.placeholders.search,
    value: searchText,
    onChange: onChangeInput,
    onKeyDown: onKeyDown,
    className: classNames("react-autosuggest__input", {"with-suggestion": withSuggestions})
  }

  return (
    <div className="search-box-component">
      <AutoSuggest
        inputProps={inputProps}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        suggestions={search.results}
        {...autoSuggestProps}
      />

      { withSuggestions &&
        <div className="suggestions">
          <span>
            {`${t.labels.did_you_mean} `}

            <a onClick={() => onSuggestionAccepted(search.suggestions[0])}>
              {search.suggestions[0]}
            </a>
            ?
          </span>
        </div>
      }

      <Icon
        icon="enter-1"
        className="search show-on-mobile-only"
      />
    </div>
  )
}

export default SearchBox
