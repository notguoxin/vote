var vote = {
    memory: {
        enable_multi_vote: false,
        errors:0
    }
}

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




document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('vote-select');
    const voteButton = document.getElementById('vote-button');

    // Add a click event listener to the vote button
    voteButton.addEventListener('click', () => {
        const selectedOption = select.value;
        if (vote.memory.enable_multi_vote) {

        } else {
            select.style.display = "none"
            voteButton.style.display = "none"
        }
        fetch(`/endpoint/vote/${selectedOption}/${getCookie("UID")}`, { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network ERROR.');
                }
                return response.json();
            })
            .then(data => {
                updateVoteCount(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });

});
function getVoteData() {
if (!vote.memory.errors < 2){
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
            vote.memory.errors =vote.memory.errors + 1
            console.log(vote.memory.errors)
            console.error('There was a problem with the fetch operation:', error);
        });
}
}
setTimeout(() => {
    setInterval(getVoteData, 1500);
}, 150);