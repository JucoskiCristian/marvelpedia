export interface Series {
  id: number
  title: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface SeriesDataWrapper {
  results: Series[]
}
