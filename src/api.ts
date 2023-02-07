import { CastCredits, CrewCredits, Episode, Person, SearchShow, Season, ShowCast, ShowCrew } from './types';

export const API_URL = 'https://api.tvmaze.com/';

export async function search(s: string): Promise<SearchShow[]> {
    const searchUrl = `${API_URL}/search/shows?q=${s}`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getSeasons(id: number): Promise<Season[]> {
    const searchUrl = `${API_URL}shows/${id}/seasons`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getSeasonEpisodes(id: number): Promise<Episode[]> {
    const searchUrl = `${API_URL}seasons/${id}/episodes`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getCrew(id: number): Promise<ShowCrew[]> {
    const searchUrl = `${API_URL}shows/${id}/crew`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getCast(id: number): Promise<ShowCast[]> {
    const searchUrl = `${API_URL}shows/${id}/cast`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getPerson(id: number): Promise<Person> {
    const searchUrl = `${API_URL}people/${id}`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getCastCredits(id: number): Promise<CastCredits[]> {
    const searchUrl = `${API_URL}people/${id}/castcredits?embed[]=show&embed[]=character`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}

export async function getCrewCredits(id: number): Promise<CrewCredits[]> {
    const searchUrl = `${API_URL}people/${id}/crewcredits?embed=show`;
    const result = await fetch(searchUrl).then((r) => r.json())
        .catch((err) => console.log(err));
    return result;
}