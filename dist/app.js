/** Project data is kept separate from presentation so selections and credits are easy to update. */
const projects = {
  japan: {
    title: 'Japan, frame by frame', category: 'Creator / travel',
    fileId: '1axi52Em0FEGEmVvzQj83MEK6lwmiBAFU', format: 'Landscape · 16:9 · 00:32',
    role: 'Video editing',
    description: 'A creator travel edit bringing together moments from Japan. A compact visual sequence with attention to shot selection and the flow between scenes.',
  },
  documentary: {
    title: 'Real people. A shared story.', category: 'Documentary',
    fileId: '1P-UM74Xtl1q49Mdf7bXLLIa6C2TdPk16', format: 'Landscape · 16:9 · 11:21',
    role: 'Documentary video editing',
    description: 'A documentary editing sample centered on people, community, and place. Presented as a longer piece to explore the narrative beyond a short highlight.',
  },
  liquidity: {
    title: 'Big ideas. Short format.', category: 'Educational / short-form',
    fileId: '1B7LWcKobDxYJ532UTmJmuKIFHHVPhALI', format: 'Vertical · 9:16 · 00:51',
    role: 'Editing, captions & visual cues',
    description: 'Liquidity Pools: a vertical educational edit that pairs a presenter with captions and explanatory graphic elements to support the topic.',
  },
  aveeno: {
    title: 'A moment, well framed.', category: 'Product / lifestyle editing sample',
    fileId: '1nlKih6VPkuhjQxqbSmqJ42cCx92o_3KL', format: 'Vertical · 9:16 · 00:21',
    role: 'Social video editing',
    description: 'An AVEENO-labeled product and lifestyle editing sample, presented here as an example of vertical social editing.',
  },
  motion: {
    title: 'Made for the scroll.', category: 'Short-form editing sample',
    fileId: '1p7hSmSAVMM0u23b7pPcC10W5nEq4j1I7', format: 'Vertical · 9:16 · 00:17',
    role: 'Editing, supporting graphics & captions',
    description: 'A short-form editing sample combining spoken content with supporting graphics, cutout elements, and captions designed for vertical viewing.',
  },
  ai: {
    title: 'From prompt to picture.', category: 'AI-assisted visual story',
    fileId: '1UQw_RY1J72jDyao2qIxfvyNTYUgW12pa', format: 'Vertical · 9:16 · 00:51',
    role: 'AI-assisted production & video editing',
    description: 'A nature-themed example from my AI content collection. Generated visuals, animation, supporting captions, and editing come together in a vertical story.',
  },
};

// Navigation works with keyboard, touch, and an ordinary anchor fallback.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeNavigation() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeNavigation(); });
document.addEventListener('click', (event) => { if (!event.target.closest('.nav-shell')) closeNavigation(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNavigation(); });
matchMedia('(min-width: 641px)').addEventListener('change', closeNavigation);

// Filters keep the original card order and announce the updated result count.
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project')];
const filterStatus = document.querySelector('#filter-status');
const workIndex = document.querySelector('.work-index');
filters.forEach((filter) => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  filters.forEach((button) => {
    const active = button === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  cards.forEach((card) => {
    const visible = category === 'all' || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) count += 1;
  });
  const label = category === 'all' ? 'all work' : filter.textContent.trim();
  filterStatus.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'} in ${label}`;
  workIndex.textContent = `SELECTED / ${String(count).padStart(2, '0')} ${count === 1 ? 'PROJECT' : 'PROJECTS'}`;
}));

// Native dialog provides focus containment and Escape handling. The video is
// loaded only on request, and removed on close so playback cannot continue.
const dialog = document.querySelector('#project-dialog');
const videoStage = document.querySelector('#video-stage');
let projectTrigger;
document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    projectTrigger = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-category').textContent = project.category.toUpperCase();
    document.querySelector('#dialog-description').textContent = project.description;
    document.querySelector('#dialog-role').textContent = project.role;
    document.querySelector('#dialog-format').textContent = project.format;
    document.querySelector('#dialog-source').href = `https://drive.google.com/file/d/${project.fileId}/view`;
    const player = document.createElement('iframe');
    player.src = `https://drive.google.com/file/d/${project.fileId}/preview`;
    player.title = `${project.title} — video player`;
    player.allow = 'autoplay; fullscreen; picture-in-picture';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    videoStage.replaceChildren(player);
    dialog.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('.dialog-close').focus();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  videoStage.replaceChildren();
  document.body.classList.remove('modal-open');
  projectTrigger?.focus();
});

// Clipboard errors have an explicit mail fallback; success is announced.
const email = 'brionesmark63@gmail.com';
const toast = document.querySelector('#toast');
let toastTimer;
document.querySelector('.copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Email address copied. Let’s talk!';
  } catch {
    toast.textContent = 'Use the email link to get in touch: ' + email;
  }
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4000);
});
document.querySelector('#year').textContent = new Date().getFullYear();
