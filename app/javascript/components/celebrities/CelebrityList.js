import React from 'react'
// External Dependencies
import ReactPaginate from 'react-paginate'
import AutoSuggest   from 'react-autosuggest'
import { debounce }  from 'throttle-debounce'
import classNames    from 'classnames'

import CelebrityCard  from 'components/celebrities/CelebrityCard'
import Footer         from 'components/footer'
import NavBar         from 'components/NavBar'

// Util Functions
import { getRequest, isPresent } from 'components/Utils'

const getUrlParams = () => {
  return new URLSearchParams(window.location.search)
}

class CelebrityList extends React.Component {
  constructor(props) {
    super(props)

    const searchText = getUrlParams().get("search")

    this.state = {
      search: props.initial_results,
      searchText: searchText || '',
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
     <span>{suggestion.known_as}</span>
    )
  }
  // End AutoComplete Handlers

  handlePageClick = (data) => {
    this.setState({pageNumber: data.selected + 1}, this.onSuggestionsClear)
  }

  onKeyDown = (event) => {
    event.target.blur()
  }

  render() {
    const { search, searchText } = this.state
    const { search_url, t, logoPath } = this.props

    const inputProps = {
      id: "search_celebrity",
      placeholder: t.placeholders.search,
      value: searchText,
      onChange: this.onChangeInput,
      onKeyDown: this.onKeyDown,
      className: classNames("react-autosuggest__input", {"with-suggestion": search.suggestions.length > 0})
    }

    return (
      <React.Fragment>
        <NavBar />
        <div className="search-page">
          <div className="top-section stretch">
            <div className="search-box-instructions">
              <h1>!Hola!</h1>
              <p>que tal si buscas tu celebridad favorita para..... </p>
            </div>
            <div className="search-box-component">
              <AutoSuggest
                suggestions={search.results}
                inputProps={inputProps}
                onSuggestionsFetchRequested={this.onSuggestionsFetch}
                onSuggestionsClearRequested={this.onSuggestionsClear}
                renderSuggestion={this.renderSuggestion}
                getSuggestionValue={this.getSuggestionValue}
              />

              { search.suggestions.length > 0 && search.results.length === 0 &&
                <div className="suggestions">
                  <span>
                    {`${t.labels.did_you_mean} `}

                    <a onClick={this.onSuggestionSelected.bind(this, search.suggestions[0])}>
                      {search.suggestions[0]}
                    </a>
                    ?
                  </span>
                </div>
              }
            </div>

          </div>
          <div className="results-wrapper">
            <div className="result-section">
              { search.results.length > 0 &&
                <React.Fragment>
                  <h3 className="section-title">Resultados de tu busqueda</h3>
                  <div className="results-grid">
                    {
                      search.results.map((item, index) => {
                        return <CelebrityCard key={index} {...item}/>
                      })
                    }
                  </div>
                </React.Fragment>
              }

              { search.results.length === 0 &&
                <div className="no-results">
                  <h4>Oops, no encontramos resultados para tu busqueda!</h4>
                </div>
              }
            </div>
            { search.pages > 1 &&

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
            }
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default CelebrityList
