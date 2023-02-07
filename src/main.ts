import { getCast, getCastCredits, getCrew, getCrewCredits, getPerson, getSeasonEpisodes, getSeasons, search } from './api';
import './style.css';
import { Season, Show, ShowCast, ShowCrew } from './types';

const searchForm = document.forms.namedItem('search') as HTMLFormElement;
const searchValue = searchForm.elements.namedItem('searching') as HTMLInputElement;
const results = document.getElementById('results') as HTMLDivElement;

function createTd(s: string) {
  const td = document.createElement('td');
  td.innerHTML = s;
  return td;
}

function createKeyValueTableRow(key: string, value: string) {
  const tr = document.createElement('tr');
  tr.append(
    createTd(key),
    createTd(value)
  );
  return tr;
}

function createSeasonHeaderRow() {
  const tr = document.createElement('tr');

  tr.append(
    createTd('Id'),
    createTd('Number - Name | Start - End'),
    createTd('Episodes')
  );

  return tr;
}

function createSeasonRow(season: Season, detail: HTMLDetailsElement) {
  const tr = document.createElement('tr');

  tr.append(
    createTd(season.id.toString()),
    createTd(`${season.number.toString()}${season.name.length > 0 ? ` - ${season.name}` : ''} | ${season.premiereDate} - ${season.endDate} `)
  );

  let alreadyFetched = false;
  detail.addEventListener('toggle', () => {
    if(alreadyFetched) return;
    alreadyFetched = true;
    getSeasonEpisodes(season.id).then((episodes) => {
      const detailTd = document.createElement('td');
      const detail = document.createElement('details');
      const summary = document.createElement('summary');
      const table = document.createElement('table');
  
      summary.textContent = `${season.episodeOrder} Episodes (Show)`;
  
      for (const episode of [{ number: 'Episode Number', name: 'Name', type: 'Type', airdate: 'Air Date', summary: 'Summary' }, ...episodes]) {
        const episodeTr = document.createElement('tr');
  
        episodeTr.append(
          createTd('' + episode.number),
          createTd(episode.name),
          createTd(episode.type),
          createTd(episode.airdate),
          createTd(episode.summary)
        );
  
        table.append(episodeTr);
      }
  
      detail.append(summary, table);
      detailTd.append(detail);
      tr.append(detailTd);
    });
  });
  
  return tr;
}

function createSeasonList(seasons: Season[]) {
  const tr = document.createElement('tr');

  const detailTd = document.createElement('td');
  const detail = document.createElement('details');
  const summary = document.createElement('summary');
  const table = document.createElement('table');

  summary.textContent = 'Show Seasons';

  table.append(createSeasonHeaderRow());
  for (const season of seasons) {
    table.append(createSeasonRow(season, detail));
  }

  detail.append(summary, table);
  detailTd.append(detail);

  tr.append(
    createTd('Seasons'),
    detailTd
  )

  return tr;
}

function createCrewListHeaderRow() {
  const tr = document.createElement('tr');

  tr.append(
    createTd('Id'),
    createTd('Crew Type'),
    createTd('Name'),
    createTd('Birthday - Deathday'),
    createTd('Gender'),
    createTd('Country')
  )

  return tr;
}

function createCrewRow(crew: ShowCrew) {
  const tr = document.createElement('tr');

  tr.append(
    createTd(`<a href="?person=${crew.person.id}">${crew.person.id}</a>`),
    createTd(crew.type),
    createTd(crew.person.name),
    createTd(`${crew.person.birthday ?? '????-??-??'} - ${crew.person.deathday ?? '????-??-??'}`),
    createTd(crew.person.gender),
    createTd((crew.person.country ?? { name: 'unknown' }).name ?? 'unknown')
  )

  return tr;
}

function createCrewList(crew: ShowCrew[]) {
  const tr = document.createElement('tr');

  const detailTd = document.createElement('td');
  const detail = document.createElement('details');
  const summary = document.createElement('summary');
  const table = document.createElement('table');

  summary.textContent = 'Show Crew';

  table.append(createCrewListHeaderRow());
  for (const c of crew) {
    table.append(createCrewRow(c));
  }

  detail.append(summary, table);
  detailTd.append(detail);

  tr.append(
    createTd('Crew'),
    detailTd
  );

  return tr;
}

function createCastListHeaderRow() {
  const tr = document.createElement('tr');

  tr.append(
    createTd('Id'),
    createTd('Character Name'),
    createTd('Name'),
    createTd('Birthday - Deathday'),
    createTd('Gender'),
    createTd('Country')
  )

  return tr;
}

function createCastRow(cast: ShowCast) {
  const tr = document.createElement('tr');

  tr.append(
    createTd(`<a href="?person=${cast.person.id}">${cast.person.id}</a>`),
    createTd(cast.character.name),
    createTd(cast.person.name),
    createTd(`${cast.person.birthday ?? '????-??-??'} - ${cast.person.deathday ?? '????-??-??'}`),
    createTd(cast.person.gender),
    createTd((cast.person.country ?? { name: 'unknown' }).name ?? 'unknown')
  )

  return tr;
}

function createCastList(cast: ShowCast[]) {
  const tr = document.createElement('tr');

  const detailTd = document.createElement('td');
  const detail = document.createElement('details');
  const summary = document.createElement('summary');
  const table = document.createElement('table');

  summary.textContent = 'Show Cast';

  table.append(createCastListHeaderRow());
  for (const c of cast) {
    table.append(createCastRow(c));
  }

  detail.append(summary, table);
  detailTd.append(detail);

  tr.append(
    createTd('Cast'),
    detailTd
  );

  return tr;
}

function displayShow(show: Show) {
  const detail = document.createElement('details');
  const summary = document.createElement('summary');
  const detailsTable = document.createElement('table');
  
  summary.textContent = `${show.premiered} - ${show.name} ${show.genres.map((s) => `[${s}]`).join(' ')}`;

  detailsTable.append(
    createKeyValueTableRow('Id', show.id.toString()),
    createKeyValueTableRow('Language', show.language),
    createKeyValueTableRow('Status', show.status),
    createKeyValueTableRow('Summary', show.summary),
    createKeyValueTableRow('Type', show.type),
    createKeyValueTableRow('Url', `<a href="${show.url}">${show.name} on TVMaze</a>`)
  );

  let alreadyFetched = false;
  detail.addEventListener('toggle', () => {
    if(alreadyFetched) return;
    alreadyFetched = true;
    getSeasons(show.id).then((seasons) => detailsTable.append(createSeasonList(seasons)));
    getCrew(show.id).then((crew) => detailsTable.append(createCrewList(crew)));
    getCast(show.id).then((cast) => detailsTable.append(createCastList(cast)));
  });

  detail.append(summary, detailsTable);
  results.append(detail);
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchResult = await search(searchValue.value);
  results.innerHTML = '';
  for (const searchShow of searchResult) {
    displayShow(searchShow.show);
  }
});

async function displayPerson(idStr: string) {
  const id = Number(idStr);
  const person = await getPerson(Number(id));
  
  const table = document.createElement('table');

  table.append(
    createKeyValueTableRow('Id', person.id.toString()),
    createKeyValueTableRow('Name', person.name),
    createKeyValueTableRow('Birthday - Deathday', `${person.birthday ?? '????-??-??'} - ${person.deathday ?? '????-??-??'}`),
    createKeyValueTableRow('Gender', person.gender),
    createKeyValueTableRow('Country', (person.country ?? { name: 'unkown' }).name ?? 'unknown')
  );

  results.append(table);

  const crew = await getCrewCredits(id);
  const cast = await getCastCredits(id);

  const crewTr = document.createElement('tr');
  const crewDetailTd = document.createElement('td');
  const crewDetail = document.createElement('details');
  const crewSummary = document.createElement('summary');
  const crewTable = document.createElement('table');

  crewSummary.textContent = 'Show crew credits';

  const crewHeaderTr = document.createElement('tr');
  crewHeaderTr.append(
    createTd('Crew type'),
    createTd('Show Id'),
    createTd('Show Name')
  );
  crewTable.append(crewHeaderTr);

  for (const c of crew) {
    const tr = document.createElement('tr');
    tr.append(
      createTd(c.type),
      createTd(c._embedded.show.id.toString()),
      createTd(c._embedded.show.name)
    );
    crewTable.append(tr);
  }

  crewDetail.append(crewSummary, crewTable);
  crewDetailTd.append(crewDetail);
  crewTr.append(createTd('Crew Credits'), crewDetailTd);
  
  const castTr = document.createElement('tr');
  const castDetailTd = document.createElement('td');
  const castDetail = document.createElement('details');
  const castSummary = document.createElement('summary');
  const castTable = document.createElement('table');

  castSummary.textContent = 'Show cast credits';

  const castHeaderTr = document.createElement('tr');
  castHeaderTr.append(
    createTd('Show Id'),
    createTd('Show Name'),
    createTd('Character Id'),
    createTd('Character Name')
  );
  castTable.append(castHeaderTr);

  for (const c of cast) {
    const tr = document.createElement('tr');
    tr.append(
      createTd(c._embedded.show.id.toString()),
      createTd(c._embedded.show.name),
      createTd(c._embedded.character.id.toString()),
      createTd(c._embedded.character.name)
    );
    castTable.append(tr);
  }

  castDetail.append(castSummary, castTable);
  castDetailTd.append(castDetail);
  castTr.append(createTd('Cast Credits'), castDetailTd);

  table.append(crewTr, castTr);
}

const url_string = window.location.href;
const url = new URL(url_string);
const person = url.searchParams.get("person");

if(person !== null) {
  displayPerson(person);
}