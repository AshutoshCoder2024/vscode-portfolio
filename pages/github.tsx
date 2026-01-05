import { useEffect, useState } from 'react';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import { VscRepo, VscPerson, VscLoading } from 'react-icons/vsc';

import RepoCard from '@/components/RepoCard';
import { Repo, User } from '@/types';

import styles from '@/styles/GithubPage.module.css';

const GithubPage = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPinnedRepos, setIsPinnedRepos] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      const githubUsername =
        process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'AshutoshCoder2024';

      try {
        setLoading(true);
        setError(null);

        // Fetch user data
        const userRes = await fetch(
          `https://api.github.com/users/${githubUsername}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!userRes.ok) {
          throw new Error(`Failed to fetch user: ${userRes.status}`);
        }

        const userData = await userRes.json();

        // Fetch pinned repositories using GraphQL API
        const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        
        const graphqlQuery = {
          query: `
            query($username: String!) {
              user(login: $username) {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on Repository {
                      id
                      name
                      description
                      url
                      homepageUrl
                      stargazerCount
                      forkCount
                      watchers {
                        totalCount
                      }
                      primaryLanguage {
                        name
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            username: githubUsername,
          },
        };

        const graphqlHeaders: HeadersInit = {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        };

        // Add authorization header if token is available
        if (githubToken) {
          graphqlHeaders['Authorization'] = `Bearer ${githubToken}`;
        }

        let reposList: Repo[] = [];

        try {
          const graphqlRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: graphqlHeaders,
            body: JSON.stringify(graphqlQuery),
          });

          if (!graphqlRes.ok) {
            const status = graphqlRes.status;
            if (status === 403 || status === 401) {
              setError(
                'GitHub API authentication required. To fix this:\n\n1. Go to https://github.com/settings/tokens\n2. Click "Generate new token (classic)"\n3. Give it a name (e.g., "Portfolio Token")\n4. Select scope: "public_repo" (or just check "public_repo")\n5. Click "Generate token"\n6. Copy the token\n7. Create a .env.local file in your project root\n8. Add: NEXT_PUBLIC_GITHUB_TOKEN=your_token_here\n9. Restart your dev server'
              );
              reposList = [];
              setIsPinnedRepos(true);
            } else {
              console.error(`GraphQL request failed: ${status}`);
              reposList = [];
              setIsPinnedRepos(true);
            }
          } else {
            const graphqlData = await graphqlRes.json();

            if (graphqlData.errors) {
              const errorMessage = graphqlData.errors[0]?.message || '';
              if (
                errorMessage.includes('rate limit') ||
                errorMessage.includes('401') ||
                errorMessage.includes('403')
              ) {
                setError(
                  'GitHub API authentication required. To fix this:\n\n1. Go to https://github.com/settings/tokens\n2. Click "Generate new token (classic)"\n3. Give it a name (e.g., "Portfolio Token")\n4. Select scope: "public_repo"\n5. Click "Generate token"\n6. Copy the token\n7. Create a .env.local file in your project root\n8. Add: NEXT_PUBLIC_GITHUB_TOKEN=your_token_here\n9. Restart your dev server'
                );
                reposList = [];
                setIsPinnedRepos(true);
              } else {
                // Other errors, but still try to get data if available
                console.warn('GraphQL errors:', graphqlData.errors);
              }
            }

            const pinnedRepos = graphqlData.data?.user?.pinnedItems?.nodes || [];

            if (pinnedRepos.length > 0) {
              reposList = pinnedRepos.map((repo: any) => ({
                id: parseInt(repo.id) || 0,
                name: repo.name,
                description: repo.description,
                language: repo.primaryLanguage?.name || '',
                watchers: repo.watchers?.totalCount || 0,
                forks: repo.forkCount || 0,
                stargazers_count: repo.stargazerCount || 0,
                html_url: repo.url,
                homepage: repo.homepageUrl || '',
              }));
              setIsPinnedRepos(true);
            } else {
              reposList = [];
              setIsPinnedRepos(true);
            }
          }
        } catch (graphqlError) {
          console.error('Failed to fetch pinned repos:', graphqlError);
          reposList = [];
          setIsPinnedRepos(true);
          setError('Failed to fetch pinned repositories. Please try again later.');
        }

        setUser({
          login: userData.login,
          avatar_url: userData.avatar_url,
          public_repos: userData.public_repos,
          followers: userData.followers,
        });
        setRepos(reposList);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch GitHub data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.pageHeading}>
          <h1 className={styles.pageTitle}>GitHub</h1>
          <p className={styles.pageSubtitle}>
            Browse through my GitHub repositories and see what I&apos;ve been
            working on. These are some of my public repositories showcasing
            various projects and skills.
          </p>
        </div>
        <div className={styles.loadingContainer}>
          <VscLoading className={styles.loadingIcon} />
          <p>Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.layout}>
        <div className={styles.pageHeading}>
          <h1 className={styles.pageTitle}>GitHub</h1>
          <p className={styles.pageSubtitle}>
            Browse through my GitHub repositories and see what I&apos;ve been
            working on. These are some of my public repositories showcasing
            various projects and skills.
          </p>
        </div>
        <div className={styles.errorContainer}>
          <p className={styles.errorTitle}>Error: {error ? 'GitHub API Authentication Required' : 'Failed to load GitHub data'}</p>
          {error && error.includes('GitHub API authentication') ? (
            <div className={styles.errorInstructions}>
              <p className={styles.errorSubtext}>
                <strong>To fix this, follow these steps:</strong>
              </p>
              <ol className={styles.errorList}>
                <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">GitHub Settings → Tokens</a></li>
                <li>Click &quot;Generate new token (classic)&quot;</li>
                <li>Give it a name (e.g., &quot;Portfolio Token&quot;)</li>
                <li>Select scope: <strong>public_repo</strong></li>
                <li>Click &quot;Generate token&quot;</li>
                <li>Copy the token (you won&apos;t see it again!)</li>
                <li>Create a <code>.env.local</code> file in your project root</li>
                <li>Add: <code>NEXT_PUBLIC_GITHUB_TOKEN=your_token_here</code></li>
                <li>Restart your dev server</li>
              </ol>
            </div>
          ) : (
            <p className={styles.errorSubtext}>
              Please try refreshing the page.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>GitHub</h1>
        <p className={styles.pageSubtitle}>
          Browse through my GitHub repositories and see what I&apos;ve been
          working on. These are some of my public repositories showcasing
          various projects and skills.
        </p>
      </div>

      <div className={styles.githubPage}>
        <div className={styles.profileSection}>
          <div className={styles.profileInfo}>
            <Image
              src={user.avatar_url}
              className={styles.avatar}
              alt={user.login}
              width={100}
              height={100}
              priority
            />
            <div className={styles.userInfo}>
              <h2 className={styles.username}>{user.login}</h2>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <VscRepo className={styles.statIcon} />
                  <span>{user.public_repos} repositories</span>
                </div>
                <div className={styles.statItem}>
                  <VscPerson className={styles.statIcon} />
                  <span>{user.followers} followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Pinned Repositories</h3>
        </div>
        {repos.length > 0 ? (
          <div className={styles.reposContainer}>
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No pinned repositories found.</p>
            <p className={styles.emptyStateSubtext}>
              Pin your favorite repositories on your GitHub profile to see them here.
            </p>
          </div>
        )}
        <div className={styles.contributions}>
          <GitHubCalendar
            username={user.login}
            hideColorLegend
            hideMonthLabels
            colorScheme="dark"
            theme={{
              dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              light: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            style={{
              width: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'GitHub' },
  };
}

export default GithubPage;
