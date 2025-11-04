/**
 * Paragraph Citation Links
 * Simple YouTube-style timestamp linking for blog paragraphs
 *
 * Features:
 * - Auto-assign IDs to paragraphs
 * - Copy link to clipboard
 * - Deep linking with smooth scroll
 * - Highlight animation
 */

(function() {
  'use strict';

  const CONFIG = {
    selectors: {
      postContent: '.post-content',
      citableElements: 'h2, h3, h4, h5, h6'  // Target section headings
    }
  };

  const state = {
    paragraphs: new Map()
  };

  // ============================================================================
  // Initialization
  // ============================================================================

  function init() {
    const postContent = document.querySelector(CONFIG.selectors.postContent);
    if (!postContent) return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initParagraphLinks);
    } else {
      initParagraphLinks();
    }
  }

  function initParagraphLinks() {
    console.log('[Paragraph Links] Initializing...');

    // Assign IDs to paragraphs
    assignParagraphIds();

    // Add link icons
    addLinkIcons();

    // Handle deep links from URL
    handleDeepLink();

    console.log('[Paragraph Links] Initialized successfully');
  }

  // ============================================================================
  // Paragraph ID Assignment
  // ============================================================================

  function assignParagraphIds() {
    const postContent = document.querySelector(CONFIG.selectors.postContent);
    if (!postContent) return;

    const elements = postContent.querySelectorAll(CONFIG.selectors.citableElements);
    let sectionIndex = 1;

    elements.forEach((element) => {
      // Use existing ID if present, otherwise create new one
      let sectionId = element.id;

      if (!sectionId) {
        sectionId = `section-${sectionIndex}`;
        element.id = sectionId;
        sectionIndex++;
      }

      element.classList.add('citable-section');

      // Store in state
      state.paragraphs.set(sectionId, element);
    });

    console.log(`[Paragraph Links] Assigned IDs to ${elements.length} sections`);
  }

  // ============================================================================
  // Link Icons
  // ============================================================================

  function addLinkIcons() {
    state.paragraphs.forEach((element, elementId) => {
      // Create link icon
      const icon = document.createElement('button');
      icon.className = 'para-link-icon';
      icon.setAttribute('aria-label', 'Copy link to this section');
      icon.setAttribute('data-para-id', elementId);
      icon.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
        </svg>
      `;

      // Add click handler
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        copyParagraphLink(elementId, icon);
      });

      // Insert icon at the beginning (left side)
      element.prepend(icon);
    });
  }

  // ============================================================================
  // Copy to Clipboard
  // ============================================================================

  function copyParagraphLink(paraId, iconElement) {
    // Build URL with fragment
    const url = `${window.location.origin}${window.location.pathname}#${paraId}`;

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      showCopySuccess(iconElement);
    }).catch((err) => {
      console.error('[Paragraph Links] Failed to copy:', err);
      // Fallback: show URL in alert
      prompt('Copy this link:', url);
    });
  }

  function showCopySuccess(iconElement) {
    // Change icon temporarily
    const originalHTML = iconElement.innerHTML;
    iconElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
      </svg>
    `;
    iconElement.classList.add('copied');

    // Show tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Link copied!';
    iconElement.appendChild(tooltip);

    // Reset after delay
    setTimeout(() => {
      iconElement.innerHTML = originalHTML;
      iconElement.classList.remove('copied');
    }, 2000);
  }

  // ============================================================================
  // Deep Linking
  // ============================================================================

  function handleDeepLink() {
    const hash = window.location.hash;
    if (!hash) return;

    const sectionId = hash.substring(1);

    // Only handle if it's one of our tracked sections
    if (state.paragraphs.has(sectionId)) {
      scrollToParagraph(sectionId);
    }
  }

  function scrollToParagraph(paraId) {
    const paragraph = state.paragraphs.get(paraId);
    if (!paragraph) return;

    // Smooth scroll
    paragraph.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Highlight animation
    paragraph.classList.add('highlight-flash');
    setTimeout(() => {
      paragraph.classList.remove('highlight-flash');
    }, 2000);
  }

  // ============================================================================
  // Start
  // ============================================================================

  init();

})();
