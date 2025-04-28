// Save paper title
if (document.getElementById('paperForm')) {
  document.getElementById('paperForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('paperTitle').value;
    let papers = JSON.parse(localStorage.getItem('papers') || '[]');
    papers.push({ title: title, score: null });
    localStorage.setItem('papers', JSON.stringify(papers));
    alert('Paper submitted successfully!');
    this.reset();
  });
}

// Display papers for reviewer
if (document.getElementById('papersList')) {
  let papers = JSON.parse(localStorage.getItem('papers') || '[]');
  const papersList = document.getElementById('papersList');
  papers.forEach((paper, index) => {
    let div = document.createElement('div');
    div.innerHTML = `<p>${paper.title}</p>
                     <input type="number" id="score${index}" min="1" max="10" placeholder="Enter Score (1-10)">
                     <button onclick="submitScore(${index})">Submit Score</button><hr>`;
    papersList.appendChild(div);
  });
}

function submitScore(index) {
  let papers = JSON.parse(localStorage.getItem('papers') || '[]');
  const score = document.getElementById('score' + index).value;
  if (score >= 1 && score <= 10) {
    papers[index].score = parseInt(score);
    localStorage.setItem('papers', JSON.stringify(papers));
    alert('Score submitted!');
  } else {
    alert('Please enter a score between 1 and 10.');
  }
}

// Declare winner
function declareWinner() {
  let papers = JSON.parse(localStorage.getItem('papers') || '[]');
  let winner = papers.reduce((prev, current) => (prev.score > current.score) ? prev : current, {score: 0});
  localStorage.setItem('winner', winner.title);
  alert('Winner Declared!');
}

// Display winner
if (document.getElementById('winnerDisplay')) {
  const winner = localStorage.getItem('winner') || 'No winner declared yet.';
  document.getElementById('winnerDisplay').innerHTML = `<h2>${winner}</h2>`;
}
