#!/bin/bash

# Start the main app
npm start &
  
# Start the process monitoring rabbit for message to index with opensearch
node ./monitorSearchQueue.js &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?