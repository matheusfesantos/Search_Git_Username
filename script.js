const token = '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'; // token

let username = ''; //armazenar o username

// Função para receber o username e buscar repositórios
function receberUsername() {
    username = document.getElementById('UserInput').value;
    if (username) {
        getRepos(); // Chama a função getRepos() depois de definir o username
    } else {
        alert('Por favor, insira um nome de usuário.');
    }
}

// Função assíncrona para pegar os repositórios
async function getRepos() {
    const url = `https://api.github.com/users/${username}/repos`;

    // Limpar a lista de repositórios antes de carregar novos
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; 

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        // Verificando a resposta
        if (response.ok) {
            const repos = await response.json();
            displayRepos(repos);
            console.log("API = OK");
            console.log(repos)
        } else {
            console.error('Erro ao buscar repositórios:', response.status);
            alert('Não foi possível encontrar o usuário ou os repositórios.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar repositórios.');
    }
}

// Função para exibir os repositórios na tela
function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');

        const repoName = document.createElement('h3');
        repoName.textContent = repo.name;

        const repoDescription = document.createElement('p');
        repoDescription.textContent = repo.description ? repo.description : 'Sem descrição';

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = 'Ver no GitHub';
        repoLink.target = '_blank';

        repoDiv.appendChild(repoName);
        repoDiv.appendChild(repoDescription);
        repoDiv.appendChild(repoLink);

        reposList.appendChild(repoDiv);
    });
}