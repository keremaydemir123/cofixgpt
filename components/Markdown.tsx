import { FC, ReactElement, useState } from "react";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rangeParser from "parse-numeric-range";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import ClipboardIcon from "@/icons/ClipboardIcon";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

export interface MarkdownTypes {
  markdown: { content: string };
}

type MarkdownProps = MarkdownTypes;

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme = materialLight;

  interface PreProps {
    className: string;
  }

  interface PreNode {
    node: Node & { [key: string]: any };
    children: ReactElement<PreProps, string>[];
    position: object;
    properties: object;
    tagName: string;
    type: string;
  }

  interface Node {
    [key: string]: any;
    type: string;
    value: string;
  }

  interface H3Props {
    children: React.ReactNode;
  }

  const MarkdownComponents: object = {
    code({
      node,
      inline,
      className,
      ...props
    }: {
      node: Node;
      inline: boolean;
      className: string;
      [key: string]: any;
    }) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights = (lineNumber: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta.replace(/\s/g, "");
          let strlineNumbers = "0";
          if (RE.test(metadata)) {
            const match = RE.exec(metadata);
            if (match) {
              strlineNumbers = match[1];
            }
          }
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(lineNumber) ? "highlight" : undefined;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
    p: (paragraph: { children?: boolean; node?: Node }) => {
      const { node } = paragraph;

      if (node?.children[0].tagName === "img") {
        const image = node?.children[0];
        const metastring = image?.properties?.alt;
        const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
        const metaWidth = metastring?.match(/{([^}]+)x/);
        const metaHeight = metastring?.match(/x([^}]+)}/);
        const width = metaWidth ? metaWidth[1] : "768";
        const height = metaHeight ? metaHeight[1] : "432";
        const isPriority = metastring?.toLowerCase().match("{priority}");
        const hasCaption = metastring?.toLowerCase().includes("{caption:");
        const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

        return (
          <div className="postImgWrapper">
            <Image
              src={image.properties.src}
              width={width}
              height={height}
              className="postImg"
              alt={alt}
              priority={isPriority}
              sizes="(max-width: 768px) 100vw)"
            />
            {hasCaption ? (
              <div className="caption" aria-label={caption}>
                {caption}
              </div>
            ) : null}
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    a: (anchor: { href: string; children: string }) => {
      if (anchor.href.match("http")) {
        return (
          <a href={anchor.href} target="_blank" rel="noopener noreferrer">
            {anchor.children}
          </a>
        );
      }
      return <a href={anchor.href}>{anchor.children}</a>;
    },
    h3: (props: H3Props) => {
      const children = Array.isArray(props.children)
        ? props.children
        : [props.children];
      const heading = children
        .flatMap((element) =>
          typeof element === "string"
            ? element
            : element?.type !== undefined &&
              typeof element.props.children === "string"
            ? element.props.children
            : []
        )
        .join("");

      const slug = "new-slug";

      return (
        <h3 id={slug}>
          <a href={`#${slug}`} {...props}></a>
        </h3>
      );
    },
    pre: (pre: PreNode) => {
      const codeChunk = pre.node.children[0].children[0].value;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [codeCopied, setCodeCopied] = useState(false);
      const handleCopyCode = (codeChunk: string) => {
        setCodeCopied(true);
        navigator.clipboard.writeText(codeChunk);
        setTimeout(() => {
          setCodeCopied(false);
        }, 5000);
      };

      const language = pre.children[0].props.className.replace(
        /language-/g,
        ""
      );

      return (
        <div className={`${codeCopied ? "copyCode active" : "copyCode"}`}>
          <div className="relative w-full h-full top-0 left-0">
            <button
              onClick={() => handleCopyCode(codeChunk)}
              aria-label="Copy code to clipboard"
              className="absolute btn-primary rounded-md cursor-pointer p-2 right-5 top-3 w-max flex items-center gap-2 z-100"
            >
              Copy <ClipboardIcon className="w-4 h-4" />
            </button>
          </div>
          <pre {...pre}></pre>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown
      components={MarkdownComponents}
      rehypePlugins={[[rehypeRaw, { passThrough: ["element"] }]]}
    >
      {markdown?.content ?? ""}
    </ReactMarkdown>
  );
};

export default Markdown;
