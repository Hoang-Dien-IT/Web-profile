import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockProfile } from '../../data/mockProfile';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: 'web-development',
    budget: 'not-specified'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Project Type: ${formData.projectType}\n` +
      `Budget: ${formData.budget}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:${mockProfile.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      projectType: 'web-development',
      budget: 'not-specified'
    });
    
    setIsSubmitting(false);
    alert('Email client opened! Please send the email to complete your message.');
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: mockProfile.email,
      link: `mailto:${mockProfile.email}`
    },
    {
      icon: '📱',
      title: 'Phone',
      value: mockProfile.phone || '+84 123 456 789',
      link: `tel:${mockProfile.phone || '+84123456789'}`
    },
    {
      icon: '📍',
      title: 'Location',
      value: mockProfile.location,
      link: '#'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: mockProfile.socialLinks.linkedin?.replace('https://www.linkedin.com/in/', '') || 'linkedin.com/in/hoang-dien',
      link: mockProfile.socialLinks.linkedin || 'https://linkedin.com/in/hoang-dien'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Get In <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Touch</span>
            </h1>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Let's work together to bring your <span className="text-orange-400 font-medium">ideas</span> to life
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Send Message</h2>
              </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-5 py-4 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="Your name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl px-5 py-4 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20 focus:outline-none transition-all duration-300 text-white placeholder-gray-400"
                    placeholder="your@email.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                  placeholder="Project subject"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors duration-300"
                  >
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-plus">$10,000+</option>
                    <option value="not-specified">Not Specified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Contact Information</h3>
                </div>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </span>
                    <div>
                      <p className="font-medium text-white">{info.title}</p>
                      <p className="text-gray-400 text-sm">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-teal-500/20 to-blue-500/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Quick Response</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I typically respond within <span className="text-green-400 font-semibold">24-48 hours</span>. For urgent matters, feel free to call directly.
              </p>
              <motion.div 
                className="flex items-center bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-500/30"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse mr-3 shadow-lg shadow-green-500/50"></span>
                <span className="text-green-300 font-medium">Available for new projects</span>
              </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;