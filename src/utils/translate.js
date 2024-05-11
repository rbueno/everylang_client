const constants = {
    learningLanguage: {
        english: 'Inglês',
        spanish: 'Espanhol',
        french: 'Francês',
        german: 'Alemão',
        korean: 'Coreano',
        mandarinChinese: 'Mandarim (Chinês)',
        japanese: 'Japonês'
      },
    languageLevel: {
        beginner: 'Iniciante',
        elementary: 'Básico',
        intermediate: 'Intermediário',
        advanced: 'Avançado',
      }
}

const translate = (key, value) => {
if(!constants.hasOwnProperty(key)) return '---'
if(!constants[key].hasOwnProperty(value)) return '---'

return constants[key][value]
}

export default translate