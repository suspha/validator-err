const Validator = require('../index.js')

describe('validations', () => {
  describe('required', () => {
    it('should be true when require have value', () => {
      const validator = new Validator( {
        name: {
          required: true
        }
      })
      const result = validator.isValid({
        name: 'Vidar'
      })
      expect(result).toBe(true)
      expect(Object.keys(validator.errors).length).toBe(0)
    })

    it('should be false when require is empty', () => {
      const validator = new Validator( {
        name: {
          required: true
        }
      })
      const result = validator.isValid({
        name: ''
      })
      expect(result).toBe(false)
      expect(validator.errors.name).toBeDefined()
      expect(validator.errors.name).toContain('Kan ikke være blank')
    })

    it('should be true when require have value', () => {
      const validator = new Validator( {
        name: {
          required: true
        }
      })
      const result = validator.isValid({
        title: 'Vidar'
      })
      expect(result).toBe(false)
      expect(validator.errors.name).toBeDefined()
      expect(validator.errors.name).toContain('Kan ikke være blank')
    })
  })
  describe('is', () => {
    it('should match with regex', () => {
      const validator = new Validator( {
        email: {
          is: '$email'
        }
      })
      const result = validator.isValid({
        email: 'test@test.no'
      })
      expect(result).toBe(true)
      expect(Object.keys(validator.errors).length).toBe(0)
    })

    it('should be false when email does noe match with regex', () => {
      const validator = new Validator( {
        email: {
          is: '$email'
        }
      })
      const result = validator.isValid({
        email: 'test'
      })
      expect(result).toBe(false)
      expect(validator.errors.email).toBeDefined()
      expect(validator.errors.email).toContain('Ugyldig epost')
    })
  })
  describe('minlength', () => {
    it('should have at least five letters', () => {
      const validator = new Validator( {
        pwd: {
          minlength: 5
        }
      })
      const result = validator.isValid({
        pwd: 'asdfg'
      })
      expect(result).toBe(true)
      expect(Object.keys(validator.errors).length).toBe(0)
    })

    it('should be false when it does not have at least 5 letters', () => {
      const validator = new Validator( {
        pwd: {
          minlength: 5
        },
      })
      const result = validator.isValid({
        pwd: 'as'
      })
      expect(validator.errors.pwd).toBeDefined()
      expect(validator.errors.pwd).toContain('Må ha minst 5 bokstaver')
    })
  })
  describe('maxlength', () => {
    it('should have max 10 letters', () => {
      const validator = new Validator( {
        text: {
          maxlength: 10
        }
      })
      const result = validator.isValid({
        text: 'asdfasdqw'
      })
      expect(result).toBe(true)
      expect(Object.keys(validator.errors).length).toBe(0)
    })

    it('should be false when it have more than 10 letters', () => {
      const validator = new Validator( {
        text: {
          maxlength: 10
        },
      })
      const result = validator.isValid({
        text: 'asdfsdfsdfsdfsdfsdf'
      })
      expect(validator.errors.text).toBeDefined()
      expect(validator.errors.text).toContain('Kan ikke overstige 10 bokstaver')
    })
  })
})



