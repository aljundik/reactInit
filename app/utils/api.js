var axios = require('axios');


var id = "your_id";
var sec = "yourSecretId";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function (user) {
            return user.data;
        })
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}
//we want to take the reps data and reduce it to one object,,,check .reduce 
function getStarsCount(repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count
    }, 0);
}

function claculateScore(profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarsCount(repos);

    return (followers * 3) + totalStars;
}
function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function (data) {
        var profile = data[0];
        var repos = data[1];
        return {
            profile: profile,
            score: claculateScore(profile, repos)
        }
    })
}

function sortPlayers(players) {
    return players.sort(function (a, b) {
        return b.score - a.score;
    })
}

module.exports = {

    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    //make a request, formated and recive the data
    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then(function (response) {
                return response.data.items;
            });
    }
};