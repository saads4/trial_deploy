import dotenv from 'dotenv';

import mongoose from 'mongoose';

import CompanyContent from '../models/CompanyContent.js';

import { translateContent } from '../utils/translator.js'; // 🟢 ADDED YOUR AI TRANSLATOR!



dotenv.config();



// Your exact same English sample data (Untouched!)

const sampleContent = [

  {

    sectionName: 'hero',

    title: 'Welcome to Biosynvanta',

    subtitle: 'Leading provider of quality medical equipment',

    content: 'Premium medical solutions for healthcare professionals worldwide',

    images: [

      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',

      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',

      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',

      'https://images.unsplash.com/photo-1551190822-a933eaa22b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',

      'https://images.unsplash.com/photo-1582719471384-89dbfa4e6835?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'

    ],

    order: 1

  },

  {

  sectionName: 'about-preview',

  title: 'About Biosynvanta',

  subtitle: 'Your trusted healthcare partner',

  content: 'Biosynvanta is a Mumbai-based healthcare export company specializing in the global sourcing and supply of high-quality medical, surgical, and laboratory consumables. We support hospitals, laboratories, distributors, and procurement agencies worldwide by providing reliable and competitively priced healthcare products sourced from trusted Indian manufacturers. Working with carefully vetted partners operating under established quality management systems, our products comply with international standards such as ISO, CE, and FDA requirements. Through structured sourcing processes and export-focused supply chain management, Biosynvanta ensures consistent quality, dependable supply, and efficient global delivery for healthcare buyers.',

  images: [],

  order: 2

},

{

  sectionName: 'faq',

  title: 'Why Choose Biosynvanta?',

  subtitle: 'Your trusted partner in healthcare solutions',

  content: 'Learn more about our commitment to excellence',

  faqItems: [

    {

      question: "Industry & Regulatory Understanding",

      answer: "Our team combines expertise across regulatory compliance, quality systems, operations, and supply chain management, enabling informed sourcing decisions and reliable international supply."

    },

    {

      question: "Structured Manufacturer Selection & Quality Alignment",

      answer: "We collaborate with qualified Indian manufacturers operating under established quality management systems and aligned with internationally recognized healthcare standards."

    },

    {

      question: "Export-Focused Supply Chain Execution",

      answer: "Our processes are structured specifically for international trade, covering procurement planning, documentation readiness, logistics coordination, and smooth cross-border shipment execution."

    },

    {

      question: "Consolidated Healthcare Consumables Portfolio",

      answer: "We offer a curated portfolio of medical, surgical, and laboratory consumables, enabling distributors and healthcare institutions to streamline procurement through a single supply partner."

    },

    {

      question: "Commercial Competitiveness with Operational Discipline",

      answer: "Through efficient vendor coordination and cost-optimized sourcing, we maintain competitive pricing while safeguarding product reliability and supply continuity."

    },

    {

      question: "Long-Term Partnership Approach",

      answer: "We prioritize transparency, responsiveness, and relationship-driven engagement. Our goal is not transactional supply — but sustainable international partnerships built on trust and performance consistency."

    }

  ],

  order: 3

},

  {

    sectionName: 'about',

    title: 'Who We Are',

    subtitle: 'Leading the future of healthcare',

    content: `Biosynvanta is a Mumbai-based healthcare export company specializing in the global sourcing and distribution of medical, surgical, and laboratory consumables. We operate with a clear objective: to provide international healthcare buyers with reliable, compliant, and competitively positioned supply solutions from India.\n\nOur leadership team brings cross-functional expertise across regulatory affairs, quality systems, operations, marketing, human resources, and supply chain management. This multidisciplinary foundation enables us to rigorously evaluate manufacturing partners, maintain structured sourcing processes, and respond effectively to the operational and compliance requirements of global healthcare markets.\n\nWe supply a comprehensive portfolio of healthcare consumables to hospitals, laboratories, distributors, procurement agencies, and institutional buyers across international markets. Our product categories include infusion and injection systems, urology and urinary care solutions, blood collection and diagnostic consumables, wound care products, medical gloves, and laboratory disposables.\n\nBiosynvanta collaborates with carefully vetted Indian manufacturing partners operating under established quality management systems. These partners follow strict quality assurance protocols and maintain well-equipped facilities to ensure adherence to international standards, including ISO, CE, and FDA requirements. Through disciplined vendor selection, supply chain coordination, and export-focused logistics planning, we ensure consistent product availability, traceability, and cost efficiency for our global clients.\n\nOur approach is built on structured processes, compliance awareness, and long-term partnership thinking. We aim to support healthcare systems worldwide by delivering safe, hygienic, and operationally dependable consumables that meet the evolving demands of clinical and laboratory environments.`,

    images: [

      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'

    ],

    order: 4

  },

  {

    sectionName: 'mission',

    title: 'Our Mission',

    subtitle: 'Advancing healthcare worldwide',

    content: `Our mission is to deliver compliant, quality-assured, and competitively positioned healthcare consumables to global buyers through structured sourcing, strong manufacturing partnerships, and efficient export supply chain execution. We are committed to building long-term international relationships founded on integrity, transparency, and operational consistency.`,

    images: [],

    order: 5

  },

  {

    sectionName: 'vision',

    title: 'Our Vision',

    subtitle: 'Transforming healthcare delivery',

    content: `To be a globally recognized healthcare export partner known for disciplined sourcing, regulatory awareness, and reliable supply of medical and laboratory consumables across international markets.`,

    images: [],

    order: 6

  },

  {

  sectionName: 'core-value',

  title: 'Our Core Values',

  subtitle: 'The principles that guide everything we do',

  content: 'Our Values',

  values: [

    {

      title: "Compliance-Driven Responsibility",

      description: "We operate with a strong understanding of regulatory frameworks and documentation requirements across international healthcare markets. Our sourcing and distribution processes are aligned with recognized quality management systems to support safe and compliant supply."

    },

    {

      title: "Process Discipline & Accountability",

      description: "We prioritize structured evaluation, traceability, and clear communication throughout procurement and export operations. Accountability at every stage of the supply chain reinforces reliability for our global partners."

    },

    {

      title: "Partnership with Performance Focus",

      description: "We build long-term relationships grounded in consistency, responsiveness, and measurable performance — supporting distributors, healthcare institutions, and procurement agencies with dependable supply solutions."

    },

    {

      title: "Transparency in Commercial Engagement",

      description: "From pricing structures to shipment coordination, we maintain open communication and clarity, enabling smooth cross-border transactions and predictable business outcomes."

    },

    {

      title: "Continuous Operational Strengthening",

      description: "We continuously refine our sourcing strategies, vendor selection processes, and supply chain execution to enhance efficiency, scalability, and long-term competitiveness in international markets."

    }

  ],

  order: 7

}

];



export const populateSampleContent = async () => {

  try {

    // Check if we need to connect (prevents errors if server.js already connected)

    if (mongoose.connection.readyState === 0) {

      await mongoose.connect(process.env.MONGO_URI);

      console.log('Connected to database');

    }

    

    console.log('Populating and Translating sample CompanyContent... (This might take a few seconds)');

    

    for (const content of sampleContent) {

      // 1. Pass the English text through your AI Translator

      const translatedTitle = await translateContent(content.title);

      const translatedSubtitle = await translateContent(content.subtitle);

      const translatedText = await translateContent(content.content);



      // 2. Loop through and translate all FAQs if they exist

      let translatedFaqs = [];

      if (content.faqItems && content.faqItems.length > 0) {

        translatedFaqs = await Promise.all(content.faqItems.map(async (faq) => ({

          question: await translateContent(faq.question),

          answer: await translateContent(faq.answer)

        })));

      }



      // 3. Loop through and translate all values if they exist

      let translatedValues = [];

      if (content.values && content.values.length > 0) {

        translatedValues = await Promise.all(content.values.map(async (value) => ({

          title: await translateContent(value.title),

          description: await translateContent(value.description)

        })));

      }



      // 3. Package it up into the exact format your MongoDB Model expects

      const modelFriendlyData = {

        sectionName: content.sectionName,

        images: content.images,

        order: content.order,

        title: translatedTitle,

        subtitle: translatedSubtitle,

        content: translatedText,

        faqItems: translatedFaqs

      };



      // 🟢 4. Save to database (upsert: true guarantees NO duplicates!)

      await CompanyContent.findOneAndUpdate(

        { sectionName: content.sectionName },

        modelFriendlyData,

        { upsert: true, returnDocument: 'after', overwrite: true }

      );

    }

    

    console.log('Sample content translated and populated successfully! 🎉');

    

    // (Kept disconnected commented out so it doesn't crash your server!)

    //await mongoose.disconnect();

  } catch (error) {

    console.error('Error populating sample content:', error);

  }

};