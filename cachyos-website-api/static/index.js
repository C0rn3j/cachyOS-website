// define gruvbox color palette
const gruvboxColors = {
  light0: '#fbf1c7',
  light1: '#ebdbb2',
  light2: '#d5c4a1',
  light3: '#bdae93',
  light4: '#a89984',
  light5: '#928374',
  dark0: '#282828',
  dark1: '#3c3836',
  dark2: '#504945',
  dark3: '#665c54',
  dark4: '#7c6f64',
  dark5: '#928374',
  red: '#cc241d',
  green: '#98971a',
  yellow: '#d79921',
  blue: '#458588',
  purple: '#b16286',
  aqua: '#689d6a',
  orange: '#d65d0e',
};

const getPreparedCounts = (data) => {
  // extract download counts by name
  const counts = {};
  data.forEach((obj) => {
    const day = obj.timestamp.split('T')[0];
    if (counts[day]) {
      counts[day]++;
    } else {
      counts[day] = 1;
    }
  });

  // prepare chart data
  const labels = Object.keys(counts);
  const values = Object.values(counts);

  return { labels, values };
};

const toggleChartColors = (theme, chart) => {
  const colors =
    theme === 'dark'
      ? {
          orange: gruvboxColors.orange,
          yellow: gruvboxColors.yellow,
          green: gruvboxColors.green,
          purple: gruvboxColors.purple,
          blue: gruvboxColors.blue,
          dark1: gruvboxColors.dark1,
          dark2: gruvboxColors.dark2,
          light1: gruvboxColors.light1,
          light2: gruvboxColors.light2,
          white: gruvboxColors.white,
        }
      : {
          orange: '#ff7f0e',
          yellow: '#ffdc87',
          green: '#1f77b4',
          purple: '#9467bd',
          blue: '#17becf',
          dark1: '#333333',
          dark2: '#555555',
          light1: '#f7f7f7',
          light2: '#eeeeee',
          white: '#ffffff',
        };

  const body = document.getElementsByTagName('body')[0];
  const themeToggle = document.getElementById('theme-toggle');
  if (theme === 'dark') {
    body.classList.remove('light');
    body.classList.add('dark');
    themeToggle.style.backgroundColor = gruvboxColors.light0;
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    themeToggle.style.backgroundColor = colors.orange + '80';
  }

  localStorage.theme = theme;

  const gradient = chart.ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, colors.orange + '80');
  gradient.addColorStop(0.5, colors.green + '80');
  gradient.addColorStop(1, colors.blue + '80');

  chart.data.datasets[0].backgroundColor = gradient;
  chart.data.datasets[0].borderColor = colors.orange;
  chart.data.datasets[1].backgroundColor = colors.blue + '80';
  chart.data.datasets[1].borderColor = colors.blue;
  chart.data.datasets[2].backgroundColor = colors.green + '80';
  chart.data.datasets[2].borderColor = colors.green;
  chart.data.datasets[3].backgroundColor = colors.purple + '80';
  chart.data.datasets[3].borderColor = colors.purple;
  chart.options.legend.labels.fontColor = colors.light1;
  chart.options.scales.y.ticks.fontColor = colors.light1;
  chart.options.scales.x.ticks.fontColor = colors.light1;
  chart.options.scales.y.grid.color = colors.dark2;
  chart.options.scales.x.grid.color = colors.dark2;

  chart.update();
};

const updateChartData = (timePeriod, data, overallDownloads, chart) => {
  const kdeData = data.filter((d) => d.name === 'KDE PLASMA');
  const gnomeData = data.filter((d) => d.name === 'GNOME');
  const desktopEdition = data.filter((d) => d.name === 'Desktop Edition');
  const handheldEdition = data.filter((d) => d.name === 'Handheld Edition');

  // Get the current time
  const currentTime = Date.now();

  // Calculate the start time based on the selected time range
  let startTime;
  switch (timePeriod) {
    case '24h': {
      startTime = currentTime - 24 * 60 * 60 * 1000;
      break;
    }
    case '7d': {
      startTime = currentTime - 7 * 24 * 60 * 60 * 1000;
      break;
    }
    case '30d': {
      startTime = currentTime - 30 * 24 * 60 * 60 * 1000;
      break;
    }
    case 'none':
    default: {
      const sum1 = getPreparedCounts(kdeData).values.reduce((partialSum, x) => partialSum + x, 0);
      const sum2 = getPreparedCounts(gnomeData).values.reduce((partialSum, x) => partialSum + x, 0);
      const sum3 = getPreparedCounts(desktopEdition).values.reduce((partialSum, x) => partialSum + x, 0);
      const sum4 = getPreparedCounts(handheldEdition).values.reduce((partialSum, x) => partialSum + x, 0);
      overallDownloads.innerHTML = sum1 + sum2 + sum3 + sum4;
      chart.data.labels = getPreparedCounts(data).labels;
      chart.data.datasets[0].data = getPreparedCounts(kdeData).values;
      chart.data.datasets[1].data = getPreparedCounts(gnomeData).values;
      chart.data.datasets[2].data = getPreparedCounts(desktopEdition).values;
      chart.data.datasets[3].data = getPreparedCounts(handheldEdition).values;
      chart.update();
      return;
    }
  }

  const filteredData = data.filter((item) => {
    const itemTime = new Date(item.timestamp).getTime();
    return itemTime >= startTime && itemTime <= currentTime;
  });
  const filteredDataKde = kdeData.filter((item) => {
    const itemTime = new Date(item.timestamp).getTime();
    return itemTime >= startTime && itemTime <= currentTime;
  });
  const filteredDataGnome = gnomeData.filter((item) => {
    const itemTime = new Date(item.timestamp).getTime();
    return itemTime >= startTime && itemTime <= currentTime;
  });
  const filteredDataDesktop = desktopEdition.filter((item) => {
    const itemTime = new Date(item.timestamp).getTime();
    return itemTime >= startTime && itemTime <= currentTime;
  });
  const filteredDataHandheld = handheldEdition.filter((item) => {
    const itemTime = new Date(item.timestamp).getTime();
    return itemTime >= startTime && itemTime <= currentTime;
  });
  const preparedCountsKde = getPreparedCounts(filteredDataKde);
  const preparedCountsGnome = getPreparedCounts(filteredDataGnome);
  const preparedCountsDesktop = getPreparedCounts(filteredDataDesktop);
  const preparedCountsHandheld = getPreparedCounts(filteredDataHandheld);

  const labels = getPreparedCounts(filteredData).labels;
  const sum1 = preparedCountsKde.values.reduce((partialSum, x) => partialSum + x, 0);
  const sum2 = preparedCountsGnome.values.reduce((partialSum, x) => partialSum + x, 0);
  const sum3 = preparedCountsDesktop.values.reduce((partialSum, x) => partialSum + x, 0);
  const sum4 = preparedCountsHandheld.values.reduce((partialSum, x) => partialSum + x, 0);
  overallDownloads.innerHTML = sum1 + sum2 + sum3 + sum4;

  // Update the chart data and options
  chart.data.labels = labels;
  chart.data.datasets[0].data = labels.map(
    (label) => preparedCountsKde.values[preparedCountsKde.labels.indexOf(label)]
  );
  chart.data.datasets[1].data = labels.map(
    (label) => preparedCountsGnome.values[preparedCountsGnome.labels.indexOf(label)]
  );
  chart.data.datasets[2].data = labels.map(
    (label) => preparedCountsDesktop.values[preparedCountsDesktop.labels.indexOf(label)]
  );
  chart.data.datasets[3].data = labels.map(
    (label) => preparedCountsHandheld.values[preparedCountsHandheld.labels.indexOf(label)]
  );
  chart.update();
};

// retrieved data as a JSON array of JSON objects
fetch('https://iso-stats.cachyos.org/api/downloads')
  .then((response) => response.json())
  .then((data) => {
    const chartOptions = {
      legend: {
        labels: {
          fontColor: gruvboxColors.light1,
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            fontColor: gruvboxColors.light1,
          },
          grid: {
            color: gruvboxColors.dark2,
          },
        },
        x: {
          type: 'time',
          time: {
            parser: 'YYYY-MM-DD',
            unit: 'day',
            displayFormats: {
              day: 'MMM D',
            },
            tooltipFormat: 'MMM D, YYYY',
            isoWeekday: true,
          },
          ticks: {
            fontColor: gruvboxColors.light1,
          },
          grid: {
            color: gruvboxColors.dark2,
          },
        },
      },
    };

    const overallDownloads = document.getElementById('overall-downloads');

    const labels = getPreparedCounts(data).labels;

    // create chart
    const ctx = document.getElementById('myChart');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'KDE Download Counts',
            data: [],
            backgroundColor: {
              type: 'linear',
              x0: 0,
              x1: 0,
              y0: 0,
              y1: 1,
              colorStops: [
                {
                  offset: 0,
                  color: gruvboxColors.orange + '80',
                },
                {
                  offset: 0.5,
                  color: gruvboxColors.green + '80',
                },
                {
                  offset: 1,
                  color: gruvboxColors.blue + '80',
                },
              ],
            },
            borderColor: gruvboxColors.orange,
            pointBackgroundColor: gruvboxColors.light1,
            pointBorderColor: gruvboxColors.dark1,
            pointBorderWidth: 1,
            pointRadius: 3,
            pointHitRadius: 10,
            borderWidth: 2,
          },
          {
            label: 'GNOME Download Counts',
            data: [],
            backgroundColor: gruvboxColors.blue + '80',
            borderColor: gruvboxColors.blue,
            pointBackgroundColor: gruvboxColors.light1,
            pointBorderColor: gruvboxColors.dark1,
            pointBorderWidth: 1,
            pointRadius: 3,
            pointHitRadius: 10,
            borderWidth: 2,
          },
          {
            label: 'Desktop Edition Download Counts',
            data: [],
            backgroundColor: gruvboxColors.green + '80',
            borderColor: gruvboxColors.green,
            pointBackgroundColor: gruvboxColors.light1,
            pointBorderColor: gruvboxColors.dark1,
            pointBorderWidth: 1,
            pointRadius: 3,
            pointHitRadius: 10,
            borderWidth: 2,
          },
          {
            label: 'Handheld Edition Download Counts',
            data: [],
            backgroundColor: gruvboxColors.purple + '80',
            borderColor: gruvboxColors.purple,
            pointBackgroundColor: gruvboxColors.light1,
            pointBorderColor: gruvboxColors.dark1,
            pointBorderWidth: 1,
            pointRadius: 3,
            pointHitRadius: 10,
            borderWidth: 2,
          },
        ],
      },
      options: chartOptions,
    });

    updateChartData('30d', data, overallDownloads, chart);

    // set initial color scheme to dark
    if (!localStorage.theme) {
      localStorage.theme = 'dark';
    }
    toggleChartColors(localStorage.theme, chart);

    // add event listener for theme toggle button
    const button = document.getElementById('theme-toggle');
    button.addEventListener('click', () => {
      // toggle body class
      const body = document.getElementsByTagName('body')[0];

      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        toggleChartColors('light', chart);
      } else {
        body.classList.remove('light');
        body.classList.add('dark');
        toggleChartColors('dark', chart);
      }
    });

    // Get the time period dropdown menu
    const timePeriod = document.getElementById('time-period');
    // Add an event listener to the dropdown menu
    timePeriod.addEventListener('change', () => {
      // Get the selected time period
      const selectedPeriod = timePeriod.value;

      // Update the chart data based on the selected time period
      updateChartData(selectedPeriod, data, overallDownloads, chart);
    });
  })
  .catch((error) => console.error(error));
