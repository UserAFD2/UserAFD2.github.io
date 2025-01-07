const repoOwner = "UserAFD2";
const repoName = "UserAFD2.github.io";

async function fetchRepoData() {
    try {
        // Fetch repository details
        const repoResponse = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}`
        );
        const repo = await repoResponse.json();

        // Display repository information
        const container = document.getElementById("repo-files");
        container.innerHTML = `
            <h2>${repo.name}</h2>
            <!-- <p>${repo.description}</p> -->
            <!-- <a href="${repo.html_url}" target="_blank">View on GitHub</a> -->
        `;

        // Fetch repository contents (files)
        const filesResponse = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents`
        );
        const files = await filesResponse.json();

        // Display repository files
        const filesContainer = document.getElementById("repo-files");
        // filesContainer.innerHTML += "<h3>Files:</h3>"; // Uncomment if you want to display a heading for files
        files.forEach((file) => {
            // Check if file is a directory or a file
            const icon = file.type === "dir"
                ? '<i class="fas fa-folder"></i>'  // Folder icon
                : '<i class="fas fa-file-alt"></i>'; // File icon

            filesContainer.innerHTML += `
            <p>
                ${icon} 
                <a href="${file.html_url}" target="_blank">${file.name}</a> 
                (${file.type})
            </p>
        `;
        });

    } catch (error) {
        console.error('Error fetching repository data:', error);
    }
}

// Call the merged function
fetchRepoData();

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = document.querySelector(
                    `.nav-link[data-section="${entry.target.id}"]`
                );

                if (entry.isIntersecting) {
                    navLinks.forEach((nav) => nav.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        },
        {
            root: null,
            threshold: 0.6, // Section is "active" when 60% visible
        }
    );

    sections.forEach((section) => observer.observe(section));
});


particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#ffffff" },
        "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" },
        },
        "opacity": {
            "value": 0.5,
            "random": true,
        },
        "size": {
            "value": 5,
            "random": true,
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "random": true,
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});
