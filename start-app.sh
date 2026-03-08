#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export PATH="$HOME/.bun/bin:$PATH"
cd /var/www/strona-prawnicza || exit 1
bun install --production
pm2 start ecosystem.config.cjs
pm2 save
./vps-nginx.sh
