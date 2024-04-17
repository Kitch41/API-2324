import './index.css';

console.log('Hello, world!');

function handleDayClick (event, dayElement) {
  event.preventDefault(); // Prevent default link behavior

  const days = document.querySelectorAll('#days a');

  days.forEach(otherDay => {
    if (otherDay !== dayElement) {
      otherDay.classList.remove('active');
    }
  });

  dayElement.classList.add('active');

  const day = dayElement.dataset.day;
  delayShowingSchedule(day);
}

async function delayShowingSchedule (day) {
  const scheduleList = document.querySelector('#schedulelist');
  const loading = document.querySelector('#loading-schedule');

  scheduleList.style.display = 'none';
  loading.style.display = 'flex';

  try {
    const apiUrl = `https://api.jikan.moe/v4/schedules?filter=${day}`;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    console.log('Fetched Data:', responseData.data); // Log the object directly

    const scheduleData = responseData.data;

    if (scheduleData && scheduleData.length > 0) {
      renderSchedule(scheduleData, scheduleList);
    } else {
      renderEmptySchedule(scheduleList);
    }

    scheduleList.style.display = 'flex';
    loading.style.display = 'none';
  } catch (error) {
    console.error('Error fetching schedule:', error);
    loading.style.display = 'none';
  }
}

function renderSchedule (scheduleData, scheduleList) {
    scheduleList.innerHTML = '';
  
    const renderedTitles = new Set(); // Set to track rendered titles
  
    scheduleData.forEach(item => {
      const title = item.title || 'Unknown'; // Use 'Unknown' if title is missing
      const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
  
      // Check if title has already been rendered
      if (!renderedTitles.has(title)) {
        const listItem = document.createElement('li');
        listItem.classList.add('schedule-li');
  
        const timeParagraph = document.createElement('p');
        timeParagraph.textContent = item.broadcast && item.broadcast.time ? item.broadcast.time : 'Unknown';
  
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = title;
  
        const seeNowLink = document.createElement('a');
        seeNowLink.classList.add('btn');
        seeNowLink.href = `/anime/${formattedTitle}`;
        seeNowLink.textContent = 'See Now';
  
        listItem.appendChild(timeParagraph);
        listItem.appendChild(titleParagraph);
        listItem.appendChild(seeNowLink);
  
        scheduleList.appendChild(listItem);
  
        renderedTitles.add(title); // Add title to the rendered set
      }
    });
  
    console.log('Schedule rendered successfully.');
  }

function renderEmptySchedule (scheduleList) {
  scheduleList.innerHTML = '<li>No schedule available</li>';
}

function initializeSchedule () {
  const days = document.querySelectorAll('#days a');

  days.forEach(day => {
    day.addEventListener('click', (event) => {
      handleDayClick(event, day);
    });
  });

  const mondayButton = document.querySelector('#days a[data-day="monday"]');
  if (mondayButton) {
    mondayButton.click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeSchedule();
});
