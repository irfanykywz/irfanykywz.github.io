@echo off
git add .
git commit -m "update"
git push origin main --force
timeout 5