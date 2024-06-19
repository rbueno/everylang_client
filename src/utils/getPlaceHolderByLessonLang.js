export default function getPlaceHolderByLessonLang(language = 'english', placeholder) {
    const text = {
        english: {
            createPhrasesByWords: 'Ex.: Though, Tough, Thought, Clothes, Schedule, February, Beach, Entrepreneurship, Horror, Sixth, eighth...',
            createPhrasesByAttributes: 'Ex.: palavras com TH; consoantes silenciosas; trava-línguas...'
        },
        french: {
            createPhrasesByWords: 'Ex.: Serrurerie, Ecureuil, Bouilloire, Feuille, Grenouille, Chauffeur, Royaume, Hippopotame...',
            createPhrasesByAttributes: 'Ex.: palavras com TH; consoantes silenciosas; trava-línguas...'
        },
    }

    if (!text.hasOwnProperty(language)) return '---'
    if (!text[language].hasOwnProperty(placeholder)) return '---'
    
    return text[language][placeholder]

}