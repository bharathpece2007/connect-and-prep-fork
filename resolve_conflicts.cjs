const fs = require('fs');
const path = require('path');

const files = [
    "src/components/auth/LoginPage.jsx",
    "src/components/features/Attendance.jsx",
    "src/components/features/DashboardHome.jsx",
    "src/components/features/FeatureStyles.css",
    "src/components/features/HomeworkHub.jsx",
    "src/components/features/Timetable.jsx"
];

for (const filepath of files) {
    if (!fs.existsSync(filepath)) {
        console.log(`File not found: ${filepath}`);
        continue;
    }
    
    let content = fs.readFileSync(filepath, "utf-8");
    
    // regex to match conflict markers and keep the bottom half (theirs)
    const regex = /<<<<<<< HEAD\r?\n[\s\S]*?\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> [a-fA-F0-9]{40}\r?\n/g;
    const newContent = content.replace(regex, "$1\n");
    
    fs.writeFileSync(filepath, newContent, "utf-8");
    console.log(`Processed: ${filepath}`);
}

console.log("Done.");
