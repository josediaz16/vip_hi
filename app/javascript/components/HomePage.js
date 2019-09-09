import React          from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Footer         from 'components/footer'
import Icon           from 'components/inputs/Icon'

import CelebrityCarousel from 'components/CelebrityCarousel'
import SearchBox         from 'components/search/SearchBox'
import ResultsScroll     from 'components/search/ResultsScroll'

import { debounce }  from 'throttle-debounce'
import classNames    from 'classnames'

import { getRequest, isPresent } from 'components/Utils'

const getUrlParams = () => {
  return new URLSearchParams(window.location.search)
}

const doNothing = () => {}

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
    this.setState({searchText: newValue, pageNumber: 1}, () => {
      const value = isPresent(this.state.searchText) ? this.state.searchText : "*"
      this.onSuggestionsFetch({value}, this.handleSuccessSearch)
    })
  }

  handleSuccessScroll = ({results, ...otherProps}) => {
    const search = {
      results: this.state.search.results.concat(results),
      ...otherProps
    }
    this.setState({search})
  }

  handleSuccessSearch = (search) => this.setState({search, pageNumber: 1})

  render() {
    const { search, searchText } = this.state
    const { search_url, t, most_recent, favorites } = this.props

    const isSearching     = searchText !== ""

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

            <SearchBox
              t={t}
              searchText={searchText}
              search={search}
              onChangeInput={this.onChangeInput}
              onSuggestionsFetchRequested={this.onSuggestionsFetch}
              onSuggestionsClearRequested={doNothing}
              onSuggestionSelected={this.onItemSuggestionSelected}
              onSuggestionAccepted={this.onSuggestionSelected}
            />

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
              <ResultsScroll
                t={t}
                search={search}
                onFetchScroll={this.onFetchScroll}
              />
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default HomePage
