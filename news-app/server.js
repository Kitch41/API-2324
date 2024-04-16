import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
// import fs from 'node:fs';

const engine = new Liquid({
  extname: '.liquid'
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist/assets'))
  .listen(3000);

app.get('/', async (req, res) => {
  const newsData = await fetchSeasonNow();
  return res.send(renderTemplate('views/index.liquid', {newsData}));
});

app.get('/manga', async (req, res) => {
  return res.send(renderTemplate('views/manga.liquid'));
});

app.get('/anime', async (req, res) => {
  return res.send(renderTemplate('views/anime.liquid', { title: 'Home' }));
});

app.get('/topanime', async (req, res) => {
  const newsData = await getNews();
  return res.send(renderTemplate('views/topanime.liquid', {newsData}));
});

app.get('/genres', async (req, res) => {
  const newsData = await getNews();
  return res.send(renderTemplate('views/topanime.liquid', {newsData}));
});

app.get('/anime/:slug/', async (req, res) => {
  const animename = req.params.slug;
  const article = await fetch(`https://api.jikan.moe/v4/anime?q=${animename}&sfw`).then(res => res.json());
  return res.send(renderTemplate('views/detail.liquid', { article }));
});

const getNews = async () => {
  // const apiKey = process.env.NEWS_TOKEN;
  const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25`);
  const newsData = await response.json();
  // console.log('newsData', newsData);
  return newsData;
};

const fetchSeasonNow = async() => {
  const response = await fetch('https://api.jikan.moe/v4/seasons/now');
  const newsData = await response.json();
  // console.log('newsData', newsData);
  return newsData;
}


const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

