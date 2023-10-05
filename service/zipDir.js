
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

module.exports = (directory, zipfile, log = false, deleteFolder = true) => {  // directory и zipfile - путь, начиная с папки static

    return new Promise((resolve, reject) => {
        
        try {
            const zipArgs = [
                'a',
                path.resolve(__dirname, '..', 'static', zipfile),
                path.resolve(__dirname, '..', 'static', directory, '*')
            ]
            if (log) console.info('zip args', zipArgs)
            const zipProcess = spawn('7z', zipArgs)
            zipProcess.stdout.on('data', message => {
                // received a message sent from the 7z process
                if (log) console.info(message.toString())
            })

            // end the input stream and allow the process to exit
            zipProcess.on('error', (err) => {
                console.error('err contains: ' + err)
                throw err
            })

            zipProcess.on('close', (code) => {
                if (log) console.info('The 7z exit code was: ' + code)
                if (code != 0) throw '7zip exited with an error' // throw and let the handler below log it
                else {
                    console.info('7zip complete')
                    if (deleteFolder) fs.rmSync(path.resolve(__dirname, '..', 'static', directory), { recursive: true, force: true })
                    return resolve(process.env.URL + "/" + zipfile)
                }
            })
        }catch(err) {
            return reject(err)
        }
    })

}
