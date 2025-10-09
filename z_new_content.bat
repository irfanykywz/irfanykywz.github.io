@echo off
:: Hugo Content Generator
:: Creates new Hugo content with dynamic paths and auto-numbering

:menu

:: Content type selection menu
echo ---------------------------------
echo   HUGO CONTENT GENERATOR
echo ---------------------------------
echo 1. Posts (posts/title)
echo 2. Journal (YEAR/Month/Date - Title)
echo 3. Portfolio (portofolio/title)
echo 4. Learn (learn/topic/tutorial)
echo 5. collection (collection/title.md)
echo 4. research (research-title/research-content)
echo ---------------------------------

set /p "choice=Select content type (1-4): "

:: Set content path based on selection
if "%choice%"=="1" (
    set "CONTENT_TYPE=posts"    
) else if "%choice%"=="2" (
    set "CONTENT_TYPE=journal"    
) else if "%choice%"=="3" (
    set "CONTENT_TYPE=portofolio"    
) else if "%choice%"=="4" (
    set "CONTENT_TYPE=learn"    
)  else if "%choice%"=="5" (
    set "CONTENT_TYPE=collection"    
)  else if "%choice%"=="6" (
    set "CONTENT_TYPE=research"    
) else (
    echo Invalid selection
    pause
    goto menu
)

:: Prompt user for content title
set /p "title=Enter %CONTENT_TYPE% title: "

:: Validate input
if "%title%"=="" (
    echo Error: Title cannot be empty.
    pause
    goto menu
)

:: Generate the Hugo path
set "HUGO_PATH=%CONTENT_TYPE%\%title%\index.md"

:: Execute Hugo command
echo Creating new %CONTENT_TYPE%: %HUGO_PATH%
hugo new content "%HUGO_PATH%"


echo.
echo ---------------------------------
echo Successfully created:
echo Type: %CONTENT_TYPE%
echo Path: %HUGO_PATH%
echo File: !file_path!
echo ---------------------------------
pause

goto menu