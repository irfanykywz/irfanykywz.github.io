document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('pre.chroma:has(code[data-lang])').forEach(function(codeBlock) {
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-btn';
        copyButton.textContent = 'Copy';
        copyButton.addEventListener('click', function() {
            const code = codeBlock.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(function() {
                copyButton.textContent = 'Copied!';
                setTimeout(function() {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyButton);
    });
});