export interface MovieObject {
    title: string
    rating?: string
    boxOffice?: string
    poster?: string
  }
  
export interface MovieResult {
    genre: string
    year: number
    movies: MovieObject[]
  }