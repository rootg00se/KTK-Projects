import React from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github.css";

export const MarkdownReader: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="mb-3">
            <div className="prose max-w-none prose-pre:border prose-blockquote:border-primary prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:bg-transparent prose-pre:p-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};
