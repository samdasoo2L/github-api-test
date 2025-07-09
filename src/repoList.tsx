import React, { useEffect, useState } from 'react';
import { getRepoList } from './api';
import FileList from './fileList';
import './repoList.css';

export default function RepoList({ userName }: { userName: string }) {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openRepo, setOpenRepo] = useState<string | null>(null);

  useEffect(() => {
    if (!userName) {
      setRepos([]);
      return;
    }
    setLoading(true);
    getRepoList(userName)
      .then(data => setRepos(data || []))
      .finally(() => setLoading(false));
    setOpenRepo(null); // 검색할 때마다 열려있는 파일리스트 닫기
  }, [userName]);

  if (!userName) return null;
  if (loading) return <p>読み込み中...</p>;
  if (repos.length === 0)
    return (
      <div style={{ background: '#fff3cd', padding: 20, borderRadius: 5, marginTop: 20 }}>
        <h3>ユーザーが見つかりません</h3>
        <p>'{userName}' ユーザーが存在しないか、公開リポジトリがありません。</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>ユーザー名が正しいか確認してください</li>
          <li>そのユーザーがGitHubに存在するか確認してください</li>
          <li>公開リポジトリがあるユーザーか確認してください</li>
        </ul>
      </div>
    );

  return (
    <div className="repo-list">
      <div className="repo-list-title">{userName}のリポジトリ ({repos.length}件)</div>
      <ul className="repo-list-ul">
        {repos.map((repo: any) => (
          <li
            key={repo.id}
            className={`repo-list-item${openRepo === repo.name ? ' selected' : ''}`}
          >
            <div
              className="repo-name"
              onClick={() => setOpenRepo(openRepo === repo.name ? null : repo.name)}
            >
              {repo.name}
            </div>
            <div className="repo-desc">{repo.description || '説明なし'}</div>
            {/* 클릭된 레포만 파일리스트 표시 */}
            {openRepo === repo.name && (
              <FileList owner={userName} repo={repo.name} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}