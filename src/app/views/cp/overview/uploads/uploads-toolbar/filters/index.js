import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../../shared/modal'
import Button from '../../../../../shared/button'
import FiltersForm from './filters-form'
import {scrollBlockOn, scrollBlockOff} from 'preventScroll'
import {isFiltered} from 'utils'

const viewStrings = locale.cp.overview.filters // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const {params} = state.userMedia

  return {params}
}

export default connect(mapStateToProps)(class Filters extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        filter: {isActive: false}
      }
    }

    this.toggleFilterModal = this.toggleFilterModal.bind(this)
  }

  toggleFilterModal () {
    let modals = this.state.modals

    modals.filter.isActive = !modals.filter.isActive

    this.setState({modals})
    
    modals.filter.isActive ? scrollBlockOn() : scrollBlockOff()
  }

  render ({updateUserMedia, params}) {
    return (
      <div class='flex flex-full-center'>
        <Button
          iconButton
          icon='filter'
          onClickExecute={this.toggleFilterModal}
          badge={isFiltered(params)}
        />
        <Modal
          modalTitle={viewStrings.title}
          isActive={this.state.modals.filter.isActive}
          toggleModal={this.toggleFilterModal}
          willOverflow>
          <FiltersForm
            updateUserMedia={updateUserMedia}
            toggleFilterModal={this.toggleFilterModal}
          />
        </Modal>
      </div>
    )
  }
})
