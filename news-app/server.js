import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const engine = new Liquid({
  extname: '.liquid'
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist/assets'))
  .listen(3000);


app.get('/', async (req, res) => {
  try {
    const animeData = await fetchAnimeSeasonNow();

    return res.send(renderTemplate('views/index.liquid', {
      animeData,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/anime', async (req, res) => {
  return res.send(renderTemplate('views/anime.liquid'));
});

app.get('/manga', async (req, res) => {
  return res.send(renderTemplate('views/manga.liquid'));
});

app.get('/anime/genres', async (req, res) => {
  return res.send(renderTemplate('views/animegenres.liquid'));
});

app.get('/anime/seasons', async (req, res) => {
  return res.send(renderTemplate('views/animeseasons.liquid'));
});

app.get('/anime/top', async (req, res) => {
  try {
    const animeData = await getTopAnime();
    return res.send(renderTemplate('views/topanime.liquid', { animeData }));
  } catch (error) {
    console.error('Error fetching top anime:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('/anime/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug)
    const searchedAnime = await fetch(`https://api.jikan.moe/v4/anime?q=${slug}&sfw=true`).then(res => res.json());
    // console.log(searchedAnime)
    const detailAnime = searchedAnime.data[0];
    console.log(detailAnime)
    return res.send(renderTemplate('views/detail.liquid', { detailAnime }));
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return res.status(500).send('Internal Server Error');
  }
});





const getTopAnime = async () => {
  const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=25');
  const animeData = await response.json();
  return animeData;
};

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchAnimeSeasonNow = async () => {
  const response = await fetch('https://api.jikan.moe/v4/seasons/now');
  const animeData = await response.json();
  return animeData;
};

const fetchRecommended = async () => {
  const response = await fetch('https://api.jikan.moe/v4/recommendations/anime');
  const animeData = await response.json();
  return animeData;
};

const fetchScheduleWithDelay = async (day) => {
  const response = await fetch(`https://api.jikan.moe/v4/schedules?filter=${day}`);
  const scheduleData = await response.json();
  return scheduleData;
};