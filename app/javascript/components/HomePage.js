import React         from 'react'
import ReactPaginate from 'react-paginate'
import AutoSuggest   from 'react-autosuggest'
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
      this.onSuggestionsFetch({value})
    })
  }

  onChangeInput = (event, { newValue }) => this.setState({searchText: newValue})

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
      onChange: this.onChangeInput
    }

    return (
      <React.Fragment>
      <div className="search-page">
        <div className="top-section">
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
          </div>
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
      <footer>
        <h4>No olvides seguirnos en nuestras redes sociales</h4>
        <div className="social-networks">
          <a href="">
            <Icon icon="facebook-square"/>
          </a>
          <a href="">
            <Icon icon="instagram"/>
          </a>
          <a href="">
            <Icon icon="instagram"/>
          </a>
        </div>
      </footer>
      </React.Fragment>
    )
  }
}

export default HomePage
