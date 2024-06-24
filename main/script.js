document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'YOUR_SPACEX_API';
    const launchesEndpoint = '/launches';

    const launchesElement = document.getElementById('launches');

    // Function to fetch all previous SpaceX launches
    async function fetchPreviousLaunches() {
        try {
            const response = await fetch(apiUrl + launchesEndpoint);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    // Function to display launches on the webpage
    function displayLaunches(launches) {
        launches.forEach(launch => {
            const launchDate = new Date(launch.date_utc).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC'
            });

            const launchItem = `
                <div class="launch-item">
                    <h2>${launch.name}</h2>
                    <p><strong>Date:</strong> ${launchDate}</p>
                    <p><strong>Rocket:</strong> ${launch.rocket}</p>
                    <p><strong>Launchpad:</strong> ${launch.launchpad}</p>
                    <p><strong>Details:</strong> ${launch.details || 'No details available'}</p>
                </div>
            `;

            launchesElement.innerHTML += launchItem;
        });
    }

    // Main function to fetch and display previous launches
    async function fetchAndDisplayPreviousLaunches() {
        const previousLaunches = await fetchPreviousLaunches();
        displayLaunches(previousLaunches);
    }

    // Fetch and display launches when the page loads
    fetchAndDisplayPreviousLaunches();
});
