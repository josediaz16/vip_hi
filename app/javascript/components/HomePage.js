import React         from 'react'
import ReactPaginate from 'react-paginate'
import AutoSuggest   from 'react-autosuggest'

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
    const { search_url, t, most_recent } = this.props

    const inputProps = {
      id: "search_celebrity",
      placeholder: t.placeholders.search,
      value: searchText,
      onChange: this.onChangeInput
    }

    return (
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
            <CelebrityCarousel items={most_recent}/>
          </div>
        </div>
      </div>
    )
  }
}
/*
            <div className="list">

              <div className="celebrity-card">
                <div className="profile-image" style={{backgroundImage: "url('http://placekitten.com/g/300/300')"}}>
                  <span className="price-tag">
                    350.000 Cop
                  </span>
                </div>
                <div className="profile-info">
                  <h5 className="country-name">Colombia</h5>
                  <h3 className="celebrity-name">Radamel Falcao</h3>
                  <h4 className="screen-name">@falcao9</h4>
                  <p className="bio">
                    Radamel es un futbolista colombiano, jugador del Mónaco, sus inicios en el aaaaaaaaaaaaaaaaaaaa
                  </p>
                </div>
              </div>

            </div>
*/

export default HomePage
