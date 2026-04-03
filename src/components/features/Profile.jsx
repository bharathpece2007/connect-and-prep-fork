import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Calendar, Mail, Phone, Upload, CreditCard } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    // Mock state for form fields - pre-filled with user data where available
    const [formData, setFormData] = useState({
        // Basic Details
        usn: user?.usn || '4VV25EC032',
        firstName: user?.name?.split(' ')[0] || 'BHARATH',
        middleName: 'KUMAR',
        lastName: 'A',
        collegeEmail: 'VVCE25EC0135@vvce.ac.in',
        personalEmail: user?.email || 'bharathece2006@gmail.com',
        dob: '2006-04-20',
        contact: '7996710095',
        aadhaar: '3650 0263 1414',

        // Parent Details
        parent1Name: 'Father Name',
        parent1Email: 'father@example.com',
        parent1Gender: 'Male',
        parent1Contact: '9876543210',

        parent2Name: 'Mother Name',
        parent2Email: 'mother@example.com',
        parent2Gender: 'Female',
        parent2Contact: '9876543211',

        guardianName: '',
        guardianEmail: '',
        guardianGender: '',
        guardianContact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        alert('Profile details saved successfully!');
    };

    return (
        <div className="profile-container">
            <div className="profile-header-card">
                <h1>Profile</h1>
            </div>

            <div className="profile-content">

                {/* Basic Details Section */}
                <div className="section-card">
                    <h2 className="section-title">Basic Details</h2>
                    <div className="section-body basic-details-grid">

                        <div className="form-column">
                            <div className="form-group">
                                <label>USN:</label>
                                <input type="text" value={formData.usn} disabled className="readonly-input" />
                            </div>

                            <div className="form-group">
                                <label>First / Middle / Last Name:</label>
                                <div className="name-inputs">
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First" />
                                    <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle" />
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>College Email: <span className="required">*</span></label>
                                <input type="email" name="collegeEmail" value={formData.collegeEmail} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Personal Email: <span className="required">*</span></label>
                                <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Contact: <span className="required">*</span></label>
                                <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Profile Picture Side */}
                        <div className="profile-pic-column">
                            <div className="profile-placeholder">
                                <User size={120} color="#ccc" />
                            </div>
                            <div className="photo-upload-group">
                                <label>Profile Picture:</label>
                                <div className="upload-controls">
                                    <input type="text" placeholder="No file chosen" disabled className="file-name-input" />
                                    <button className="browse-btn">Browse</button>
                                </div>
                                <small className="note">Note*: Only .jpeg, .jpg, .png file formats are allowed.<br />Note*: Maximum file size is 1MB.</small>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Aadhaar:</label>
                            <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
                        </div>

                    </div>
                </div>

                {/* Parent Details Section */}
                <div className="section-card">
                    <h2 className="section-title">Parent Details</h2>
                    <div className="section-body parent-details-grid">

                        <div className="grid-header">
                            <span></span>
                            <label>Full Name</label>
                            <label>Email Id</label>
                            <label>Gender</label>
                            <label>Contact No <span className="required">*</span></label>
                        </div>

                        {/* Parent 1 */}
                        <div className="parent-row">
                            <label className="row-label">Parent 1:</label>
                            <input type="text" name="parent1Name" value={formData.parent1Name} onChange={handleChange} placeholder="Enter Parent Full Name" />
                            <input type="email" name="parent1Email" value={formData.parent1Email} onChange={handleChange} placeholder="Enter Parent Email" />
                            <select name="parent1Gender" value={formData.parent1Gender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="tel" name="parent1Contact" value={formData.parent1Contact} onChange={handleChange} placeholder="Enter Parent Contact No" />
                        </div>

                        {/* Parent 2 */}
                        <div className="parent-row">
                            <label className="row-label">Parent 2:</label>
                            <input type="text" name="parent2Name" value={formData.parent2Name} onChange={handleChange} placeholder="Enter Parent Full Name" />
                            <input type="email" name="parent2Email" value={formData.parent2Email} onChange={handleChange} placeholder="Enter Parent Email" />
                            <select name="parent2Gender" value={formData.parent2Gender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="tel" name="parent2Contact" value={formData.parent2Contact} onChange={handleChange} placeholder="Enter Parent Contact No" />
                        </div>

                        {/* Guardian */}
                        <div className="parent-row">
                            <label className="row-label">Guardian:</label>
                            <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="Enter Guardian Full Name" />
                            <input type="email" name="guardianEmail" value={formData.guardianEmail} onChange={handleChange} placeholder="Enter Guardian Email" />
                            <select name="guardianGender" value={formData.guardianGender} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="tel" name="guardianContact" value={formData.guardianContact} onChange={handleChange} placeholder="Enter Guardian Contact No" />
                        </div>
                    </div>
                </div>

                {/* Project Showcase / Portfolio Section */}
                <div className="section-card projects-showcase animate-enter">
                    <h2 className="section-title">Project Portfolio</h2>
                    <div className="section-body">
                        <div className="projects-grid">
                            <div className="project-card-brutal">
                                <h3>AI Attendance System</h3>
                                <p className="tech">Python, OpenCV, Flutter</p>
                                <p className="desc">Real-time face recognition for classroom attendance with automated reporting.</p>
                                <div className="project-actions">
                                    <button className="text-btn">Edit</button>
                                    <button className="text-btn">View Live</button>
                                </div>
                            </div>
                            <div className="project-card-brutal add-new">
                                <div className="add-icon">+</div>
                                <span>Add New Project</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>

            </div>
        </div>
    );
};

export default Profile;
