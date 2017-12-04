import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Modal from '../../../../../shared/modal'
import Button from '../../../../../shared/button'
import FiltersForm from './filters-form'
import {scrollBlockOn, scrollBlockOff} from 'preventScroll'
import {isFiltered} from 'utils'

import './styles.scss'

const mapStateToProps = (state) => {
  const {params} = state.userMedia

  return {params}
}

export default connect(mapStateToProps)(class UploadsToolbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        filter: { isActive: false }
      }
    }

    this.toggleFilterModal = this.toggleFilterModal.bind(this)
  }

  toggleFilterModal () {
    let modals = this.state.modals

    modals.filter.isActive ? scrollBlockOff() : scrollBlockOn()

    modals.filter.isActive = !modals.filter.isActive

    this.setState({modals})
  }

  render ({updateUserMedia, params}) {
    return (
      <div class='flex flex-full-center'>
        <Button iconButton icon='filter' onClickExecute={this.toggleFilterModal} badge={isFiltered(params)} />
        <Modal modalTitle='Filter Media' isActive={this.state.modals.filter.isActive} toggleModal={this.toggleFilterModal}>
          <FiltersForm updateUserMedia={updateUserMedia} toggleFilterModal={this.toggleFilterModal} />
        </Modal>
      </div>
    )
  }
})
