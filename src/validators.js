import emailValidator from 'email-validator'

const required = value => {
    if (!value) return 'Este campo é obrigatório.'
}

const email = value => {
    if (!emailValidator.validate(value)) return 'Por favor, insira um e-mail válido.'
}

const password = value => {
    if (value.length < 6) return 'Insira uma senha maior que 6 caracteres.'
}

const passwordRepeat = (value, allValues) => {
    if (value !== allValues.password) return 'Suas senhas não conferem.'
}

export { required, email, password, passwordRepeat }