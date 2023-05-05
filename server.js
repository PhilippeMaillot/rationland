app.get('/images', (req, res) => {
  const images = [
    { name: 'Apex Legend', path: 'apex-legend.jpg' },
    { name: 'Brawl Stars', path: 'brawl-stars.jpg' },
    { name: 'Cyberpunk 2077', path: 'cyberpunk-2077.jpg' },
    { name: 'Destiny 2', path: 'destiny-2.jpg' },
    { name: 'Genshin Impact Raiden Shogun', path: 'GenshinImpact_RaidenShogun_zoomed-1.jpg' },
    { name: 'Mario Kart', path: 'mario-kart.jpg' },
    { name: 'MHW', path: 'MHW.jpg' },
    { name: 'Nier', path: 'Nier.jpg' },
    { name: 'Orgrimar', path: 'orgrimar.jpg' },
    { name: 'Satisfactory', path: 'satisfactory.webp' },
    { name: 'Splatoon 3', path: 'splatoon-3.jpg' },
    { name: 'Zelda', path: 'zelda.jpg' }
  ];

  res.json(images);
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});