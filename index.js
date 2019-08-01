const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

class Validator {
  constructor(fields) {
    this.fields = fields
    this.reset()
  }

  reset() {
    this.errors = {}
  }

  addError(key, message) {
    if (!this.errors[key]) {
      this.errors[key] = []
    }
    if (!this.errors[key].includes(message)) {
      this.errors[key].push(message)
    }
  }

  validate(obj) {
    for (const key in this.fields) {
      const value = obj[key]
      const test = this.fields[key]
      if (test.required === true && (!value || !value.trim())) {
        this.addError(key, 'Kan ikke være blank')
      }
      if(test.is === '$email' && value && !EMAIL_REGEXP.test(value)) {
        this.addError(key, 'Ugyldig epost')
      }
      if (test.match && value !== obj[test.match]) {
        this.addError(key, 'Må matche' )
      }
      if(test.minlength && value.length < test.minlength) {
        this.addError(key, `Må ha minst ${test.minlength} bokstaver`)
      }
      if(test.maxlength && value.length > test.maxlength) {
        this.addError(key, `Kan ikke overstige ${test.maxlength} bokstaver`)
      }
    }
  }

  isValid(obj) {
    this.reset()
    this.validate(obj)
    return !Object.keys(this.errors).length
  }
}

module.exports = Validator