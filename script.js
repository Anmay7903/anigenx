const user = JSON.parse(localStorage.getItem('loggedUser'));
const videos = JSON.parse(localStorage.getItem('videos')) || [];
const grid = document.getElementById('videoGrid');

function displayVideos(filter = "") {
  if (!grid) return;

  grid.innerHTML = '';
  const filtered = videos.filter(v => v.title.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(video => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}" class="preview" data-url="${video.url}" />
      <div class="info">
        <h3>${video.title}</h3>
        ${video.premium ? '<span class="premium">Premium</span>' : ''}
        <br/>
        ${
          video.premium && (!user || user.role !== "premium")
            ? '<span class="locked">🔒 Premium Only</span>'
            : `<a href="${video.url}" download>Download</a>`
        }
      </div>
    `;
    grid.appendChild(card);
  });

  attachModalHandlers();
}

function attachModalHandlers() {
  const previews = document.querySelectorAll('.preview');
  previews.forEach(preview => {
    preview.addEventListener('click', () => {
      const url = preview.getAttribute('data-url');
      document.getElementById('previewPlayer').src = url;
      document.getElementById('videoModal').classList.remove('hidden');
    });
  });

  document.getElementById('closeModal').onclick = () => {
    document.getElementById('videoModal').classList.add('hidden');
    document.getElementById('previewPlayer').pause();
  };
}

document.getElementById('searchInput')?.addEventListener("input", (e) => {
  displayVideos(e.target.value);
});

window.onload = () => displayVideos();
