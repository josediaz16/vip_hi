import React         from 'react'
import ReactPaginate from 'react-paginate'
import AutoSuggest   from 'react-autosuggest'
import Footer        from 'components/footer'
import Icon          from 'components/inputs/Icon'

import CelebrityCarousel from 'components/CelebrityCarousel'
import CelebrityCard  from 'components/celebrities/CelebrityCard'
import InfiniteScroll from 'react-infinite-scroll-component'

import { debounce }  from 'throttle-debounce'
import classNames    from 'classnames'

import { getRequest, isPresent } from 'components/Utils'

const getUrlParams = () => {
  return new URLSearchParams(window.location.search)
}

class HomePage extends React.Component {
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

  // Events
  // This function makes http request
  onSuggestionsFetch = ({value}, handleSuccess) => {
    getRequest(this.props.search_url, {query: value, page: this.state.pageNumber})
      .then(handleSuccess)
  }

  // Event fired when input is backspaced
  onSuggestionsClear = () => {
    setTimeout(() => {
      const value = isPresent(this.state.searchText) ? this.state.searchText : "*"
      this.onSuggestionsFetch({value}, this.handleSuccessSearch)
    }, 100)
  }

  // Event fired when misspelled suggestion is selected
  onSuggestionSelected = (value) => {
    this.setState({searchText: value}, () => {
      this.onSuggestionsFetch({value}, this.handleSuccessSearch)
    })
  }

  // Event fired when scrolling down
  onFetchScroll = () => {
    const value = isPresent(this.state.searchText) ? this.state.searchText : "*"

    this.setState({pageNumber: this.state.pageNumber + 1}, () => {
      this.onSuggestionsFetch({value}, this.handleSuccessScroll)
    })
  }

  // Event fired when autosuggest item is selected
  onItemSuggestionSelected = (event, {suggestion}) => {
    window.location.assign(`celebrities/${suggestion.id}`)
  }

  // Event fired when input value changes
  onChangeInput = (event, { newValue }) => {
    const value = isPresent(this.state.searchText) ? this.state.searchText : "*"
    this.setState({searchText: newValue, pageNumber: 1}, () => {
      this.onSuggestionsFetch({value}, this.handleSuccessSearch)
    })
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }

  handleSuccessScroll = ({results, ...otherProps}) => {
    const search = {
      results: this.state.search.results.concat(results),
      ...otherProps
    }
    this.setState({search})
  }

  handleSuccessSearch = (search) => this.setState({search, pageNumber: 1})

  getSuggestionValue = (suggestion) => {
    return suggestion.known_as
  }

  renderSuggestion = (suggestion) => {
    return (
     <span>{suggestion.known_as}</span>
    )
  }

  render() {
    const { search, searchText } = this.state
    const { search_url, t, most_recent, favorites } = this.props

    const withSuggestions = search.suggestions.length > 0 && search.results.length === 0

    const inputProps = {
      id: "search_celebrity",
      placeholder: t.placeholders.search,
      value: searchText,
      onChange: this.onChangeInput,
      onKeyDown: this.onKeyDown,
      className: classNames("react-autosuggest__input", {"with-suggestion": withSuggestions})
    }

    return (
      <React.Fragment>
        <div className="search-page">
          <div className="top-section">
            <div className="search-box-instructions">
              <h1>{t.titles.main}</h1>
              <p>{t.titles.description}</p>
            </div>
            <div className="search-box-component">
              <AutoSuggest
                suggestions={search.results}
                inputProps={inputProps}
                onSuggestionsFetchRequested={this.onSuggestionsFetch}
                onSuggestionsClearRequested={this.onSuggestionsClear}
                renderSuggestion={this.renderSuggestion}
                getSuggestionValue={this.getSuggestionValue}
                onSuggestionSelected={this.onItemSuggestionSelected}
              />

              { withSuggestions &&
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

              <Icon
                icon="enter-1"
                className="search show-on-mobile-only"
                onClick={this.redirectToSearchPath}
              />
            </div>

            <a target="_blank" className="contact-whatsapp" href="https://wa.me/573043883409?text=Quiero%20pedirle%20un%20saludo%20a%20">
              <Icon icon="social-whatsapp"/>
              +57 304 388 3409
            </a>
          </div>

          <div className="results-wrapper">
            { searchText === "" &&
              <div className="result-section">
                <h3 className="section-title">Los favoritos de <strong>saludofamosos</strong></h3>
                <h4 className="result-count">Mostrando <strong>4</strong> de {favorites.length}</h4>
                <CelebrityCarousel items={favorites}/>
              </div>
            }

            <div className="result-section">
              <h3 className="section-title">Nuestras celebridades</h3>
              <h4 className="result-count">Mostrando <strong>{search.results.length}</strong> de {search.total}</h4>

              <InfiniteScroll
                dataLength={search.results.length}
                next={this.onFetchScroll}
                hasMore={search.results.length < search.total}
                loader={<h4>Cargando...</h4>}
                endMessage={
                 <p style={{textAlign: 'center'}}>
                   <b>Yay! You have seen it all</b>
                 </p>
                }
              >
                <div className="results-grid">
                  {
                    search.results.map((item, index) => {
                      return <CelebrityCard key={index} {...item}/>
                    })
                  }
                </div>
              </InfiniteScroll>
            </div>

          </div>
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default HomePage
