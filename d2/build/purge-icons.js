const { PurgeIcons } = require('@purge-icons/core');
const { writeFile } = require('fs/promises');

(async () => {
  const code = await PurgeIcons({
    content: [
      // '**/*.html',
      // '**/*.js',
      // '**/*.vue'
      // 'd2/temp/test.md'
      // 'd2/temp/test.html'
      'd2/temp/test.js'
    ],
    format: 'json'
  })
  writeFile('./purge-icons.json', JSON.stringify(JSON.parse(code), null, 2), 'utf-8')
  console.log('see purge-icons.json')
})()
