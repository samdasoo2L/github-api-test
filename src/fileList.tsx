import React, { useEffect, useState } from 'react';
import { getFileList } from './api';
import Content from './content';
import './fileList.css';

export default function FileList({ owner, repo }: { owner: string, repo: string }) {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;
    setLoading(true);
    getFileList({ owner, repo, path: '' })
      .then(data => setFiles(data || []))
      .finally(() => setLoading(false));
  }, [owner, repo]);

  const handleFileClick = (file: string) => {
    setSelectedFile(selectedFile === file ? null : file);
  };

  if (loading) return <div>ファイルリストを読み込み中...</div>;
  if (!files.length) return <div>ファイルがありません。</div>;

  return (
    <ul className="file-list-ul">
      {files.map((file, idx) => (
        <li className="file-list-item" key={idx}>
          <span
            className="file-link"
            onClick={() => handleFileClick(file)}
          >
            {file}
          </span>
          {selectedFile === file && (
            <Content owner={owner} repo={repo} fileName={file} />
          )}
        </li>
      ))}
    </ul>
  );
}
