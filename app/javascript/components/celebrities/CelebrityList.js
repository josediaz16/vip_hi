import React from 'react'
// External Dependencies
import ReactPaginate from 'react-paginate'
import AutoSuggest   from 'react-autosuggest'
import { debounce }  from 'throttle-debounce'

// Util Functions
import { getRequest, isPresent } from 'components/Utils'

class CelebrityList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: props.initial_results,
      searchText: '',
      pageNumber: 1
    }
  }

  componentWillMount() {
    this.onSuggestionsFetch = debounce(500, this.onSuggestionsFetch)
  }

  // Begin AutoComplete Handlers
  onSuggestionsFetch = ({value}) => {
    getRequest(this.props.search_url, {query: value, page: this.state.pageNumber})
      .then(this.handleSuccess)
  }

  onSuggestionsClear = () => {
    setTimeout(() => {
      const value = isPresent(this.state.searchText) ? this.state.searchText : "*"
      this.onSuggestionsFetch({value})
    }, 100)
  }

  handleSuccess = (search) => this.setState({search})

  onSuggestionSelected = (value) => {
    this.setState({searchText: value}, () => {
      this.onSuggestionsFetch({value})
    })
  }

  onChangeInput = (event, { newValue }) => this.setState({searchText: newValue, pageNumber: 1})

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
  // End AutoComplete Handlers

  handlePageClick = (data) => {
    this.setState({pageNumber: data.selected + 1}, this.onSuggestionsClear)
  }

  render() {
    const { search, searchText } = this.state
    const { search_url, t } = this.props

    const inputProps = {
      id: "search_celebrity",
      placeholder: t.placeholders.search,
      value: searchText,
      onChange: this.onChangeInput
    }

    return (
      <div>
        <AutoSuggest
          suggestions={search.results}
          inputProps={inputProps}
          onSuggestionsFetchRequested={this.onSuggestionsFetch}
          onSuggestionsClearRequested={this.onSuggestionsClear}
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={this.getSuggestionValue}
        />

        { search.suggestions.length > 0 &&
          <div className="suggestions">
            <span>{`${t.labels.did_you_mean}? `}</span>
            <a onClick={this.onSuggestionSelected.bind(this, search.suggestions[0])}>
              {search.suggestions[0]}
            </a>
          </div>
        }

        <div className="results">
          {
            search.results.map((item, index) => {
              return (
                <div id={`celebrity_${item.id}`} key={index} style={{display: "inline-block"}}>
                  <img src={item.photo_url} style={{width: "200px", height: "200px"}}/>
                  <h4>{item.known_as}</h4>
                  <p>{item.biography}</p>
                  <span>{item.country}</span>
                  <a href={item.detail_path}>{t.actions.request_message}</a>
                </div>
              )
            })
          }
        </div>

        <ReactPaginate
          previousLabel={t.pagination.labels.previous}
          nextLabel={t.pagination.labels.next}
          breakLabel='...'
          pageCount={search.pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
        />

      </div>
    )
  }
}

export default CelebrityList
