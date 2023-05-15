import React from 'react';
import { Lexer } from 'marked';
import {
  Blockquote,
  Code,
  Divider,
  Image,
  List,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { Prism } from '@mantine/prism';
import PrismRenderer from 'prism-react-renderer/prism';
import { Link } from 'App/libs/router';
import { LinkReference } from 'App/pages/search/link-reference';
import { fontWeightBold } from 'App/styles/common';

window.Prism = PrismRenderer;
import('prismjs/components/prism-java');

const refRegex = /^\[([0-9]+)]+/;
const extensions = Object.freeze({
  inline: [
    (src) => {
      const match = refRegex.exec(src);
      if (match) return { type: 'ref', raw: match[0], text: match[1] };
    },
  ],
});

const convertTokens = ({ tokens }, urlResolver) =>
  tokens.map((token, i) => convert(token, `${token.type}-${i}`, urlResolver));

function resolveUrl(url, options) {
  if (options.baseUrl) return new URL(url, options.baseUrl).href;
  return url.includes('://') ? url : undefined;
}

// https://github.com/markedjs/marked/blob/7c1e114f9f7949ba4033366582d2a4ddf09e85af/src/Tokenizer.js
function convert(token, key, options) {
  switch (token.type) {
    case 'code':
      return (
        <Prism key={key} language={token.lang}>
          {token.text}
        </Prism>
      );
    case 'blockquote':
      return <Blockquote key={key}>{convertTokens(token, options)}</Blockquote>;
    case 'heading':
      return (
        <Title key={key} order={token.depth}>
          {convertTokens(token, options)}
        </Title>
      );
    case 'hr':
      return <Divider key={key} />;
    case 'list':
      return (
        <List key={key} type={token.ordered ? 'ordered' : 'unordered'}>
          {token.items.map((item, i) => (
            <List.Item key={i}>{convertTokens(item, options)}</List.Item>
          ))}
        </List>
      );
    case 'table':
      return (
        <Table key={key} fontSize="xs">
          <thead>
            <tr>
              {token.header.map((cell, i) => (
                <th key={i}>{convertTokens(cell, options)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {token.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{convertTokens(cell, options)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      );

    case 'strong':
      return (
        <Text key={key} fw={fontWeightBold} span>
          {convertTokens(token, options)}
        </Text>
      );
    case 'em':
      return (
        <Text key={key} italic span>
          {convertTokens(token, options)}
        </Text>
      );
    case 'codespan':
      return (
        <Code key={key}>{token.raw.substring(1, token.raw.length - 1)}</Code>
      );
    case 'br':
      return '\n';
    case 'del':
      return (
        <Text key={key} strikethrough span>
          {convertTokens(token, options)}
        </Text>
      );
    case 'link': {
      const to = resolveUrl(token.href, options);
      if (!to) return convertTokens(token, options);
      return (
        <Link key={key} to={to}>
          {convertTokens(token, options)}
        </Link>
      );
    }
    case 'image':
      return (
        <Image
          key={key}
          src={resolveUrl(token.href, options)}
          alt={token.title}
        />
      );
    case 'paragraph':
      return <Text key={key}>{convertTokens(token, options)}</Text>;
    case 'text':
      return token.tokens ? convertTokens(token, options) : token.raw;
    case 'ref':
      return ['[', <LinkReference key={key} token={token} />, ']'];
    default:
    case 'html':
    case 'space':
      return token.raw;
  }
}

export function parseMarkdown(src, options = {}) {
  try {
    const opt = { extensions, gfm: true };
    const tokens = Lexer.lex(src, opt);
    return convertTokens({ tokens }, options);
  } catch (e) {
    console.error(e);
    return src;
  }
}
