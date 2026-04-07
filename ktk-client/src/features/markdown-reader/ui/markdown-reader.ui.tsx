import React from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import { useFetchMarkdown } from "../model/useFetchMarkdown";
import "highlight.js/styles/github.css";

export const MarkdownReader: React.FC<{ profileUrl: string }> = ({ profileUrl }) => {
    const markdownContent = useFetchMarkdown(profileUrl);

    return (
        <div className="mb-3">
            <div className="prose max-w-none prose-pre:border prose-blockquote:border-primary prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:bg-transparent prose-pre:p-0">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </div>
    );
};
