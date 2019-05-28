import React from 'react'

import AutoCompleteSuggest from 'components/AutoCompleteSuggest'

class CelebrityList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: props.initial_results,
      suggestionSelected: ''
    }
  }

  onResultsFetched = (search) => {
    this.setState({search, suggestionSelected: ''})
  }

  onSuggestionSelected = (suggestionSelected) => {
    this.setState({suggestionSelected})
  }

  render() {
    const { search, suggestionSelected } = this.state
    const { search_url } = this.props

    return (
      <div>
        <AutoCompleteSuggest
          endpoint={search_url}
          onResultsFetched={this.onResultsFetched}
          externalSuggestion={suggestionSelected}
        />

        { search.suggestions.length > 0 &&
          <div className="suggestions">
            <span>Did you mean? </span>
            <a onClick={this.onSuggestionSelected.bind(this, search.suggestions[0])}>
              {search.suggestions[0]}
            </a>
          </div>
        }

        <div className="results">
          {
            search.results.map((item, index) => {
              return (
                <div key={index} style={{display: "inline-block"}}>
                  <img src={item.photo_url} style={{width: "200px", height: "200px"}}/>
                  <h4>{item.known_as}</h4>
                  <p>{item.biography}</p>
                  <span>{item.country}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default CelebrityList
