const API_URL = 'https://cleaning-kzt6.onrender.com';

interface Team {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
}

interface Submission {
  team_id: number;
  task_id: number;
  status: string;
}

// Fetch all teams from the backend
async function loadTeams(): Promise<Team[]> {
  try {
    const response = await fetch(`${API_URL}/api/teams`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const teams: Team[] = await response.json();
    return teams;
  } catch (error) {
    console.error('Failed to load teams:', error);
    return [];
  }
}

// Submit a cleaning task record
async function submitCleaningTask(submission: Submission): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to submit cleaning task:', error);
  }
}

// Initialize application execution when DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Connected to live backend at:', API_URL);
  
  const teams = await loadTeams();
  console.log('Fetched teams list:', teams);
  
  // Hook up your UI elements or form submit listeners here
});