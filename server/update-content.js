// Using built-in fetch (Node.js 18+)
const API_BASE = 'http://localhost:5051/api/company-content';

// Helper function to update content
async function updateContent(sectionName, data) {
  try {
    console.log(`Updating ${sectionName} section...`);
    
    const response = await fetch(`${API_BASE}/${sectionName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Successfully updated ${sectionName}`);
      console.log('Response:', JSON.stringify(result, null, 2));
    } else {
      console.log(`❌ Failed to update ${sectionName}`);
      console.log('Error:', result);
    }
  } catch (error) {
    console.error(`Error updating ${sectionName}:`, error.message);
  }
}

// Helper function to get current content
async function getContent(sectionName = null) {
  try {
    const url = sectionName ? `${API_BASE}/${sectionName}` : API_BASE;
    const response = await fetch(url);
    const result = await response.json();
    
    if (response.ok) {
      console.log('Current content:');
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('Error fetching content:', result);
    }
  } catch (error) {
    console.error('Error fetching content:', error.message);
  }
}

// Command line interface
const command = process.argv[2];
const sectionName = process.argv[3];

if (command === 'get') {
  getContent(sectionName);
} else if (command === 'update' && sectionName) {
  // Read update data from command line arguments or stdin
  const updateData = {
    title: process.argv[4] || null,
    subtitle: process.argv[5] || null,
    content: process.argv[6] || null
  };
  
  // Remove null values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === null) delete updateData[key];
  });
  
  updateContent(sectionName, updateData);
} else {
  console.log(`
Usage:
  node update-content.js get [sectionName]     - Get current content
  node update-content.js update sectionName title subtitle content - Update content

Examples:
  node update-content.js get                    - Get all content
  node update-content.js get hero               - Get hero section
  node update-content.js update hero "New Title" "New Subtitle" "New Content"
  `);
}
