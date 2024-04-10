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
  const newsData = await getNews();

  return res.send(renderTemplate('views/index.liquid', {newsData}));

  // return res.send(renderTemplate('views/index.liquid', { title: 'Movies', movieData }));
  // return res.send(renderTemplate('views/index.liquid', { title: 'Home' }));
});

// app.get('/movie/:id/', async (req, res) => {
//   const movieId = req.params.id;
//   const movie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_TOKEN}`).then(res => res.json());
//   return res.send(renderTemplate('views/detail.liquid', { title: 'Movie', movie }));
// });

const getNews = async () => {
  const apiKey = process.env.NEWS_TOKEN;
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=nl&apiKey=${apiKey}`);
  const newsData = await response.json();
  // console.log('newsData', newsData);/
  return newsData;
};


const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

