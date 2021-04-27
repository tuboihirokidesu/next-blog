export interface IResponse {
  slug: string
}

export interface IArticle {
  field: IFields
  sys: ISys
}

export interface IFields {
  title: string
  slug: string
  description: string
  date: Date
  thumbnail: IImage
  content: any
  type: string[]
}
export interface ISys {
  id: string
}

interface IImage {
  fields: {
    file: {
      url: string
    }
  }
}

export type Category = 'dog' | 'bulldog' | 'husky' | 'Border Collie'
