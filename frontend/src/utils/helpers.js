/**
 * Converts text to URL-friendly slug
 * @param {string} text - Input text to convert
 * @returns {string} URL-safe slug
 */
export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start
      .replace(/-+$/, '');            // Trim - from end
  }
  
  /**
   * Extracts metadata from shop URL
   * @param {string} slug - Full shop slug from URL
   * @returns {Object} Parsed components
   */
  export function parseShopSlug(slug) {
    const parts = slug.split('-');
    const idFragment = parts.pop();
    const location = parts.pop();
    const name = parts.join('-');
    
    return { name, location, idFragment };
  }