import ShortUniqueId from 'short-unique-id'

const generateShortId = (params) => {
    const size = params?.size || 10
    return new ShortUniqueId({ length: size, dictionary: 'hex'}).randomUUID()
}

export { generateShortId }