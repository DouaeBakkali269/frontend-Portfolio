document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const sections = document.querySelectorAll('.content .section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items and sections
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.textContent.trim().toLowerCase().replace(' ', '-');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // IDE menu tabs functionality
    const ideMenuItems = document.querySelectorAll('.ide-menu .menu-item');
    
    ideMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            ideMenuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Terminal typing animation
    const terminalCommands = [
        "cat education.txt",
        "cat experience.txt",
        "cat skills.txt",
        "connect --linkedin DouaeBakkali",
        "send --email bakkalidouae75@gmail.com"
    ];
    
    let currentCommand = 0;
    const terminalInput = document.querySelector('.terminal-body .command-line .cursor');
    
    function typeCommand() {
        let i = 0;
        const command = terminalCommands[currentCommand];
        terminalInput.parentNode.insertBefore(document.createTextNode(command), terminalInput);
        terminalInput.remove();
        
        const typingInterval = setInterval(() => {
            if (i < command.length) {
                const char = document.createTextNode(command[i]);
                terminalInput.parentNode.insertBefore(char, terminalInput.parentNode.lastChild);
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    // Simulate command output
                    const output = document.createElement('div');
                    output.className = 'command-output';
                    
                    if (currentCommand === 0) {
                        output.innerHTML = `
                            <p>ENSIAS (2023-2025) - Software Engineering</p>
                            <p>CPGE Moulay El Hassan (2021-2023) - MP</p>
                            <p>Lycée Technique Moulay Youssef - Baccalaureate</p>
                        `;
                    } else if (currentCommand === 1) {
                        output.innerHTML = `
                            <p>Wilaya of Tanger-Tetouan-Al Hoceima (Jul 2024)</p>
                            <p>- Web Development Intern</p>
                            <p>- SpringBoot + ReactJS</p>
                        `;
                    } else if (currentCommand === 2) {
                        output.innerHTML = `
                            <p>Java, Spring Boot, React, Docker, Git</p>
                            <p>MySQL, Oracle, CI/CD, Maven</p>
                        `;
                    } else if (currentCommand === 3) {
                        output.innerHTML = `<p>Opening LinkedIn profile...</p>`;
                    } else if (currentCommand === 4) {
                        output.innerHTML = `<p>Preparing email composer...</p>`;
                    }
                    
                    terminalInput.parentNode.parentNode.insertBefore(output, terminalInput.parentNode.nextSibling);
                    
                    // Create new command line
                    const newCommandLine = document.createElement('p');
                    newCommandLine.className = 'command-line';
                    newCommandLine.innerHTML = `<span class="prompt">douae@portfolio:~$</span> <span class="cursor">_</span>`;
                    
                    terminalInput.parentNode.parentNode.appendChild(newCommandLine);
                    
                    currentCommand = (currentCommand + 1) % terminalCommands.length;
                    terminalInput = newCommandLine.querySelector('.cursor');
                    
                    setTimeout(typeCommand, 2000);
                }, 1000);
            }
        }, 100);
    }
    
    // Start typing animation
    setTimeout(typeCommand, 1500);
    
    // GitHub link hover effect for project cards
    const githubLinks = document.querySelectorAll('.github-link');
    
    githubLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.innerHTML = `<i class="fab fa-github"></i> View on GitHub <i class="fas fa-external-link-alt" style="font-size: 10px;"></i>`;
        });
        
        link.addEventListener('mouseleave', function() {
            this.innerHTML = `<i class="fab fa-github"></i> View on GitHub`;
        });
    });
    
    // Tech tag hover effect
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});