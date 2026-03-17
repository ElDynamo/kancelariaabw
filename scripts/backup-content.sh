#!/bin/bash
# Backup CMS content every 3 days
# Install on VPS: crontab -e → add line:
# 0 3 */3 * * /var/www/strona-prawnicza/scripts/backup-content.sh

PROJECT_DIR="/var/www/strona-prawnicza"
BACKUP_DIR="/var/backups/kancelaria-content"
MAX_BACKUPS=10

# Create backup dir if needed
mkdir -p "$BACKUP_DIR"

# Create timestamped backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="content-$TIMESTAMP.tar.gz"

cd "$PROJECT_DIR"
tar -czf "$BACKUP_DIR/$BACKUP_NAME" src/content/

echo "$(date): Backup created: $BACKUP_DIR/$BACKUP_NAME" >> "$BACKUP_DIR/backup.log"

# Keep only last MAX_BACKUPS (delete oldest)
cd "$BACKUP_DIR"
ls -t content-*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs rm -f 2>/dev/null

echo "$(date): Cleanup done. Keeping last $MAX_BACKUPS backups." >> "$BACKUP_DIR/backup.log"
