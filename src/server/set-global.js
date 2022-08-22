import nodeFetch from 'node-fetch'

global.fetch = nodeFetch
global.Headers = nodeFetch.Headers
global.Request = nodeFetch.Request
