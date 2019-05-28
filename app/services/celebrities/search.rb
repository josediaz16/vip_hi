module Celebrities
  DefaultOptions = {
    fields: ["known_as", "name", "country"],
    match: :word_start,
    load: false,
    misspellings: {below: 5},
    suggest: true,
    per_page: 2
  }

  Search = -> query, options = Hash.new do
    searchkick = Celebrity.search(query, DefaultOptions.merge(options.symbolize_keys))

    {
      results: JsonResults.(searchkick),
      pages: searchkick.total_pages,
      suggestions: FilterSuggestions.(searchkick.suggestions, query)
    }
  end

  JsonResults = -> results do
    results
      .as_json
      .map { |result| result.except("_index", "_type", "_id") }
  end

  FilterSuggestions = -> suggestions, query do
    suggestions.reject { |suggestion| query.match(suggestion).present? || suggestion.match(query).present? }
  end
end
