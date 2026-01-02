document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const platformContents = document.querySelectorAll(".platform-content");
    
    // LeetCode elements
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLevel = document.getElementById("easy-label");
    const mediumLevel = document.getElementById("medium-label");
    const hardLevel = document.getElementById("hard-label");
    const leetcodeStatsCard = document.getElementById("leetcode-stats");

    // GitHub elements
    const githubAvatar = document.getElementById("github-avatar");
    const githubPlaceholder = document.getElementById("github-placeholder");
    const githubName = document.getElementById("github-name");
    const githubBio = document.getElementById("github-bio");
    const githubRepos = document.getElementById("github-repos");
    const githubFollowers = document.getElementById("github-followers");
    const githubFollowing = document.getElementById("github-following");
    const githubStars = document.getElementById("github-stars");
    const githubLanguages = document.getElementById("github-languages");

    // HackerRank elements
    const hackerrankRank = document.getElementById("hackerrank-rank");
    const hackerrankBadges = document.getElementById("hackerrank-badges");
    const hackerrankSkills = document.getElementById("hackerrank-skills");

    let currentPlatform = "leetcode";

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener("click", function() {
            const platform = this.dataset.platform;
            switchPlatform(platform);
        });
    });

    function switchPlatform(platform) {
        currentPlatform = platform;
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove("active"));
        document.querySelector(`[data-platform="${platform}"]`).classList.add("active");
        
        // Update active content
        platformContents.forEach(content => content.classList.remove("active"));
        document.getElementById(`${platform}-content`).classList.add("active");
        
        // Update placeholder text
        const placeholders = {
            leetcode: "Enter your LeetCode username",
            github: "Enter your GitHub username", 
            hackerrank: "Enter your HackerRank username"
        };
        usernameInput.placeholder = placeholders[platform];
        usernameInput.value = "";
    }

    // Validation function
    function validateUsername(userName) {
        if (userName.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        
        if (currentPlatform === "leetcode") {
            const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
            if (!usernameRegex.test(userName)) {
                alert("Invalid LeetCode username format");
                return false;
            }
        }
        
        return true;
    }

    // LeetCode API functions
    async function fetchLeetCodeData(userName) {
        const url = `https://leetcode-stats-api.herokuapp.com/${userName}`;
        
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch LeetCode data");
            }
            
            const data = await response.json();
            displayLeetCodeData(data);
        } catch (error) {
            leetcodeStatsCard.innerHTML = `<div class="error-message"><p>${error.message}</p></div>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function displayLeetCodeData(data) {
        const totalEasyQuestion = data.totalEasy;
        const totalMediumQuestion = data.totalMedium;
        const totalHardQuestion = data.totalHard;

        const totalEasySolvedQuestion = data.easySolved;
        const totalMediumSolvedQuestion = data.mediumSolved;
        const totalHardSolvedQuestion = data.hardSolved;

        updateProgress(totalEasySolvedQuestion, totalEasyQuestion, easyLevel, easyProgressCircle);
        updateProgress(totalMediumSolvedQuestion, totalMediumQuestion, mediumLevel, mediumProgressCircle);
        updateProgress(totalHardSolvedQuestion, totalHardQuestion, hardLevel, hardProgressCircle);

        const cardData = [
            { label: "Acceptance Rate", value: data.acceptanceRate || "N/A" },
            { label: "Global Ranking", value: data.ranking || "Unranked" },
            { label: "Contribution Points", value: data.contributionPoints || "0" },
            { label: "Reputation", value: data.reputation || "0" }
        ];

        leetcodeStatsCard.innerHTML = cardData.map(item => 
            `<div class="card">
                <h4>${item.label}</h4>
                <p>${item.value}</p>
            </div>`
        ).join("");
    }

    // GitHub API functions
    async function fetchGitHubData(userName) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            // Fetch user profile
            const userResponse = await fetch(`https://api.github.com/users/${userName}`);
            if (!userResponse.ok) {
                throw new Error("GitHub user not found");
            }
            
            const userData = await userResponse.json();
            
            // Fetch repositories for additional stats
            const reposResponse = await fetch(`https://api.github.com/users/${userName}/repos?per_page=100`);
            const reposData = await reposResponse.json();
            
            displayGitHubData(userData, reposData);
        } catch (error) {
            displayGitHubError(error.message);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function displayGitHubData(userData, reposData) {
        // Profile info
        githubName.textContent = userData.name || userData.login;
        githubBio.textContent = userData.bio || "No bio available";
        
        if (userData.avatar_url) {
            githubAvatar.src = userData.avatar_url;
            githubAvatar.style.display = "block";
            githubPlaceholder.style.display = "none";
        }

        // Stats
        githubRepos.textContent = userData.public_repos;
        githubFollowers.textContent = userData.followers;
        githubFollowing.textContent = userData.following;
        
        // Calculate total stars
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        githubStars.textContent = totalStars;

        // Languages
        const languages = {};
        reposData.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const sortedLanguages = Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        if (sortedLanguages.length > 0) {
            githubLanguages.innerHTML = sortedLanguages.map(([lang, count]) => 
                `<span class="language-tag">${lang} (${count})</span>`
            ).join("");
        } else {
            githubLanguages.innerHTML = "<p>No language data available</p>";
        }
    }

    function displayGitHubError(message) {
        githubName.textContent = "Error";
        githubBio.textContent = message;
        githubAvatar.style.display = "none";
        githubPlaceholder.style.display = "block";
        githubRepos.textContent = "0";
        githubFollowers.textContent = "0";
        githubFollowing.textContent = "0";
        githubStars.textContent = "0";
        githubLanguages.innerHTML = "<p>No data available</p>";
    }

    // HackerRank functions (Note: HackerRank doesn't have a public API, so this is simulated)
    async function fetchHackerRankData(userName) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Since HackerRank doesn't have a public API, we'll show a message
            displayHackerRankMessage();
        } catch (error) {
            displayHackerRankError(error.message);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function displayHackerRankMessage() {
        hackerrankRank.textContent = "API Limited";
        
        hackerrankBadges.innerHTML = `
            <div class="badge-placeholder">
                <i class="fas fa-info-circle"></i>
                <p>HackerRank doesn't provide a public API. Please check your profile manually at hackerrank.com</p>
            </div>
        `;

        // Update skill bars with sample data
        const skillBars = document.querySelectorAll(".skill-bar");
        const sampleSkills = [75, 60, 85]; // Sample percentages
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = `${sampleSkills[index] || 0}%`;
            }, 500 + (index * 200));
        });
    }

    function displayHackerRankError(message) {
        hackerrankRank.textContent = "Error";
        hackerrankBadges.innerHTML = `
            <div class="badge-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }

    // Progress update function
    function updateProgress(solved, total, label, circle) {
        const progressDegree = total > 0 ? (solved / total) * 100 : 0;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    // Main search function
    async function handleSearch() {
        const userName = usernameInput.value.trim();
        
        if (!validateUsername(userName)) {
            return;
        }

        switch (currentPlatform) {
            case "leetcode":
                await fetchLeetCodeData(userName);
                break;
            case "github":
                await fetchGitHubData(userName);
                break;
            case "hackerrank":
                await fetchHackerRankData(userName);
                break;
        }
    }

    // Event listeners
    searchButton.addEventListener("click", handleSearch);
    
    usernameInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
});
