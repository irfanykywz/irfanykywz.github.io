@echo off
:: Hugo Content Generator
:: Creates new Hugo content with dynamic paths and auto-numbering

:menu

:: Content type selection menu
echo ---------------------------------
echo   HUGO CONTENT GENERATOR
echo ---------------------------------
echo 1. Posts (blog posts)
echo 2. Journal (daily notes)
echo 3. Portfolio (project showcases)
echo 4. Learn (tutorials/how-tos)
echo ---------------------------------

set /p "choice=Select content type (1-4): "

:: Set content path based on selection
if "%choice%"=="1" (
    set "CONTENT_TYPE=posts"
    set "TYPE_NAME=Post"
) else if "%choice%"=="2" (
    set "CONTENT_TYPE=journal"
    set "TYPE_NAME=Journal Entry"
) else if "%choice%"=="3" (
    set "CONTENT_TYPE=portofolio"
    set "TYPE_NAME=Portfolio Item"
) else if "%choice%"=="4" (
    set "CONTENT_TYPE=learn"
    set "TYPE_NAME=Tutorial"
) else (
    echo Invalid selection
    pause
    exit /b 1
)

:: Prompt user for content title
set /p "title=Enter %TYPE_NAME% title: "

:: Validate input
if "%title%"=="" (
    echo Error: Title cannot be empty.
    pause
    exit /b 1
)

:: Generate the Hugo path
set "HUGO_PATH=%CONTENT_TYPE%\%title%\index.md"

:: Execute Hugo command
echo Creating new %TYPE_NAME%: %HUGO_PATH%
hugo new content "%HUGO_PATH%"


echo.
echo ---------------------------------
echo Successfully created:
echo Type: %TYPE_NAME%
echo Path: %HUGO_PATH%
echo File: !file_path!
echo ---------------------------------
pause

goto menu