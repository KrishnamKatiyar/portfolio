import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const GithubPage = ({ repos, user, error }) => {
  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading GitHub data:</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const theme = {
    level0: '#161B22',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  };

  return (
    <>
      <div className={styles.user}>
        {user ? (
          <>
            <div>
              <Image
                src={user.avatar_url}
                className={styles.avatar}
                alt={user.login}
                width={50}
                height={50}
              />
              <h3 className={styles.username}>{user.login}</h3>
            </div>
            <div>
              <h3>{user.public_repos} repos</h3>
            </div>
            <div>
              <h3>{user.followers} followers</h3>
            </div>
          </>
        ) : (
          <div>No user data available</div>
        )}
      </div>
      <div className={styles.container}>
        {repos && repos.length > 0 ? (
          repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <div>No repositories found</div>
        )}
      </div>
      <div className={styles.contributions}>
        <GitHubCalendar
          username={GITHUB_USERNAME}
          theme={theme}
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'node-fetch'
      },
    });

    if (!userRes.ok) {
      throw new Error(`GitHub User API Error: ${userRes.status} ${await userRes.text()}`);
    }

    const user = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      },
    });

    if (!repoRes.ok) {
      throw new Error(`GitHub Repos API Error: ${repoRes.status} ${await repoRes.text()}`);
    }

    let repos = await repoRes.json();

    let recentRepos = repos
      .filter(repo => repo.name !== 'LeetCode' && repo.name !== GITHUB_USERNAME)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 5);

    const mostStarredRepo = repos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

    repos = recentRepos.some(repo => repo.id === mostStarredRepo.id)
      ? recentRepos
      : [mostStarredRepo, ...recentRepos.slice(0, 5)];

    return {
      props: { title: 'GitHub', repos, user },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        title: 'GitHub',
        error: { message: error.message, stack: error.stack },
        repos: null,
        user: null,
      },
      revalidate: 10,
    };
  }
}

export default GithubPage;
