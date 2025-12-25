import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
}

const MarkdownView: React.FC<Props> = ({ content }) => {
  return (
    <div className="markdown-content text-light-text dark:text-dark-text font-sans">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownView;