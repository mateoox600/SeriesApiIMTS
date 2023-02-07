
export interface SearchShow {
  score: number,
  show: Show
}

export interface Show {
  id: number,
  genres: string[],
  language: string,
  name: string,
  premiered: string,
  status: string,
  summary: string,
  type: string,
  url: string
}

export interface Season {
    id: number,
    url: string,
    number: number,
    name: string,
    episodeOrder: number,
    premiereDate: string,
    endDate: string
}

export interface ShowCrew {
    type: string,
    person: Person
}

export interface ShowCast {
    person: Person,
    character: {
        name: string
    }
}

export interface Person {
    id: number,
    name: string,
    birthday: string,
    deathday: string | null,
    gender: string,
    country: {
        name: string
    }
}

export interface Episode {
    id: number,
    name: string,
    number: number,
    type: string,
    airdate: string,
    summary: string
}

export interface CastCredits {
    _embedded: {
        show: {
            id: number,
            name: string
        },
        character: {
            id: number,
            name: string
        }
    }
}

export interface CrewCredits {
    type: string,
    _embedded: {
        show: {
            id: number,
            name: string
        }
    }
}