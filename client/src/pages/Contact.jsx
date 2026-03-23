// Import React hooks and API
import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Contact() {
  // Form state management
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Clear success message after 3 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => setSubmitStatus(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData);
    setIsSubmitting(true);
    setSubmitStatus("");
    setErrorMessage("");

    try {
      const response = await api.post("/inquiry", formData);
      console.log("Server response:", response);

      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setErrorMessage(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      // Handle different error types
      if (error.code === 'ECONNABORTED') {
        setErrorMessage("Request timed out. The server may be slow to respond. Please try again.");
      } else if (error.response) {
        // Server responded with error status
        setErrorMessage(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg-light)'}}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient text-center">Contact Us</h1>
        </div>
      </div>
      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Get In Touch</h2>
            <p className="text-lg" style={{color: 'var(--text-secondary)'}}>We're here to help and answer any questions you might have</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(47, 111, 182, 0.1)'}}>
                <svg className="w-10 h-10" style={{color: 'var(--deep-blue)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Email</h3>
              <p style={{color: 'var(--text-secondary)'}} className="mb-2">sales@biosynvanta.com</p>
            </div>
            {/* Phone */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(47, 111, 182, 0.1)'}}>
                <svg className="w-10 h-10" style={{color: 'var(--deep-blue)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Phone</h3>
              <p style={{color: 'var(--text-secondary)'}} className="mb-2">+91 89765 04666</p>
            </div>
            {/* Address */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(47, 111, 182, 0.1)'}}>
                <svg className="w-10 h-10" style={{color: 'var(--deep-blue)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Address</h3>
              <p style={{color: 'var(--text-secondary)'}} className="mb-2">A-301, Shah Complex-3, plot no.02, sector-13, Maharashtra, India</p>
            </div>
          </div>
          {/* Map */}
          <div className="mt-12">
            <div className="rounded-xl overflow-hidden shadow-lg h-80 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2941.2060225844975!2d72.99983977387458!3d19.062468352399847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2sin!4v1772430685806!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form */}
      <section className="py-16" style={{backgroundColor: 'var(--bg-light)'}}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Send a Message</h2>
            <p className="text-lg" style={{color: 'var(--text-secondary)'}}>Fill out the form below and we'll get back to you as soon as possible</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-700 font-medium">Thank you for your message! We'll get back to you soon.</p>
                </div>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-red-700 font-medium">Something went wrong.</p>
                    {errorMessage && (
                      <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg transition-colors duration-200" style={{border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-white)'}}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg transition-colors duration-200" style={{border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-white)'}}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg transition-colors duration-200" style={{border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-white)'}}
                  placeholder="+1 (555) 123-4567 (optional)"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg transition-colors duration-200" style={{border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-white)'}}
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <p style={{color: 'var(--text-secondary)'}} className="text-sm">
                  <span className="text-red-500">*</span> Required fields
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-12 text-center">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-2 text-gradient">Need Immediate Assistance?</h3>
              <p style={{color: 'var(--text-secondary)'}} className="mb-4">
                For urgent inquiries, please call us directly at <span style={{color: 'var(--text-primary)'}} className="font-semibold">+91 89765 04666</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}