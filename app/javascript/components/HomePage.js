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

    const isSearching     = searchText !== ""
    const thereAreResults = search.results.length > 0
    const withSuggestions = search.suggestions.length > 0 && !thereAreResults

    const inputProps = {
      id: "search_celebrity",
      placeholder: t.placeholders.search,
      value: searchText,
      onChange: this.onChangeInput,
      onKeyDown: this.onKeyDown,
      className: classNames("react-autosuggest__input", {"with-suggestion": withSuggestions})
    }

    const resultsTitle = isSearching ? t.search_results : t.our_celebrities

    const topSectionClass = classNames("top-section", {stretch: isSearching})
    const whatsAppClass = classNames("contact-whatsapp", {"hide-on-mobile": isSearching})
    const titleClass = classNames({"hide-on-mobile": isSearching})

    return (
      <React.Fragment>
        <div className="search-page">
          <div className={topSectionClass}>
            <div className='search-box-instructions'>
              <h1 className={titleClass}>{t.titles.main}</h1>
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

            <a target="_blank" className={whatsAppClass} href="https://wa.me/573043883409?text=Quiero%20pedirle%20un%20saludo%20a%20">
              <Icon icon="social-whatsapp"/>
              +57 304 388 3409
            </a>
          </div>

          <div className="results-wrapper">
            { !isSearching &&
              <div className="result-section">
                <h3 className="section-title">{t.favorites.the_favorites} <strong>saludofamosos</strong></h3>
                <h4 className="result-count">{t.showing} <strong>4</strong> {t.of} {favorites.length}</h4>
                <CelebrityCarousel items={favorites}/>
              </div>
            }

            <div className="result-section">
              <h3 className="section-title">{resultsTitle}</h3>
              { thereAreResults &&
                <React.Fragment>
                  <h4 className="result-count">{t.showing} <strong>{search.results.length}</strong> {t.of} {search.total}</h4>

                  <InfiniteScroll
                    dataLength={search.results.length}
                    next={this.onFetchScroll}
                    hasMore={search.results.length < search.total}
                    loader={
                     <p className='end-scroll-message'>
                       <b>{t.loading}</b>
                     </p>
                    }
                    endMessage={
                      <p className='end-scroll-message'>
                        {t.seen_all.for_now}&nbsp;
                        <a target="_blank" href="https://wa.me/573043883409?text=Quiero%20pedirle%20un%20saludo%20a%20">
                          <b>
                            {t.seen_all.text_us}&nbsp;
                          </b>
                        </a>
                        {t.seen_all.tell_us}
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
                </React.Fragment>
              }

              { !thereAreResults &&
                <div className="no-results">
                  <h4>{t.no_results}</h4>
                </div>
              }
            </div>

          </div>
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default HomePage
