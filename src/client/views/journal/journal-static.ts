type Quest = {
  title: string;
  description: string;
  reward: number;
  available: boolean;
  complete: boolean;
  progress: number;
  rooms: number[];
};

type Achievement = {
  title: string;
  description: string;
  unlocked: boolean;
};

window.addEventListener('journal-data', (event: any) => {
  const data = event.detail;

  document.getElementById('player-name')!.innerText = data.playerName;
  document.getElementById('current-era')!.innerText = data.currentEra;
  document.getElementById('unlocked-era')!.innerText = data.unlockedEra;
  document.getElementById('coin-count')!.innerText = `${data.coins.toLocaleString()} coins`;
  document.getElementById('quest-summary')!.innerText = `${data.completedQuestCount}/${data.questCount} quests`;
  document.getElementById('achievement-summary')!.innerText = `${data.unlockedAchievementCount}/${data.totalAchievementCount} achievements`;

  document.getElementById('quest-list')!.innerHTML = data.quests.map((quest: Quest) => `
    <div class="journal-card ${quest.complete ? 'complete' : quest.available ? 'available' : 'locked'}">
      <div class="card-title">${quest.title}</div>
      <div class="card-status">${quest.complete ? 'COMPLETE' : quest.available ? `${quest.progress}/${quest.rooms.length} steps` : 'LOCKED'}</div>
      <div class="card-description">${quest.description}</div>
      <div class="card-reward">Reward: ${quest.reward} coins</div>
    </div>
  `).join('');

  document.getElementById('achievement-list')!.innerHTML = data.achievements.map((achievement: Achievement) => `
    <div class="journal-card ${achievement.unlocked ? 'complete' : 'locked'}">
      <div class="card-title">${achievement.title}</div>
      <div class="card-status">${achievement.unlocked ? 'UNLOCKED' : 'LOCKED'}</div>
      <div class="card-description">${achievement.description}</div>
    </div>
  `).join('');
});
