import { useState, useEffect } from "react";
import api from "../utils/api";

export default function About() {
  const [aboutContent, setAboutContent] = useState(null);
  const [missionContent, setMissionContent] = useState(null);
  const [visionContent, setVisionContent] = useState(null);
  const [coreValuesContent, setCoreValuesContent] = useState(null);
  const [certificatesContent, setCertificatesContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const aboutRes = await api.get("/company-content/about").catch(() => null);
        const missionRes = await api.get("/company-content/mission").catch(() => null);
        const visionRes = await api.get("/company-content/vision").catch(() => null);
        const coreValuesRes = await api.get("/company-content/core-value").catch(() => null);
        const certificatesRes = await api.get("/certificates").catch(() => null);
        if (aboutRes?.data?.data) setAboutContent(aboutRes.data.data);
        if (missionRes?.data?.data) setMissionContent(missionRes.data.data);
        if (visionRes?.data?.data) setVisionContent(visionRes.data.data);
        if (coreValuesRes?.data?.data) setCoreValuesContent(coreValuesRes.data.data);
        if (certificatesRes?.data?.data) setCertificatesContent(certificatesRes.data.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertificate(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showModal && event.target === event.currentTarget) {
        closeModal();
      }
    };
    const handleEscapeKey = (event) => {
      if (showModal && event.key === 'Escape') {
        closeModal();
      }
    };
    if (showModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const certificates = certificatesContent || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">About Us</h1>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{aboutContent?.title || "Who We Are"}</h2>
          </div>
          <div className="relative">
            <div className="float-right ml-8 mb-4 lg:w-2/5">
              <div className="relative">
                <img
                  src={aboutContent?.images?.filter(image => image.includes('imagekit.io'))[0] || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                  alt="About Biosynvanta"
                  className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Failed to load about image:', e.target.src);
                    e.target.src = "https://via.placeholder.com/600x400?text=About+Us+Image";
                  }}
                />
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg text-justify">{aboutContent?.content || "Loading content..."}</p>
            </div>
            <div className="clear-both"></div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{missionContent?.title || "Our Mission"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">{missionContent?.content || "Loading mission content..."}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{visionContent?.title || "Our Vision"}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">{visionContent?.content || "Loading vision content..."}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Certifications</h2>
            <p className="text-lg text-gray-600">We maintain comprehensive certifications to ensure the highest quality and safety standards</p>
          </div>
          {certificates.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {certificates.map((certificate) => (
                <div
                  key={certificate._id}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => openCertificateModal(certificate.imageUrl)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={certificate.imageUrl}
                      alt={certificate.title || "Certificate"}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x400?text=Certificate";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-3 text-sm text-gray-600 font-medium">{certificate.title || `Certificate`}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No certificates available at the moment.</div>
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{coreValuesContent?.title || "Our Core Values"}</h2>
            <p className="text-lg text-gray-600">{coreValuesContent?.subtitle || "The principles that guide everything we do"}</p>
          </div>
          <div className="relative">
            {/* First row - 3 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {coreValuesContent?.values?.[0] && (
                <div className="text-center transform lg:translate-y-4 w-full sm:max-w-sm">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{coreValuesContent.values[0].title}</h3>
                    <p className="text-gray-600">{coreValuesContent.values[0].description}</p>
                  </div>
                </div>
              )}
              {coreValuesContent?.values?.[1] && (
                <div className="text-center transform lg:translate-y-4 w-full sm:max-w-sm">
                  <div className="bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{coreValuesContent.values[1].title}</h3>
                    <p className="text-gray-600">{coreValuesContent.values[1].description}</p>
                  </div>
                </div>
              )}
              {coreValuesContent?.values?.[2] && (
                <div className="text-center transform lg:translate-y-4 w-full sm:max-w-sm">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{coreValuesContent.values[2].title}</h3>
                    <p className="text-gray-600">{coreValuesContent.values[2].description}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Second row - 2 centered items */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
              {coreValuesContent?.values?.[3] && (
                <div className="text-center transform lg:translate-y-4 w-full sm:max-w-sm">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{coreValuesContent.values[3].title}</h3>
                    <p className="text-gray-600">{coreValuesContent.values[3].description}</p>
                  </div>
                </div>
              )}
              {coreValuesContent?.values?.[4] && (
                <div className="text-center transform lg:translate-y-4 w-full sm:max-w-sm">
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{coreValuesContent.values[4].title}</h3>
                    <p className="text-gray-600">{coreValuesContent.values[4].description}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Fallback for less than 5 values */}
            {(!coreValuesContent?.values || coreValuesContent.values.length < 5) && (
              <div className="text-center">
                <div className="text-gray-400 text-lg">No core values available at the moment.</div>
              </div>
            )}
          </div>
        </div>
      </section>
      {showModal && selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full bg-white rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-4">
              <img
                src={selectedCertificate}
                alt="Certificate Preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x1000?text=Certificate+Preview";
                }}
              />
            </div>
            <div className="px-6 pb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificate Preview</h3>
              <p className="text-gray-600 text-sm">Click anywhere outside or use the close button to exit preview</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}