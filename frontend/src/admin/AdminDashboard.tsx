import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Admin Components
import ProfileManager from './components/ProfileManager';
import ProjectManager from './components/ProjectManager';
import SkillManager from './components/SkillManager';
import ExperienceManager from './components/ExperienceManager';
import EducationManager from './components/EducationManager';
import ContactManager from './components/ContactManager';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
}

const menuItems: MenuItem[] = [
  { id: 'profile', name: 'Hồ sơ', icon: '👤', component: ProfileManager },
  { id: 'projects', name: 'Dự án', icon: '💼', component: ProjectManager },
  { id: 'skills', name: 'Kỹ năng', icon: '🛠️', component: SkillManager },
  { id: 'experience', name: 'Kinh nghiệm', icon: '💼', component: ExperienceManager },
  { id: 'education', name: 'Học vấn', icon: '🎓', component: EducationManager },
  { id: 'contact', name: 'Tin nhắn', icon: '📧', component: ContactManager },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const ActiveComponent = menuItems.find(item => item.id === activeTab)?.component || ProfileManager;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="flex">
        {/* Sidebar */}
        <motion.div 
          className={`${isCollapsed ? 'w-16' : 'w-64'} bg-dark-800/50 backdrop-blur-md border-r border-primary-500/20 transition-all duration-300`}
          animate={{ width: isCollapsed ? 64 : 256 }}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                {!isCollapsed && (
                <motion.h1 
                  className="text-2xl font-bold gradient-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Bảng quản trị
                </motion.h1>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 transition-colors"
              >
                <span className="text-primary-400">
                  {isCollapsed ? '→' : '←'}
                </span>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-primary-500/30 text-primary-300 border border-primary-500/50'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Footer */}
              {!isCollapsed && (
            <motion.div 
              className="absolute bottom-4 left-4 right-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-gray-500">Phiên bản 1.0.0</p>
                <p className="text-xs text-gray-500">Quản trị Portfolio</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {menuItems.find(item => item.id === activeTab)?.name}
                </h2>
                <p className="text-gray-400">
                  Manage your portfolio {activeTab} content
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Save Changes
                </button>
                <button 
                  onClick={() => window.open('/', '_blank')}
                  className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                >
                  Preview Site
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;