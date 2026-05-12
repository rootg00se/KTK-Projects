import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { Button } from "@/shared/components";
import { Pencil, Eye, Bold, Italic, List, Code, Heading3, Quote } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github.css";

export type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    onSave?: (text: string) => void;
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, onSave }) => {
    const [text, setText] = useState(value);
    const [tab, setTab] = useState<"write" | "preview">("write");

    useEffect(() => {
        setText(value);
    }, [value]);

    const textareaApply = (before: string, after = "") => {
        const textarea = document.querySelector("textarea");
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const selectedText = text.slice(start, end);
        const newText = text.slice(0, start) + before + selectedText + after + text.slice(end);

        setText(newText);
        onChange(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = start + before.length;
            textarea.selectionEnd = end + before.length;
        }, 0);
    };

    return (
        <div>
            <div className="border rounded-2xl overflow-hidden bg-background">
                <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                    <div className="flex items-center justify-between border-b px-3 py-2 bg-muted/50 max-xs:h-30">
                        <TabsList className="grid grid-cols-2 w-48 max-xs:block">
                            <TabsTrigger value="write" className="flex items-center gap-2">
                                <Pencil size={16} /> Текст
                            </TabsTrigger>
                            <TabsTrigger value="preview" className="flex items-center gap-2">
                                <Eye size={16} /> Превью
                            </TabsTrigger>
                        </TabsList>

                        {tab === "write" && (
                            <div className="flex items-center gap-1 max-md:flex-wrap max-md:max-w-40">
                                <Button size="icon" variant="ghost" onClick={() => textareaApply("### ")}>
                                    <Heading3 size={16} />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => textareaApply("**", "**")}>
                                    <Bold size={16} />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => textareaApply("*", "*")}>
                                    <Italic size={16} />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => textareaApply("1. ")}>
                                    <List size={16} />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => textareaApply("```language \n", "\n```")}
                                >
                                    <Code size={16} />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => textareaApply("> ")}>
                                    <Quote size={16} />
                                </Button>
                            </div>
                        )}
                    </div>

                    <TabsContent value="write" className="p-0">
                        <MDEditor
                            data-color-mode="light"
                            value={text}
                            onChange={(val) => {
                                const newValue = val || "";
                                setText(newValue);
                                onChange(newValue);
                            }}
                            preview="edit"
                            hideToolbar
                            height={500}
                            className="border-0! shadow-none!"
                            autoFocus={true}
                        />
                    </TabsContent>

                    <TabsContent value="preview" className="p-4">
                        <div className="prose max-w-none prose-pre:border-0 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:border-primary prose-pre:rounded-lg prose-pre:bg-transparent prose-pre:p-0">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                                {text}
                            </ReactMarkdown>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            {onSave && (
                <Button onClick={() => onSave(text)} className="mt-5 w-full max-w-40">
                    Сохранить
                </Button>
            )}
        </div>
    );
};
