# CRESENT CONSTRUCTION - ASSETS REQUIREMENTS

## Project: Cresent Construction Website Rebuild
## Date: December 26, 2025
## Status: Clean Architecture - Assets Needed

---

## 📋 SUMMARY

This document outlines all the media assets (images, videos, and other resources) required to complete the Cresent Construction website. These are extracted from the recovered website structure.

---

## 🖼️ IMAGES REQUIRED

### Logos & Branding
```
assets/images/
├── logo.png                    - Main company logo (for header)
├── logo-dark.png              - Dark version of logo
├── logo-light.png             - Light version of logo
├── favicon.ico                - Website favicon (16x16, 32x32)
└── logo-wide.png              - Wide format logo for footer
```

### Hero/Banner Section
```
assets/images/hero/
├── banner-bg-main.jpg         - Main hero background image
├── banner-overlay-bg.jpg      - Overlay pattern for hero
└── hero-mobile.jpg            - Mobile-optimized banner
```

### About Section
```
assets/images/
├── about-image.jpg            - Main about section image
├── about-pattern.png          - Decorative pattern
├── avatar.png                 - Company representative/founder
└── team-photo.jpg             - Team group photo
```

### Commercial/Projects
```
assets/images/projects/
├── project-1.jpg              - Commercial Complex
├── project-2.jpg              - Residential Complex
├── project-3.jpg              - Modern Villa
├── project-4.jpg              - Office Building
├── project-5.jpg              - Shopping Mall
├── project-6.jpg              - Apartment Complex
├── project-7.jpg              - Mixed Development
├── project-8.jpg              - Hotel Development
├── project-9.jpg              - Industrial Complex
├── project-10.jpg             - Retail Complex
└── ... (Additional 20+ project images)
```

**From Website Archive (Commercial Projects):**
- 6 Commercial project photos (numbered 1-6 in commercial folder)
- Must be sourced from original archives or recreated

### Residential Projects
```
assets/images/projects/residential/
├── residential-1.jpg
├── residential-2.jpg
├── residential-3.jpg
├── residential-4.jpg
├── residential-5.jpg
├── residential-6.jpg
└── ... (At least 12-16 residential project images)
```

### Interior Design Projects
```
assets/images/projects/interior/
├── interior-1.jpg
├── interior-2.jpg
├── interior-3.jpg
├── interior-4.jpg
├── interior-5.jpg
├── interior-6.jpg
└── ... (At least 15-20 interior design images)
```

### Service Section Images
```
assets/images/services/
├── plan-preparation.jpg       - Preparation of Plans
├── building-construction.jpg   - Building Construction
├── elevation.jpg              - Elevation Design
├── estimate.jpg               - Cost Estimation
├── structural.jpg             - Structural Design
├── truss-work.jpg             - Truss Work
├── wood-works.jpg             - Wood Works
├── supervision.jpg            - Project Supervision
├── plan-approval.jpg          - Plan Approval
├── interior-designing.jpg      - Interior Designing
├── acp-work.jpg               - ACP Work
├── false-ceiling.jpg          - False Ceiling
└── other-services.jpg         - Additional Services
```

### Footer/Contact
```
assets/images/
├── footer-bg.jpg              - Footer background
└── office-location-image.jpg  - Office location photo
```

---

## 🎥 VIDEOS REQUIRED

### Project Videos
```
assets/videos/
├── project-video-1.mp4        - General project tour/overview
├── project-video-2.mp4        - Residential complex walkthrough
├── project-video-3.mp4        - Commercial project showcase
├── project-video-4.mp4        - Interior design showcase
├── project-video-5.mp4        - Construction timeline/progress
├── project-video-6.mp4        - Building unveiling/completion
├── project-video-7.mp4        - Customer testimonials
├── project-video-8.mp4        - Company introduction
├── project-video-9.mp4        - Drone footage of projects
├── project-video-10.mp4       - Construction site activity
└── ... (Additional 10+ project videos)
```

### Video Specifications
- **Format:** MP4 (H.264 codec recommended)
- **Resolution:** 1920x1080 (1080p) minimum
- **Frame Rate:** 24-30 fps
- **Bitrate:** 5-8 Mbps for streaming
- **Duration:** 30 seconds to 3 minutes per video
- **Aspect Ratio:** 16:9 preferred

### Compressed Video Versions
```
assets/videos/compressed/
├── (Mobile-optimized versions of above)
├── (Lower bitrate versions)
└── (Thumbnail images from videos)
```

**Note:** From archives, approximately 18+ videos were referenced for project showcases.

---

## 📋 DETAILED ASSET COUNT

### Total Assets Breakdown:

| Category | Quantity | Notes |
|----------|----------|-------|
| Logos | 5 | Various formats and sizes |
| Banner Images | 3-5 | Hero section |
| About Section | 3-4 | Team and company images |
| Service Images | 12 | One per service type |
| Project Images | 35-40+ | Commercial, Residential, Interior |
| Footer/General | 5 | Background, misc |
| **Total Images** | **65-75** | High-quality JPG/PNG |
| Project Videos | 15-20+ | Various lengths |
| **Total Videos** | **15-20+** | MP4 format |

---

## 🎯 IMAGE SPECIFICATIONS

### General Guidelines
- **Format:** JPEG for photos, PNG for graphics/logos
- **Quality:** High resolution (at least 1920px width for hero images)
- **Optimization:** Compressed for web (50-200KB typical for photos)
- **Naming:** Clear, descriptive names (kebab-case)
- **Metadata:** EXIF data removed for privacy
- **Accessibility:** Alt text provided in HTML

### Specific Dimensions
```
Logo:                    200-400px width
Hero Banner:            1920x600px (min)
Project Thumbnails:     600x600px or 1200x800px
Service Images:         400x400px or 600x500px
About Section:          600x500px
Social Media Share:     1200x630px
Favicon:               16x16, 32x32, 64x64px
```

---

## 🎬 SOURCE OF ASSETS FROM WEB ARCHIVE

The following assets were originally sourced from the archived website:

### Identified in Archive:
1. **Logo File:** `/Content/assets/images/25-03-2023/logo.png`
2. **Project Images Path:** `/Content/assets/images/25-03-2023/commercial/` (6 images)
3. **Residential Images Path:** `/Content/assets/images/25-03-2023/residential/` (6+ images)
4. **Interior Images Path:** `/Content/assets/images/25-03-2023/interior/` (10+ images)
5. **Service Images Path:** `/Content/assets/images/25-03-2023/services/` (12 images)
6. **About Images:** 
   - `/Content/assets/images/about/avatar.png`
   - `/Content/assets/images/about/pattern.png`
   - `/Content/assets/images/25-03-2023/home side image.jpg`
7. **Video Files:** Multiple MP4 files from `/Content/assets/images/Compressed/` and `/Content/assets/images/25-03-2023/` folders

### Archive Video References:
- crecent.mp4, crecent2.mp4 through crecent18.mp4 (from Compressed folder)
- Additional slider videos from 25-03-2023 folder

---

## 💾 RECOMMENDED DELIVERY STRUCTURE

```
project/
│
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── about-image.jpg
│   │   ├── projects/
│   │   │   ├── project-1.jpg through project-40.jpg
│   │   ├── services/
│   │   │   ├── plan-preparation.jpg
│   │   │   ├── building-construction.jpg
│   │   │   └── ... (12 service images)
│   │   └── hero/
│   │       └── banner-bg-main.jpg
│   │
│   └── videos/
│       ├── project-video-1.mp4 through project-video-20.mp4
│       └── compressed/ (mobile versions)
│
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

---

## 🔄 ASSET ACQUISITION OPTIONS

### Option 1: Extract from Web Archive
- Use Wayback Machine's download feature
- Extract from the identified file paths
- May require cleanup and optimization

### Option 2: Source from Original Website
- If website is still accessible, download directly
- Higher quality and current versions
- Check copyright/ownership

### Option 3: Professional Photography
- Commission new product/project photography
- Hire videographer for project showcase videos
- Recommended for fresh, modern look

### Option 4: Stock Images + Original Mix
- Use high-quality stock images for generic content
- Combine with actual project photos
- Recommended for quick launch

### Option 5: AI-Generated Alternatives
- Use AI tools to create architectural renderings
- Generate realistic construction project visuals
- Create before/after mockups

---

## ⚠️ IMPORTANT NOTES

1. **Copyright Compliance:** Ensure all assets are properly licensed or owned by the company
2. **Mobile Optimization:** All images must be responsive-optimized
3. **Video Hosting:** Consider CDN or video hosting platform for videos
4. **Loading Performance:** Implement lazy loading for images
5. **Backup:** Keep multiple copies of all original assets
6. **Naming Convention:** Use consistent, descriptive file naming
7. **Version Control:** Track asset updates and changes
8. **Accessibility:** Include alt text for all images
9. **Format Consistency:** Maintain uniform aspect ratios where possible

---

## 📞 CONTACT & GST INFORMATION

**Company:** Cresent Construction
**GST NUMBER:** 33HHXPM3536A1Z7
**Email:** crescentconstructiontvl@gmail.com
**Phone:** +91 7418 621 523 / +91 8072 145 499
**Address:** 3C, Parenchudar St, Samathanapuram, Palayamkottai, Tirunelveli - 627002

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Gather all 65-75 project images
- [ ] Collect 15-20+ project showcase videos
- [ ] Compress and optimize all images for web
- [ ] Create/obtain company logo in multiple formats
- [ ] Obtain high-resolution hero banner images
- [ ] Service section images (12 required)
- [ ] Project portfolio images (35-40+ required)
- [ ] Video files ready in MP4 format
- [ ] Test responsive behavior across devices
- [ ] Verify all image alt text is present
- [ ] Ensure video compatibility across browsers
- [ ] Final review and quality assurance

---

**Last Updated:** December 26, 2025
**Status:** Complete Architecture Overview
**Next Step:** Asset Collection & Acquisition
