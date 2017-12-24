import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import Button from '../../../../../../shared/button'
import FormInput from '../../../../../../shared/form-input'
import FormInputRadio from '../../../../../../shared/form-input-radio'
import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.overview.filters.form

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
    this.handleDateChange = this.handleDateChange.bind(this)
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
    let defaultFilters = {
      mediaLimit: 10,
      type: '',
      afterDate: '',
      beforeDate: ''
    }

    this.filtersForm.reset()

    this.setState({filters: defaultFilters})
  }

  handleTypeChange (e) {
    let filters = this.state.filters
    filters.type = e.target.value
    this.setState({filters})
  }

  handleDateChange (e) {
    let filters = this.state.filters
    filters[e.target.id] = e.target.value
      ? new Date(e.target.value).getTime()
      : ''
    this.setState({filters})
  }

  handleMediaLimitChange (e) {
    let filters = this.state.filters
    e.target.value === viewStrings.all
      ? filters.mediaLimit = this.props.userMedia.totalCount
      : filters.mediaLimit = e.target.value
    this.setState({filters})
  }

  render ({updateUserMedia, params, dispatch, userMedia, isFetchingMedia}) {
    return (
      <form
        onSubmit={this.handleSubmitFilters}
        class={style.filtersForm}
        ref={(el) => { this.filtersForm = el }}>
        <div>
          <h5>{viewStrings.type}:</h5>
          <div class={`${style.filtersFormSection} flex flex-sa`}>
            <FormInputRadio
              inputName='filterType'
              inputValue=''
              inputId='all'
              isChecked={this.state.filters.type === ''}
              changeHandler={this.handleTypeChange}
              inputLabel={viewStrings.both}
            />
            <FormInputRadio
              inputName='filterType'
              inputValue='image'
              inputId='image'
              isChecked={this.state.filters.type === 'image'}
              changeHandler={this.handleTypeChange}
              inputLabel={viewStrings.image_gif}
            />
            <FormInputRadio
              inputName='filterType'
              inputValue='video'
              inputId='video'
              isChecked={this.state.filters.type === 'video'}
              changeHandler={this.handleTypeChange}
              inputLabel={viewStrings.video}
            />
          </div>
          <h5>{viewStrings.date_interval}:</h5>
          <div class={`${style.filtersFormSection} flex flex-sa`}>
            <label>
              <p>{viewStrings.after}</p>
              <FormInput
                inputType='date'
                inputId='afterDate'
                inputLabel='dd/mm/yyyy'
                changeHandler={this.handleDateChange}
              />
            </label>

            <label>
              <p>{viewStrings.before}</p>
              <FormInput
                inputType='date'
                inputId='beforeDate'
                inputLabel='dd/mm/yyyy'
                changeHandler={this.handleDateChange}
              />
            </label>
          </div>
          <h5>{viewStrings.results_per_page}:</h5>
          <div class={`${style.filtersFormSection} flex flex-cross-center flex-dc`}>
            <select class={style.filtersFormLimitSelect} onChange={this.handleMediaLimitChange}>
              <option
                selected={Number(this.state.filters.mediaLimit) === 10}>
                10
              </option>
              <option
                selected={Number(this.state.filters.mediaLimit) === 20}>
                20
              </option>
              <option
                selected={Number(this.state.filters.mediaLimit) === 50}>
                50
              </option>
              <option
                selected={Number(this.state.filters.mediaLimit) === 100}>
                100
              </option>
              <option
                selected={Number(this.state.filters.mediaLimit) === 200}>
                200
              </option>
              {
                !isFetchingMedia &&
                <option selected={Number(this.state.filters.mediaLimit) >= Number(userMedia.totalCount)}>
                  {viewStrings.all}
                </option>
              }
            </select>
          </div>
        </div>

        <div class={`${style.filtersFormSubmit}`}>
          <a onClick={this.resetFilters}><small>{viewStrings.reset_fields}</small></a>
          <Button type='submit' text={viewStrings.submit} contrast />
        </div>
      </form>
    )
  }
})
