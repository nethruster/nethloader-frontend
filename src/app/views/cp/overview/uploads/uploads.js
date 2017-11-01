import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload/upload.js'

import style from './uploads.scss'

function mapStateToProps (state) {
  const {hasData, data} = state.data

  return {hasData, data}
}

export default connect(mapStateToProps)(class Uploads extends Component {
  compareByDate (a, b) {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    if (a.createdAt < b.createdAt) {
      return 1
    }
    return 0
  }

  computeMediaList (sort) {
    let mediaList = this.props.data.images
    switch (sort) {
      case 'byDate':
        mediaList.sort(this.compareByDate)
        break
    }
    return mediaList.map((entry) => {
      return <Upload key={entry.id} id={entry.id} type={entry.extension} upDate={entry.createdAt} />
    })
  }

  render ({hasData, data}) {
    return (
      <div class={style.uploads}>
        <ul>
          {hasData ? this.computeMediaList('byDate') : 'Loading'}
        </ul>
      </div>
    )
  }
})
