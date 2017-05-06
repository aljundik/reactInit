var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'> #{index + 1}</div>

                        <ul className='space-list-items'>
                            <li>
                                <img className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for' + repo.owner.login}
                                />

                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>
                                @{repo.owner.login}
                            </li>
                            <li>
                                {repo.stragazers_count} starts
                        </li>

                        </ul>

                    </li>)
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}


SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};
//create the Popular component
class Popular extends React.Component {
    //init the states of the app
    constructor(props) {
        super();
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        //after rendring update the state with the current language
        this.updateLanguage = this.updateLanguage.bind(this);
    }


    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);

    }
    updateLanguage(lang) {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        //ajax requests
        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos

                    }

                })
            }.bind(this));
    }
    render() {
        return (
            <div>
                <SelectLanguage
                // send props to the selectedLanguage function
                    selectedLanguage={this.state.selectedLanguage}
                    //when selected, update the sates and the get the new api data
                    onSelect={this.updateLanguage} />
                    
                {!this.state.repos
                    ? <p>LOADING!</p>
                    : <RepoGrid repos={this.state.repos} />}
            </div>
        )
    }
}

module.exports = Popular;