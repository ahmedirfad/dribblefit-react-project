const HomeSection = require('../../models/HomeSection');

// @desc    Get all home sections
// @route   GET /api/admin/home/sections
// @access  Admin only
const getAllSections = async (req, res) => {
  try {
    let sections = await HomeSection.find().sort({ sectionId: 1 });
    
    if (sections.length === 0) {
      sections = await seedDefaultSections();
    }
    
    const formattedSections = {};
    sections.forEach(section => {
      formattedSections[section.sectionId] = {
        is_active: section.isActive,
        ...section.settings
      };
    });
    
    res.json({
      success: true,
      sections: formattedSections
    });
  } catch (error) {
    console.error('Get all sections error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single section by ID
// @route   GET /api/admin/home/sections/:sectionId
// @access  Admin only
const getSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    let section = await HomeSection.findOne({ sectionId });
    
    if (!section) {
      const defaultSection = getDefaultSection(sectionId);
      if (defaultSection) {
        section = await HomeSection.create(defaultSection);
      } else {
        return res.status(404).json({ message: 'Section not found' });
      }
    }
    
    res.json({
      success: true,
      section: {
        is_active: section.isActive,
        ...section.settings
      }
    });
  } catch (error) {
    console.error('Get section error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update section
// @route   PUT /api/admin/home/sections/:sectionId
// @access  Admin only
const updateSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { is_active, ...settings } = req.body;
    
    const section = await HomeSection.findOneAndUpdate(
      { sectionId },
      {
        isActive: is_active,
        settings: settings,
        updatedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    res.json({
      success: true,
      message: 'Section updated successfully',
      section: {
        is_active: section.isActive,
        ...section.settings
      }
    });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(400).json({ message: error.message });
  }
};

// ==================== DEFAULT DATA FOR ALL 7 SECTIONS ====================

function getDefaultSection(sectionId) {
  const defaults = {
    'sale-banner': {
      sectionId: 'sale-banner',
      name: 'Sale Banner',
      isActive: true,
      settings: {
        is_active: true,
        end_date: '2026-07-11T23:59',
        coupon_code: 'WORLDCUP2026',
        message: 'WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026'
      }
    },
    'hero-banner': {
      sectionId: 'hero-banner',
      name: 'Hero Banner',
      isActive: true,
      settings: {
        is_active: true,
        image: '',
        heading: 'ELEVATE YOUR',
        highlighted_text: 'GAME STYLE',
        subheading: 'Discover authentic football jerseys from top leagues worldwide. Limited editions, exclusive designs, and unbeatable quality.',
        button_text: 'View Collection',
        button_link: '/products',
        features: ['Authentic Jerseys', 'Worldwide Shipping', 'Limited Editions']
      }
    },
    'kits': {
      sectionId: 'kits',
      name: 'International Kits',
      isActive: true,
      settings: {
        is_active: true,
        image: '',
        title: 'INTERNATIONAL',
        highlighted_text: 'KITS',
        subtitle: 'STARTING AT',
        currency: '₹',
        price: '799',
        button_text: 'Shop Now',
        button_link: '/products?category=international-kits'
      }
    },
    'bestsellers': {
      sectionId: 'bestsellers',
      name: 'Best Sellers',
      isActive: true,
      settings: {
        is_active: true,
        section_title: 'BEST',
        highlighted_text: 'SELLERS',
        section_subtitle: 'Discover our most popular football jerseys loved by fans worldwide',
        view_all_button_text: 'VIEW ALL PRODUCTS',
        view_all_button_link: '/products',
        products: []
      }
    },
    'passion': {
      sectionId: 'passion',
      name: 'Passion Section',
      isActive: true,
      settings: {
        is_active: true,
        image: '',
        title_line1: 'WEAR YOUR',
        highlighted_text1: 'PASSION.',
        title_line2: 'OWN THE',
        highlighted_text2: 'GAME.',
        subtitle: 'Shop by teams that rule the game.',
        button_text: 'EXPLORE ALL',
        button_link: '/products'
      }
    },
    'promo': {
      sectionId: 'promo',
      name: 'Promo Categories',
      isActive: true,
      settings: {
        is_active: true,
        section_title: 'EXPLORE',
        highlighted_text: 'COLLECTIONS',
        section_subtitle: 'Discover our curated collections for every football enthusiast',
        categories: []
      }
    },
    'video': {
      sectionId: 'video',
      name: 'Mexico De Oro',
      isActive: true,
      settings: {
        is_active: true,
        title: 'MEXICO DE ORO',
        subtitle_line1: 'A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE,',
        subtitle_line2: 'MADE WITH RECYCLED MATERIALS.',
        button_text: 'SHOP NOW',
        button_link: '/product/5',
        video_url: '',
        poster_image: '',
        overlay_opacity: 40
      }
    }
  };
  
  return defaults[sectionId] || null;
}

async function seedDefaultSections() {
  const sectionIds = ['sale-banner', 'hero-banner', 'kits', 'bestsellers', 'passion', 'promo', 'video'];
  const sections = [];
  
  for (const sectionId of sectionIds) {
    const defaultSection = getDefaultSection(sectionId);
    if (defaultSection) {
      sections.push(defaultSection);
    }
  }
  
  if (sections.length > 0) {
    await HomeSection.insertMany(sections);
    console.log('✅ 7 default homepage sections seeded successfully');
  }
  
  return await HomeSection.find().sort({ sectionId: 1 });
}

module.exports = {
  getAllSections,
  getSectionById,
  updateSection
};