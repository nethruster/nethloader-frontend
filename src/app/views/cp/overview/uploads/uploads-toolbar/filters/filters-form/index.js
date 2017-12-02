import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../../../shared/button'
import FormInput from '../../../../../../shared/form-input'
import FormInputRadio from '../../../../../../shared/form-input-radio'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {params, userMedia, isFetchingMedia} = state.userMedia
  return {
    params,
    userMedia,
    isFetchingMedia
  }
}

export default connect(mapStateToProps)(class UploadsToolbar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filters: {
        mediaLimit: this.props.params.mediaLimit || 10,
        type: this.props.params.type || '',
        afterDate: this.props.params.afterDate || '',
        beforeDate: this.props.params.beforeDate || ''
      }
    }

    this.handleSubmitFilters = this.handleSubmitFilters.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleBeforeDateChange = this.handleBeforeDateChange.bind(this)
    this.handleAfterDateChange = this.handleAfterDateChange.bind(this)
    this.handleMediaLimitChange = this.handleMediaLimitChange.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
  }

  handleSubmitFilters (event) {
    event.preventDefault()

    this.context.router.history.push('/cp/overview')
    this.props.updateUserMedia(this.state.filters)
    this.props.toggleFilterModal()
  }

  resetFilters () {
    let filters = {
      mediaLimit: 10,
      type: '',
      afterDate: '',
      beforeDate: ''
    }

    this.setState({filters})
  }

  handleTypeChange (e) {
    let filters = this.state.filters
    filters.type = e.target.value
    this.setState({filters})
  }

  handleBeforeDateChange (e) {
    let filters = this.state.filters
    filters.beforeDate = e.target.value ? new Date(e.target.value).getTime() : ''
    this.setState({filters})
  }

  handleAfterDateChange (e) {
    let filters = this.state.filters
    filters.afterDate = e.target.value ? new Date(e.target.value).getTime() : ''
    this.setState({filters})
  }

  handleMediaLimitChange (e) {
    let filters = this.state.filters
    e.target.value === 'All' ? filters.mediaLimit = this.props.userMedia.totalCount : filters.mediaLimit = e.target.value
    this.setState({filters})
  }

  render ({updateUserMedia, params, dispatch, userMedia, isFetchingMedia}) {
    return (
      <form onSubmit={this.handleSubmitFilters} class={style.filtersForm} ref={(el) => { this.form = el }}>
        <div>
          <h5>Type:</h5>
          <div class={`${style.filtersFormSection} flex flex-sa`}>
            <FormInputRadio inputName='filterType' inputValue='' inputId='all' isChecked={this.state.filters.type === ''} changeHandler={this.handleTypeChange} inputLabel='Both' />
            <FormInputRadio inputName='filterType' inputValue='image' inputId='image' isChecked={this.state.filters.type === 'image'} changeHandler={this.handleTypeChange} inputLabel='Image/gif' />
            <FormInputRadio inputName='filterType' inputValue='video' inputId='video' isChecked={this.state.filters.type === 'video'} changeHandler={this.handleTypeChange} inputLabel='Video' />
          </div>
          <h5>Date interval:</h5>
          <div class={`${style.filtersFormSection} flex flex-sa`}>
            <label>
              <p>After</p>
              <FormInput inputType='date' inputId='afterDate' changeHandler={this.handleAfterDateChange} />
            </label>

            <label>
              <p>Before</p>
              <FormInput inputType='date' inputId='beforeDate' changeHandler={this.handleBeforeDateChange} />
            </label>
          </div>
          <h5>Results per page:</h5>
          <div class={`${style.filtersFormSection} flex flex-cross-center flex-dc`}>
            <select class={style.filtersFormLimitSelect} onChange={this.handleMediaLimitChange}>
              <option selected={this.state.filters.mediaLimit === 5}>5</option>
              <option selected={this.state.filters.mediaLimit === 10}>10</option>
              <option selected={this.state.filters.mediaLimit === 20}>20</option>
              <option selected={this.state.filters.mediaLimit === 50}>50</option>
              <option selected={this.state.filters.mediaLimit === 100}>100</option>
              <option selected={this.state.filters.mediaLimit === 200}>200</option>
              {!isFetchingMedia && <option selected={this.state.filters.mediaLimit === userMedia.totalCount}>All</option>}
            </select>
          </div>
        </div>

        <div class={`${style.filtersFormSubmit}`}>
          <a onClick={this.resetFilters}><small>Reset Fields</small></a>
          <Button type='submit' text='Filter!' contrast />
        </div>
      </form>
    )
  }
})
