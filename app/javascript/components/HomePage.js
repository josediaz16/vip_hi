import React         from 'react'
import ReactPaginate from 'react-paginate'
import AutoSuggest   from 'react-autosuggest'
import Footer        from 'components/footer'
import Icon          from 'components/inputs/Icon'

import CelebrityCarousel from 'components/CelebrityCarousel'

import { debounce }  from 'throttle-debounce'

import { getRequest, isPresent } from 'components/Utils'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: props.initial_results,
      searchText: '',
    }
  }
  componentWillMount() {
    this.onSuggestionsFetch = debounce(500, this.onSuggestionsFetch)
  }

  // Begin AutoComplete Handlers
  onSuggestionsFetch = ({value}) => {
    getRequest(this.props.search_url, {query: value, page: 0})
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
      //this.onSuggestionsFetch({value})
    })
  }

  onItemSuggestionSelected = (event, {suggestionValue}) => {
    window.location.assign(`celebrities?search=${suggestionValue}`)
  }

  onChangeInput = (event, { newValue }) => this.setState({searchText: newValue})

  redirectToSearchPath = () => {
    window.location.assign(`celebrities?search=${this.state.searchText}`)
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.redirectToSearchPath()
    }
  }

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

    const inputProps = {
      id: "search_celebrity",
      placeholder: t.placeholders.search,
      value: searchText,
      onChange: this.onChangeInput,
      onKeyDown: this.onKeyDown,
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
              <Icon
                icon="enter-1"
                className="search show-on-mobile-only"
                onClick={this.redirectToSearchPath}
              />
            </div>

            <a target="_blank" className="contact-whatsapp" href="https://wa.me/573005252306?text=Quiero%20pedirle%20un%20saludo%20a%20">
              <Icon icon="social-whatsapp"/>
              300 525 2306
            </a>
          </div>

          <div className="results-wrapper">
            <div className="result-section">
              <h3 className="section-title">Últimas celebridades agregadas</h3>
              <span className="result-count">Mostrando <strong>4</strong> de {most_recent.length}</span>
              <CelebrityCarousel items={most_recent}/>
            </div>
            <div className="result-section">
              <h3 className="section-title">Los favoritos de <strong>saludofamosos</strong></h3>
              <span className="result-count">Mostrando <strong>4</strong> de {favorites.length}</span>
              <CelebrityCarousel items={favorites}/>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    )
  }
}

export default HomePage
