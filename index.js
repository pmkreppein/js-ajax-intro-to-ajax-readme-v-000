function showRepositories(){
  //tell the interpreter its working with JSON by
    var repos = JSON.parse(this.responseText);
  //this is set to the XHR object that fired the event
  console.log(repos);
  //lets parse the response
  const repoList = `<ul>${repos.map(
                                    r =>
                                        '<li>' +
                                        r.name +
                                        //add link to repository commmits
                                        ' - <a href="#" data-repo="' +
                                        r.name +
                                        '" onclick="getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}


function getRepositories() {
//making the XHR (XMLHttpRequest) request to the server without reloading the page
      const req = new XMLHttpRequest();
      req.addEventListener('load', showRepositories);
      req.open('GET', 'https://api.github.com/users/octocat/repos');
      req.send();
}

function getCommits(el){
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', showCommits);
    //event listener with callback function
    req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
    req.send();
}

function showCommits(){
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><strong>' +
          commit.author.login +
          '</strong> - ' +
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
      document.getElementById('commits').innerHTML = commitsList
}