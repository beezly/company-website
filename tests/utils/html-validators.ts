/**
 * Check if a document uses semantic HTML elements
 * @param doc - The document to check
 * @returns true if semantic elements are present
 */
export function hasSemanticHTML(doc: Document): boolean {
  const semanticElements = ['header', 'nav', 'main', 'footer'];
  return semanticElements.every(tag => doc.querySelector(tag) !== null);
}

/**
 * Check if a document has proper meta tags
 * @param doc - The document to check
 * @returns Object with title and description presence
 */
export function hasMetaTags(doc: Document): { hasTitle: boolean; hasDescription: boolean } {
  const title = doc.querySelector('title');
  const description = doc.querySelector('meta[name="description"]');
  
  return {
    hasTitle: title !== null && title.textContent !== null && title.textContent.trim().length > 0,
    hasDescription: description !== null && description.getAttribute('content') !== null && description.getAttribute('content')!.trim().length > 0
  };
}

/**
 * Check heading hierarchy in a document
 * @param doc - The document to check
 * @returns Object with h1Count and isHierarchyValid
 */
export function checkHeadingHierarchy(doc: Document): { h1Count: number; isHierarchyValid: boolean } {
  const h1s = doc.querySelectorAll('h1');
  const h1Count = h1s.length;
  
  // Get all headings in order
  const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  
  if (headings.length === 0) {
    return { h1Count, isHierarchyValid: false };
  }
  
  // Check hierarchy - each heading level should not skip levels
  let isHierarchyValid = true;
  let previousLevel = 0;
  
  for (const heading of headings) {
    const level = parseInt(heading.tagName.substring(1));
    
    if (previousLevel === 0) {
      // First heading should be h1
      if (level !== 1) {
        isHierarchyValid = false;
        break;
      }
    } else {
      // Subsequent headings should not skip levels when going down
      if (level > previousLevel + 1) {
        isHierarchyValid = false;
        break;
      }
    }
    
    previousLevel = level;
  }
  
  return { h1Count, isHierarchyValid };
}

/**
 * Check if all images have alt text
 * @param doc - The document to check
 * @returns Object with total images and images with alt text
 */
export function checkImageAltText(doc: Document): { totalImages: number; imagesWithAlt: number; allHaveAlt: boolean } {
  const images = doc.querySelectorAll('img');
  const totalImages = images.length;
  
  let imagesWithAlt = 0;
  
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    if (alt !== null && alt.trim().length > 0) {
      imagesWithAlt++;
    }
  });
  
  return {
    totalImages,
    imagesWithAlt,
    allHaveAlt: totalImages === imagesWithAlt
  };
}

/**
 * Check if images have responsive styling
 * @param doc - The document to check
 * @returns Object with total images and images with responsive classes
 */
export function checkResponsiveImages(doc: Document): { totalImages: number; responsiveImages: number; allResponsive: boolean } {
  const images = doc.querySelectorAll('img');
  const totalImages = images.length;
  
  let responsiveImages = 0;
  
  images.forEach(img => {
    const className = img.getAttribute('class') || '';
    const style = img.getAttribute('style') || '';
    
    // Check for common responsive patterns
    const hasResponsiveClass = className.includes('w-full') || 
                               className.includes('max-w') || 
                               className.includes('responsive');
    const hasResponsiveStyle = style.includes('max-width') || 
                               style.includes('width: 100%');
    
    if (hasResponsiveClass || hasResponsiveStyle) {
      responsiveImages++;
    }
  });
  
  return {
    totalImages,
    responsiveImages,
    allResponsive: totalImages === 0 || totalImages === responsiveImages
  };
}

/**
 * Extract text content from an element
 * @param doc - The document to search
 * @param selector - CSS selector for the element
 * @returns Text content or null if not found
 */
export function getTextContent(doc: Document, selector: string): string | null {
  const element = doc.querySelector(selector);
  return element ? element.textContent : null;
}

/**
 * Check if text appears in document
 * @param doc - The document to search
 * @param text - Text to search for
 * @returns true if text is found
 */
export function containsText(doc: Document, text: string): boolean {
  return doc.body.textContent?.includes(text) ?? false;
}
