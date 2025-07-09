import React, { useEffect, useState } from 'react';
import { getFileContent } from './api';
import './content.css';

export default function Content({ owner, repo, fileName }: { owner: string, repo: string, fileName: string }) {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!owner || !repo || !fileName) return;
    
    setLoading(true);
    setFileContent(null);
    
    getFileContent({ owner, repo, path: fileName })
      .then(content => setFileContent(content))
      .finally(() => setLoading(false));
  }, [owner, repo, fileName]);

  if (loading) return <div className="content-loading">ファイル内容を読み込み中...</div>;
  if (!fileContent) return <div className="content-error">ファイル内容を取得できませんでした。</div>;

  return (
    <div className="content-area">
      <pre style={{ whiteSpace: 'pre-wrap' }}>{fileContent}</pre>
    </div>
  );
}