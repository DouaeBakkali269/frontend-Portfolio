document.addEventListener('DOMContentLoaded', function() {
    // --- Navigation Functionality ---
    const navMap = {
        'about': 'About',
        'experience': 'Experience',
        'projects': 'Projects',
        'skills': 'Skills',
        'education': 'Education',
    };

    // Function to show a specific section
    function showSection(sectionId) {
        if (!document.getElementById(sectionId)) {
            console.warn(`Section with ID "${sectionId}" not found.`);
            return; // Exit if section doesn't exist
        }

        // Hide all sections
        document.querySelectorAll('.content .section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(sectionId).classList.add('active');

        // Update active menu item in sidebar
        document.querySelectorAll('.sidebar-menu li').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            }
        });

        // Optional: Update active IDE tab based on section (if desired)
        // This requires mapping sections to tab names more carefully
        updateIdeTab(sectionId);
    }

    // Set click handlers for sidebar menu
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            if (sectionId) { // Ensure data-section attribute exists
                 showSection(sectionId);
            } else {
                console.warn("Clicked sidebar item missing data-section attribute:", this);
            }
        });
    });

    // --- IDE Menu Tabs Functionality ---
    const ideMenuItems = document.querySelectorAll('.ide-header .menu-item');
    const sectionToTabMap = { // Map sections to corresponding tab text
        'about': 'DouaeBakkali.java',
        'experience': 'Experience.js',
        'projects': 'Projects.config',
        'skills': 'Skills.yml',
        // Add mappings for education, languages, activities if they should have tabs
        'education': 'DouaeBakkali.java', // Example: Revert to main tab
        'languages': 'DouaeBakkali.java', // Example: Revert to main tab
        'activities': 'DouaeBakkali.java' // Example: Revert to main tab
    };


    ideMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Find the section corresponding to the clicked tab (simple example)
            let targetSection = 'about'; // Default
            const tabText = this.textContent.trim();
            for(const section in sectionToTabMap){
                if(sectionToTabMap[section] === tabText){
                    targetSection = section;
                    break;
                }
            }
            showSection(targetSection); // Show section linked to the tab
            // Active state is handled by updateIdeTab called within showSection
        });
    });

    // Function to update the active IDE tab based on the shown section
    function updateIdeTab(sectionId) {
        const activeTabText = sectionToTabMap[sectionId] || 'DouaeBakkali.java'; // Default if no map
        ideMenuItems.forEach(tab => {
            if (tab.textContent.trim() === activeTabText) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    
        // --- Initialize Page (Keep as is) ---
        showSection('about');
    
    // --- Terminal Typing Animation (Modified for Clearing) ---
    const terminalCommands = [
        "cat education.txt",
        "cat experience.txt",
        "cat skills.txt",
        "connect --linkedin DouaeBakkali",
        "send --email bakkalidouae75@gmail.com"
    ];
    let currentCommand = 0;
    const terminalBody = document.querySelector('.about-terminal-card .terminal-body'); // Get terminal body reference
    let terminalInput = terminalBody ? terminalBody.querySelector('.command-line .cursor') : null; // Initial cursor

    function typeCommand() {
        // Ensure terminal body and cursor exist
        if (!terminalBody || !terminalInput) {
            console.error("Terminal body or cursor not found. Animation stopped.");
            // Attempt to re-find cursor if terminal body exists but cursor doesn't (e.g., after clear)
            if(terminalBody && !terminalInput) {
                terminalInput = terminalBody.querySelector('.command-line .cursor');
                if(!terminalInput) return; // Still not found, exit.
            } else {
                return; // Exit if body is missing
            }
        }

        let i = 0;
        const command = terminalCommands[currentCommand];
        const parentNode = terminalInput.parentNode; // The parent <p> tag

        // Disable pointer events on terminal body during typing to prevent selection issues
        terminalBody.style.pointerEvents = 'none';

        const typingInterval = setInterval(() => {
            if (i < command.length) {
                const char = document.createTextNode(command[i]);
                parentNode.insertBefore(char, terminalInput); // Insert char before cursor
                i++;
            } else {
                clearInterval(typingInterval); // Stop typing
                terminalBody.style.pointerEvents = 'auto'; // Re-enable pointer events

                setTimeout(() => {
                    // --- Simulate command output ---
                    const output = document.createElement('div');
                    output.className = 'command-output'; // Use the original output class

                    // Existing output logic
                    if (currentCommand === 0) { /* Education output */
                        output.innerHTML = `<p>ENSIAS (SE), CPGE (MP), Bac (Maths B)</p>`;
                    } else if (currentCommand === 1) { /* Experience output */
                        output.innerHTML = `<p>Intern @ Wilaya TTA (Web Dev)</p><p>SpringBoot + ReactJS</p>`;
                    } else if (currentCommand === 2) { /* Skills output */
                        output.innerHTML = `<p>Java | Spring | React | Docker | Git | SQL</p>`;
                    } else if (currentCommand === 3) { /* LinkedIn output */
                        output.innerHTML = `<p>Opening LinkedIn profile...</p>`;
                    } else if (currentCommand === 4) { /* Email output */
                        output.innerHTML = `<p>Preparing email composer...</p>`;
                    }

                    const commandLineP = parentNode; // The current <p> tag

                    // Insert output *after* the current command line <p>
                    terminalBody.insertBefore(output, commandLineP.nextSibling);

                    // Remove cursor from the *completed* line
                    terminalInput.remove();
                    terminalInput = null; // Make sure it's nullified

                    // --- Prepare for next command OR clear and restart ---
                    const nextCommandIndex = (currentCommand + 1) % terminalCommands.length;

                    if (nextCommandIndex === 0) { // If the *next* command is the first one, clear now
                        // Add a slight delay before clearing for visual pause
                        setTimeout(() => {
                            terminalBody.innerHTML = ''; // Clear the terminal body

                            // Re-add the initial command line
                            const initialCommandLine = document.createElement('p');
                            initialCommandLine.className = 'command-line';
                            initialCommandLine.innerHTML = `<span class="prompt">douae@portfolio:~$</span> <span class="cursor">_</span>`;
                            terminalBody.appendChild(initialCommandLine);

                            // Update terminalInput to the new cursor
                            terminalInput = initialCommandLine.querySelector('.cursor');
                            currentCommand = 0; // Explicitly reset command index

                            // Schedule the first command again
                            setTimeout(typeCommand, 500); // Shorter delay after clear

                        }, 2000); // Wait 2 seconds after last output before clearing

                    } else { // Otherwise, just add the next command line
                        const newCommandLine = document.createElement('p');
                        newCommandLine.className = 'command-line';
                        newCommandLine.innerHTML = `<span class="prompt">douae@portfolio:~$</span> <span class="cursor">_</span>`;
                        terminalBody.appendChild(newCommandLine); // Append the new line

                        currentCommand = nextCommandIndex; // Update command index
                        terminalInput = newCommandLine.querySelector('.cursor'); // Update terminalInput

                        // Ensure terminal scrolls down
                        terminalBody.scrollTop = terminalBody.scrollHeight;

                        // Schedule the next command
                        setTimeout(typeCommand, 1500); // Normal delay between commands
                    }

                }, 800); // Shorter delay after typing finishes before showing output
            }
        }, 110); // Slightly faster typing speed
    }

    // Start typing animation *only if* the initial elements exist
    if (terminalBody && terminalInput) {
         console.log("Starting terminal animation...");
         setTimeout(typeCommand, 1500); // Initial delay before starting
    } else {
       console.warn("Initial terminal elements (.terminal-body or .cursor) not found. Animation not starting.");
       // Attempt to find again just in case of timing issues (rare)
       setTimeout(() => {
            if(!terminalBody) terminalBody = document.querySelector('.about-terminal-card .terminal-body');
            if(terminalBody && !terminalInput) terminalInput = terminalBody.querySelector('.command-line .cursor');
            if(terminalBody && terminalInput && !window.animationStarted) { // Prevent multiple starts
                console.log("Starting terminal animation (delayed attempt)...");
                window.animationStarted = true; // Flag to prevent multiple starts
                setTimeout(typeCommand, 500);
            }
       }, 1000);
    }

    // --- GitHub Link Hover Effect (Keep as is) ---
    const githubLinks = document.querySelectorAll('.github-link');
    githubLinks.forEach(link => { /* ... */ });

    // --- Tech Tag Hover Effect (Keep as is) ---
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => { /* ... */ });

}); // End DOMContentLoaded