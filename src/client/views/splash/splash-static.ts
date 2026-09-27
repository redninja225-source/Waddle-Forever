const splashApi = (window as any).api;

document.getElementById('main-mode')!.addEventListener('click', () => {
  splashApi.selectMode('main');
});

document.getElementById('story-mode')!.addEventListener('click', () => {
  splashApi.selectMode('timeline');
});
