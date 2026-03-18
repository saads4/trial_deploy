import CompanyContent from "../models/CompanyContent.js";

import asyncHandler from "../middlewares/asyncHandler.js";

import { translateContent } from "../utils/translator.js";

import { localizeField } from "../utils/localize.js";



export const getCompanyContent = asyncHandler(async (req, res) => {

  try {

    const sectionName = req.params.sectionName;



    if (!sectionName) {

      const allContent = await CompanyContent.find().sort({ order: 1 });



      const localizedAll = allContent.map(content => ({

          _id: content._id,

          sectionName: content.sectionName,

          title: localizeField(content.title, req.lang),

          subtitle: localizeField(content.subtitle, req.lang),

          content: localizeField(content.content, req.lang),

          images: content.images,

          faqItems: content.faqItems?.map(faq => ({

              question: localizeField(faq.question, req.lang),

              answer: localizeField(faq.answer, req.lang)

          })) || [],

          values: content.values?.map(value => ({

              title: localizeField(value.title, req.lang),

              description: localizeField(value.description, req.lang)

          })) || [],

          whyCards: content.whyCards?.filter(card => card.isActive)?.sort((a, b) => a.order - b.order)?.map(card => ({

              _id: card._id,

              title: localizeField(card.title, req.lang),

              description: localizeField(card.description, req.lang),

              imageURL: card.imageURL

          })) || []

      }));



      return res.status(200).json({ success: true, data: localizedAll });

    }



    const content = await CompanyContent.findOne({

      sectionName: sectionName,

    });



    if (!content) {

      return res.status(404).json({

        success: false,

        message: `Content for section '${sectionName}' not found`,

      });

    }

    

    const localizedContent = {

        _id: content._id,

        sectionName: content.sectionName,

        title: localizeField(content.title, req.lang),

        subtitle: localizeField(content.subtitle, req.lang),

        content: localizeField(content.content, req.lang),

        images: content.images,

        faqItems: content.faqItems?.map(faq => ({

            question: localizeField(faq.question, req.lang),

            answer: localizeField(faq.answer, req.lang)

        })) || [],

        values: content.values?.map(value => ({

            title: localizeField(value.title, req.lang),

            description: localizeField(value.description, req.lang)

        })) || [],

        whyCards: content.whyCards?.filter(card => card.isActive)?.sort((a, b) => a.order - b.order)?.map(card => ({

            _id: card._id,

            title: localizeField(card.title, req.lang),

            description: localizeField(card.description, req.lang),

            imageURL: card.imageURL

        })) || []

    };



    res.status(200).json({ success: true, data: localizedContent });

  } 

  catch (error) {

    console.error('Error fetching company content:', error);

    res.status(500).json({

      success: false,

      message: 'Internal server error',

    });

  }

});



export const updateCompanyContent = asyncHandler(async (req, res) => {

  // Get sectionName from URL parameter for PUT requests, or body for POST requests

  const sectionName = req.params.sectionName || req.body.sectionName;

  

  const { title, subtitle, content, images, faqItems, order } = req.body;

  const updateData = { images, order };



  if (title) updateData.title = await translateContent(title);

  if (subtitle) updateData.subtitle = await translateContent(subtitle);

  if (content) updateData.content = await translateContent(content);



  if (faqItems && Array.isArray(faqItems)) {

      const translatedFaqItems = await Promise.all(

          faqItems.map(async (item) => ({

              question: await translateContent(item.question),

              answer: await translateContent(item.answer)

          }))

      );

      updateData.faqItems = translatedFaqItems;

  }



  const updatedContent = await CompanyContent.findOneAndUpdate(

    { sectionName },

    updateData,

    { upsert: true, new: true, runValidators: true }

  );

  

  res.status(200).json({ success: true, data: updatedContent });

});

export const getWhyCards = asyncHandler(async (req, res) => {

  try {

    console.log('Fetching why cards...');

    const content = await CompanyContent.findOne({ sectionName: 'why-cards' });

    

    console.log('Found content:', content ? 'Yes' : 'No');

    if (content) {

      console.log('Why cards count:', content.whyCards ? content.whyCards.length : 0);

    }

    

    if (!content || !content.whyCards || content.whyCards.length === 0) {

      console.log('Returning empty array');

      return res.status(200).json({ success: true, data: [] });

    }

    

    const whyCards = content.whyCards
      .filter(card => card.isActive)

      .sort((a, b) => a.order - b.order)

      .map(card => ({

        _id: card._id,

        title: localizeField(card.title, req.lang),

        description: localizeField(card.description, req.lang),

        imageURL: card.imageURL

      }));

    

    res.status(200).json({ success: true, data: whyCards });

  } catch (error) {

    console.error('Error fetching why cards:', error);

    res.status(500).json({

      success: false,

      message: 'Internal server error',

    });

  }

});