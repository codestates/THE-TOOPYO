#!/bin/bash
cd /home/ubuntu/THE-TOOPYO/server
authbind --deep pm2 update
authbind --deep pm2 start index.js
