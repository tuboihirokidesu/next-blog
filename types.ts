export interface IResponse {
  slug: string
}

export interface IArticle {
  article: IFields
}

export interface IFields {
  fields: {
    title: string
    slug: string
    description: string
    date: Date
    thumbnail: IImage
    content: any
    type: string[]
  }
}

interface IImage {
  fields: {
    file: {
      url: string
    }
  }
}

export type Category = 'dog' | 'bulldog' | 'husky' | 'Border Collie'
