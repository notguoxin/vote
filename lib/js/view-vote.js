function updateVoteCount(votes) {
    const options = Object.entries(votes).map(([option, count]) => [option, count === "-INFINITY" ? -Infinity : count])
        .sort((a, b) => b[1] - a[1]);

    const voteList = document.getElementById('vote-list');
    voteList.innerHTML = '';

    for (let i = 0; i < options.length; i++) {
        const [option, count] = options[i];
        const li = document.createElement('li');
        li.className = "votes_list";
        li.innerHTML = `${option}: <span class="votes_normal">${count}</span>`;
        if (i < 5) {
            li.classList.add("votes_danger");
        }
        voteList.appendChild(li);
    }
}


function getVoteData() {
    fetch(`/endpoint/vote/get/vote_data`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateVoteCount(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
document.addEventListener('DOMContentLoaded', () => {
    setInterval(getVoteData, 1500);
});