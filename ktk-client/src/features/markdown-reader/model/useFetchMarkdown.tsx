import { useEffect, useState } from "react";

export const useFetchMarkdown = (profileUrl: string | null | undefined) => {
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        const fetchMarkdown = async () => {
            if (!profileUrl) return setMarkdownContent("");

            try {
                const response = await fetch(profileUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const text = await response.text();

                setMarkdownContent(text);
            } catch (err) {
                console.log(err);
                setMarkdownContent("");
            }
        };

        fetchMarkdown();
    }, [profileUrl]);

    if (!markdownContent) return null;

    return markdownContent;
};
