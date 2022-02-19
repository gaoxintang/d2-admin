// Markdown parser done right. Fast and easy to extend
// [website] https://markdown-it.github.io/markdown-it/
import MarkdownIt from 'markdown-it'
// Syntax highlighting for the Web
// [website] https://highlightjs.org/
import hljs from 'highlight.js'
// A simple JavaScript utility for conditionally joining classNames together.
import joinClassNames from 'classnames'

const md = new MarkdownIt()
const pre = html => `<pre class="p-0">${html}</pre>`
const code = (html, lang) => {
  const classNames = joinClassNames('hljs', {
    [`language-${lang} `]: lang
  })
  return `<code class="${classNames}">${html}</code>`
}

export function markdownItHighlightOption (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      const html = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true
      }).value
      return pre(code(html, lang))
    } catch (__) {}
  }
  return pre(code(md.utils.escapeHtml(str)))
}
