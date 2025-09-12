import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../lib/utils';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/chenyue', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/chenyue', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/chenyue', icon: 'twitter' },
    { name: 'Email', url: 'mailto:hello@chenyue.dev', icon: 'email' },
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeUp} className="text-h1 font-bold mb-6">
              Get In Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you.
              Let's create something amazing together.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface p-8 rounded-lg border border-surface"
            >
              <h2 className="text-h3 font-bold mb-6">Send a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400">Thank you! Your message has been sent successfully.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-surface rounded-lg focus:border-accent focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-surface rounded-lg focus:border-accent focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-surface rounded-lg focus:border-accent focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-surface rounded-lg focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-background py-3 rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-h3 font-bold mb-6">Let's Connect</h2>
                <p className="text-muted leading-relaxed mb-8">
                  I'm always interested in new opportunities, collaborations, and interesting projects. 
                  Whether you have a specific project in mind or just want to chat about technology and design, 
                  feel free to reach out.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Response Time</h3>
                <p className="text-muted">
                  I typically respond to messages within 24 hours during weekdays. 
                  For urgent matters, feel free to reach out via LinkedIn.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">What I'm Looking For</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Frontend architecture consulting</li>
                  <li>• React/TypeScript development projects</li>
                  <li>• Design system implementation</li>
                  <li>• Technical mentoring opportunities</li>
                  <li>• Open source collaborations</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-bold text-center mb-12"
          >
            Find Me Online
          </motion.h2>
          
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="p-6 bg-background rounded-lg border border-surface hover:border-accent transition-colors text-center group"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                  <span className="text-accent font-semibold">
                    {link.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                  {link.name}
                </h3>
                <p className="text-muted text-sm">
                  Connect with me on {link.name}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
