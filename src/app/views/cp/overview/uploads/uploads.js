import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Upload from './upload/upload.js'

import style from './uploads.scss'

function mapStateToProps (state) {
  const {hasData, data} = state.data

  return {
    hasData,
    data
  }
}

export default connect(mapStateToProps)(class Uploads extends Component {
  render ({hasData, data}) {
    let mediaList = hasData ? data.images.map((entry) => {
      return <Upload key={entry.id} id={entry.id} type={entry.extension} upDate={entry.createdAt} />
    }) : () => { return 'Loading' }

    return (
      <div class={style.uploads}>
        <ul>
          {mediaList}
        </ul>
      </div>
    )
  }
})
