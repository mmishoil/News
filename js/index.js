import themeToggle from './theme.js'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form')

  themeToggle('#themeToggle')

  if (!form) return;
  const handleSearchForm = () => {
    const formData = new FormData(form)
    const params = Object.fromEntries(formData.entries())
    const keyword = params.q && params.q.trim()
    const date = params.date && params.date.trim()

    if (!keyword && !date) {
      errorTextElement.textContent = 'Please enter a keyword or date range.'
      return
    }

    if (date) {
      const [startDate, endDate] = date.split(' to ')
      params.from = startDate
      params.to = endDate ?? ''
    }

    delete params.date
    submitButton.disabled = true

    infoTextElement.textContent = `Searching for ${keyword} from ${params.from || 'start date'} to ${params.to || 'end date'}.`
    errorTextElement.textContent = ''
    submitButton.disabled = false
  }

  const radioButtons = form?.querySelectorAll('input[type="radio"]')
  const submitButton = form.querySelector('[type="submit"]')
  const errorTextElement = form.querySelector('#search-form-error')
  const infoTextElement = form.querySelector('#search-form-info')

  form.addEventListener('submit', async event => {
    event.preventDefault();
    handleSearchForm(1);
  })

  if (radioButtons.length === 0) return

  radioButtons.forEach(radio => {
    radio.addEventListener('change', async () => {
      if (radio.checked) {
        handleSearchForm(1);
      }
    })
  })
})