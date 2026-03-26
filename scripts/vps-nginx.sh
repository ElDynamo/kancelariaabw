#!/bin/bash
sudo cp nginx-kancelariaabw.conf /etc/nginx/sites-available/strona-prawnicza
sudo ln -sf /etc/nginx/sites-available/strona-prawnicza /etc/nginx/sites-enabled/
sudo ufw allow 8080
sudo nginx -t && sudo systemctl reload nginx
