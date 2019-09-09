import React          from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CelebrityCard  from 'components/celebrities/CelebrityCard'

const EndScrollMessage = ({children}) => {
  return (
    <p className='end-scroll-message'>
      {children}
    </p>
  )
}

const LoadingMessage = ({loading}) => {
  return (
    <EndScrollMessage>
      <b>{loading}</b>
    </EndScrollMessage>
  )
}

const EndMessage = ({t}) => {
  return (
    <EndScrollMessage>
      {t.seen_all.for_now}&nbsp;
      <a target="_blank" href="https://wa.me/573043883409?text=Quiero%20pedirle%20un%20saludo%20a%20">
        <b>
          {t.seen_all.text_us}&nbsp;
        </b>
      </a>
      {t.seen_all.tell_us}
    </EndScrollMessage>
  )
}

const ResultsScroll = ({t, search, onFetchScroll}) => {
  const thereAreResults = search.results.length > 0
  const hasMore = search.results.length < search.total

  if (thereAreResults) {
    return (
      <React.Fragment>
        <h4 className="result-count">{t.showing} <strong>{search.results.length}</strong> {t.of} {search.total}</h4>

        <InfiniteScroll
          dataLength={search.results.length}
          next={onFetchScroll}
          hasMore={hasMore}
          loader={<LoadingMessage loading={t.loading}/>}
          endMessage={<EndMessage t={t}/>}
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
    )
  }
  else {
    return (
      <div className="no-results">
        <h4>{t.no_results}</h4>
      </div>
    )
  }
}

export default ResultsScroll
