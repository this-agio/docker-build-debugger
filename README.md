
# Docker Build Debugger
Are you looking for a simple editor that could help you to create your docker images?

Well, you've found it!

### Build it from sources
```shell script
npm i
npm run-script run
```

If running it you see in the console of the window errors like
```
was compiled against a different Node.js version using
NODE_MODULE_VERSION 48. This version of Node.js requires
NODE_MODULE_VERSION 73. Please try re-compiling or re-installing
the module
```
try to rebuilt it using `npx electron-rebuild` and, if even that doesn't work, try 
`./node_modules/electron-builder/out/cli/cli.js`.