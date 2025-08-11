import { Storage } from 'megajs'

const storage = await new Storage({
  email: 'dinethchatumina@gmaiul.com',
  password: 'chatumiuna2011'
}).ready

const file = await storage.upload('hello-world.txt', 'Hello world!').complete
console.log('The file was uploaded!', file)
onst { File } = require('megajs')

// Node doesn't support top-level await when using CJS
;(async function () {
  const file = File.fromURL('https://mega.nz/file/example#example')

  await file.loadAttributes()
  console.log(file.name) // file name
  console.log(file.size) // file size in bytes

  const data = await file.downloadBuffer()
  console.log(data.toString()) // file contents
}()).catch(error => {
  console.error(error)
  process.exit(1)
})
