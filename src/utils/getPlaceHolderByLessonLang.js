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
        german: {
            createPhrasesByWords: 'Ex.: Schmetterling, Krankenhaus, Schlittschuhlaufen, Zahnarzt, Brötchen, Schwarz, Dachgeschoss, Sechste...',
            createPhrasesByAttributes: 'Ex.: Palavras com consoantes duplas e compostas; trava-línguas...',
            phraseExample: 'Ex.: Das Buch liegt auf dem Tisch'
        },
        spanish: {
            createPhrasesByWords: 'Ex.: Río, Perro, Desarrollar, Murciélago, Azahar, Aceituna, Enfermedad, Ajedrez...',
            createPhrasesByAttributes: 'Ex.: Palavras com "rr", sons guturais; trava-línguas...',
            phraseExample: 'Ex.: El gato está en el jardín'
        },
        korean: {
            createPhrasesByWords: 'Ex.: 안녕하세요, 사랑해요, 학교, 축하합니다, 감사합니다, 좋아해요, 음악, 병원...',
            createPhrasesByAttributes: 'Ex.: Palavras com batchim (consoantes finais); trava-línguas...',
            phraseExample: 'Ex.: 책이 책상 위에 있어요.'
        },
        japonese: {
            createPhrasesByWords: 'Ex.: ありがとう, こんにちは, さようなら, 病院, 写真, 空港, 難しい, 旅行...',
            createPhrasesByAttributes: 'Ex.: Palavras com consoantes geminadas, vogais longas; trava-línguas...',
            phraseExample: 'Ex.: 猫が庭にいます。'
        },
        mandarin: {
            createPhrasesByWords: 'Ex.: 谢谢, 你好, 再见, 医院, 火车站, 飞机场, 天气, 中国 (Zhōngguó - China)...',
            createPhrasesByAttributes: 'Ex.: Palavras com tons e sons retroflexos; trava-línguas...',
            phraseExample: 'Ex.: 书在桌子上。'
        },
    }

    if (!text.hasOwnProperty(language)) return '---'
    if (!text[language].hasOwnProperty(placeholder)) return '---'
    
    return text[language][placeholder]

}