interface CodeBlockProps {
  code: unknown;
}

export default function CodeBlock({ code }: Readonly<CodeBlockProps>) {
  return (
    <pre>
      <code>{typeof code === "string" ? code : JSON.stringify(code, undefined, 2)}</code>
    </pre>
  );
}
