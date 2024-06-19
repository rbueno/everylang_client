export default function getPlaceHolderByLessonLang(language = 'english', placeholder) {
    const text = {
        english: {
            createPhrasesByWords: 'Ex.: Though, Tough, Thought, Clothes, Schedule, February, Beach, Entrepreneurship, Horror, Sixth, eighth...',
            createPhrasesByAttributes: 'Ex.: palavras com TH; consoantes silenciosas; trava-línguas...',
            phraseExample: 'Ex.: Who Let the Dogs Out'
        },
        french: {
            createPhrasesByWords: 'Ex.: Serrurerie, Ecureuil, Bouilloire, Feuille, Grenouille, Chauffeur, Royaume, Hippopotame...',
            createPhrasesByAttributes: 'Ex.: Palavras com "eu" e combinações de vogais; trava-línguas...',
            phraseExample: 'Ex.: La souris est sous la table'
        },
    }

    if (!text.hasOwnProperty(language)) return '---'
    if (!text[language].hasOwnProperty(placeholder)) return '---'
    
    return text[language][placeholder]

}