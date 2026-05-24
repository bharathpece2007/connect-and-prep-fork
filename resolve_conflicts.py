import os
import re

files = [
    "src/components/auth/LoginPage.jsx",
    "src/components/features/Attendance.jsx",
    "src/components/features/DashboardHome.jsx",
    "src/components/features/FeatureStyles.css",
    "src/components/features/HomeworkHub.jsx",
    "src/components/features/Timetable.jsx"
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()
    
    # regex to match conflict markers and keep the bottom half (theirs)
    new_content = re.sub(r'<<<<<<< HEAD\n.*?\n=======\n(.*?)\n>>>>>>> [a-fA-F0-9]{40}\n', r'\1\n', content, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as file:
        file.write(new_content)
    print(f"Processed: {filepath}")

print("Done.")
