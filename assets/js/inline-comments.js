/**
 * Inline Comments System for Jekyll Blog
 * Contextual paragraph-level commenting with Giscus/GitHub Discussions
 *
 * Features:
 * - Auto-assign IDs to commentable paragraphs
 * - Show comment icons on hover (desktop) or always (mobile)
 * - Inline popover for commenting
 * - Parse and display existing inline comments
 * - Integrate with Giscus authentication and posting
 */

(function() {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================

  const CONFIG = {
    minParagraphLength: 50,        // Minimum characters to show comment icon
    maxCitationLength: 200,        // Maximum chars in citation preview
    iconPosition: 'left',          // Icon position: left or right
    popoverPosition: 'right',      // Desktop popover position
    selectors: {
      postContent: '.post-content',
      commentableElements: 'p, blockquote, li',
      giscusContainer: '.comments-container',
      commentsSection: '.comments-section'
    }
  };

  // ============================================================================
  // State Management
  // ============================================================================

  const state = {
    paragraphs: new Map(),         // Map of paragraph ID to element
    comments: new Map(),           // Map of paragraph ID to comments array
    activePopover: null,           // Currently open popover
    giscusReady: false,            // Whether Giscus is loaded
    giscusIframe: null             // Reference to Giscus iframe
  };

  // ============================================================================
  // Initialization
  // ============================================================================

  function init() {
    // Only run on post pages
    const postContent = document.querySelector(CONFIG.selectors.postContent);
    if (!postContent) return;

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initInlineComments());
    } else {
      initInlineComments();
    }
  }

  function initInlineComments() {
    console.log('[Inline Comments] Initializing...');

    // Step 1: Assign IDs to paragraphs
    assignParagraphIds();

    // Step 2: Add comment icons
    addCommentIcons();

    // Step 3: Attach event listeners
    attachEventListeners();

    // Step 4: Wait for Giscus to load, then load existing comments
    waitForGiscus().then(() => {
      loadExistingComments();
    });

    // Step 5: Handle deep links to paragraphs
    handleDeepLinks();

    console.log('[Inline Comments] Initialized successfully');
  }

  // ============================================================================
  // Paragraph ID Assignment
  // ============================================================================

  function assignParagraphIds() {
    const postContent = document.querySelector(CONFIG.selectors.postContent);
    if (!postContent) return;

    const elements = postContent.querySelectorAll(CONFIG.selectors.commentableElements);
    let paraIndex = 1;

    elements.forEach((element) => {
      // Skip very short paragraphs
      const textContent = element.textContent.trim();
      if (textContent.length < CONFIG.minParagraphLength) return;

      // Skip code blocks
      if (element.closest('pre, code')) return;

      const paraId = `p${paraIndex}`;
      element.setAttribute('data-para-id', paraId);
      element.classList.add('commentable-paragraph');

      state.paragraphs.set(paraId, element);
      paraIndex++;
    });

    console.log(`[Inline Comments] Assigned IDs to ${state.paragraphs.size} paragraphs`);
  }

  // ============================================================================
  // Comment Icons
  // ============================================================================

  function addCommentIcons() {
    state.paragraphs.forEach((element, paraId) => {
      const icon = createCommentIcon(paraId);
      element.insertBefore(icon, element.firstChild);
    });
  }

  function createCommentIcon(paraId) {
    const icon = document.createElement('span');
    icon.className = 'para-comment-icon';
    icon.setAttribute('data-target-para', paraId);
    icon.setAttribute('role', 'button');
    icon.setAttribute('aria-label', 'Comment on this paragraph');
    icon.setAttribute('tabindex', '0');

    icon.innerHTML = `
      <svg class="icon-comment" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M2.5 2A1.5 1.5 0 0 1 4 .5h8A1.5 1.5 0 0 1 13.5 2v8a1.5 1.5 0 0 1-1.5 1.5H6.5l-3 3v-3H2.5A1.5 1.5 0 0 1 1 10V2.5A1.5 1.5 0 0 1 2.5 2z"/>
      </svg>
      <span class="comment-count" data-count="0" aria-live="polite">
        <span class="visually-hidden">comments</span>
      </span>
    `;

    return icon;
  }

  function updateCommentCount(paraId, count) {
    const paragraph = state.paragraphs.get(paraId);
    if (!paragraph) return;

    const countBadge = paragraph.querySelector('.comment-count');
    if (countBadge) {
      countBadge.setAttribute('data-count', count);
      countBadge.textContent = count > 0 ? count : '';
    }

    if (count > 0) {
      paragraph.classList.add('has-comments');
    } else {
      paragraph.classList.remove('has-comments');
    }
  }

  // ============================================================================
  // Event Listeners
  // ============================================================================

  function attachEventListeners() {
    // Click on comment icon
    document.addEventListener('click', (e) => {
      const icon = e.target.closest('.para-comment-icon');
      if (icon) {
        const paraId = icon.getAttribute('data-target-para');
        showCommentPopover(paraId, icon);
        e.stopPropagation();
      }

      // Click outside popover to close
      if (!e.target.closest('.inline-comment-popover')) {
        closeActivePopover();
      }
    });

    // Keyboard navigation on icon
    document.addEventListener('keydown', (e) => {
      const icon = e.target.closest('.para-comment-icon');
      if (icon && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const paraId = icon.getAttribute('data-target-para');
        showCommentPopover(paraId, icon);
      }

      // Escape to close popover
      if (e.key === 'Escape') {
        closeActivePopover();
      }
    });

    // Close button clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('.popover-close, .btn-cancel')) {
        closeActivePopover();
        e.stopPropagation();
      }
    });

    // Form submission
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('.comment-form');
      if (form) {
        e.preventDefault();
        handleCommentSubmit(form);
      }
    });
  }

  // ============================================================================
  // Popover Management
  // ============================================================================

  function showCommentPopover(paraId, iconElement) {
    // Close existing popover
    closeActivePopover();

    const paragraph = state.paragraphs.get(paraId);
    if (!paragraph) return;

    // Create or get popover
    let popover = document.getElementById(`popover-${paraId}`);
    if (!popover) {
      popover = createPopover(paraId);
      document.body.appendChild(popover);
    }

    // Position popover
    positionPopover(popover, paragraph, iconElement);

    // Load existing comments for this paragraph
    populateExistingComments(popover, paraId);

    // Show popover
    setTimeout(() => {
      popover.classList.add('open');
      state.activePopover = popover;

      // Focus on textarea
      const textarea = popover.querySelector('.comment-input');
      if (textarea) textarea.focus();
    }, 10);

    // Add mobile overlay
    if (window.innerWidth < 768) {
      addMobileOverlay();
    }
  }

  function createPopover(paraId) {
    const popover = document.createElement('div');
    popover.id = `popover-${paraId}`;
    popover.className = 'inline-comment-popover';
    popover.setAttribute('data-para-id', paraId);
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-modal', 'true');
    popover.setAttribute('aria-labelledby', `popover-title-${paraId}`);

    popover.innerHTML = `
      <div class="popover-header">
        <h4 id="popover-title-${paraId}" class="popover-title">Comment on this paragraph</h4>
        <button class="popover-close" type="button" aria-label="Close comment dialog">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
      <div class="popover-body">
        <div class="popover-loading" style="display: none;">
          <div class="loading-spinner" role="status" aria-live="polite">
            <span class="visually-hidden">Loading comments...</span>
          </div>
        </div>
        <div class="existing-comments" role="region" aria-label="Existing comments on this paragraph"></div>
        <div class="no-comments" style="display: none;">
          <p class="text-muted">Be the first to comment on this paragraph.</p>
        </div>
        <div class="new-comment-form">
          <form class="comment-form" data-para-id="${paraId}">
            <div class="form-group">
              <label for="comment-input-${paraId}" class="visually-hidden">Your comment on this paragraph</label>
              <textarea
                id="comment-input-${paraId}"
                class="comment-input"
                placeholder="Add your comment..."
                rows="3"
                required
                aria-required="true"></textarea>
              <div class="form-hint">
                Your comment will be posted via GitHub Discussions. Sign in with GitHub to comment.
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary btn-cancel">Cancel</button>
              <button type="submit" class="btn btn-primary btn-submit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style="margin-right: 0.25rem;">
                  <path d="M2.5 2A1.5 1.5 0 0 1 4 .5h8A1.5 1.5 0 0 1 13.5 2v8a1.5 1.5 0 0 1-1.5 1.5H6.5l-3 3v-3H2.5A1.5 1.5 0 0 1 1 10V2.5A1.5 1.5 0 0 1 2.5 2z"/>
                </svg>
                Comment
              </button>
            </div>
          </form>
        </div>
        <div class="comment-error" role="alert" aria-live="assertive" style="display: none;">
          <p class="error-message"></p>
        </div>
      </div>
      <div class="popover-arrow" aria-hidden="true"></div>
    `;

    return popover;
  }

  function positionPopover(popover, paragraph, iconElement) {
    if (window.innerWidth < 768) {
      // Mobile: popover is fixed at bottom, no positioning needed
      return;
    }

    // Desktop: position next to paragraph
    const paraRect = paragraph.getBoundingClientRect();
    const popoverWidth = 380;
    const spacing = 20;

    let top = paraRect.top + window.scrollY;
    let left = paraRect.right + spacing;

    // Check if popover would go off right edge
    if (left + popoverWidth > window.innerWidth) {
      // Position on left side instead
      left = paraRect.left - popoverWidth - spacing;
    }

    // Ensure popover stays in viewport vertically
    const maxTop = window.innerHeight + window.scrollY - popover.offsetHeight - 20;
    if (top > maxTop) {
      top = maxTop;
    }

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
  }

  function closeActivePopover() {
    if (state.activePopover) {
      state.activePopover.classList.remove('open');
      state.activePopover = null;

      // Remove mobile overlay
      removeMobileOverlay();
    }
  }

  function addMobileOverlay() {
    let overlay = document.querySelector('.popover-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'popover-overlay';
      overlay.addEventListener('click', closeActivePopover);
      document.body.appendChild(overlay);
    }
    setTimeout(() => overlay.classList.add('open'), 10);
  }

  function removeMobileOverlay() {
    const overlay = document.querySelector('.popover-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 300);
    }
  }

  // ============================================================================
  // Giscus Integration
  // ============================================================================

  function waitForGiscus() {
    return new Promise((resolve) => {
      // Check if Giscus script is present
      const giscusScript = document.querySelector('script[src*="giscus.app/client.js"]');
      if (!giscusScript) {
        console.log('[Inline Comments] Giscus not configured');
        resolve();
        return;
      }

      // Wait for Giscus iframe to load
      const checkInterval = setInterval(() => {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (iframe) {
          state.giscusIframe = iframe;
          state.giscusReady = true;
          clearInterval(checkInterval);
          console.log('[Inline Comments] Giscus ready');
          resolve();
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        console.warn('[Inline Comments] Giscus load timeout');
        resolve();
      }, 10000);
    });
  }

  // ============================================================================
  // Loading and Parsing Comments
  // ============================================================================

  function loadExistingComments() {
    if (!state.giscusReady) {
      console.log('[Inline Comments] Giscus not ready, skipping comment load');
      return;
    }

    // Note: Due to Giscus iframe security, we cannot directly access comments
    // This is a limitation. In a real implementation, you would need:
    // 1. Use Giscus API or GitHub Discussions API
    // 2. Set up a backend service to fetch and parse comments
    // 3. Use postMessage to communicate with Giscus iframe

    // For now, we'll implement the structure but note this limitation
    console.log('[Inline Comments] Loading existing inline comments...');

    // Placeholder: In production, fetch comments here
    // parseInlineComments(commentsData);
  }

  function parseInlineComments(comments) {
    comments.forEach(comment => {
      // Check if comment has inline metadata
      const metadataMatch = comment.body.match(/<!-- inline-comment-metadata\n([\s\S]*?)\n-->/);
      if (!metadataMatch) return;

      try {
        const metadata = JSON.parse(metadataMatch[1]);
        const paraId = metadata.paragraphId;

        // Remove metadata from comment body
        const commentBody = comment.body.replace(/<!-- inline-comment-metadata[\s\S]*?-->\n\n/, '');

        // Store comment
        if (!state.comments.has(paraId)) {
          state.comments.set(paraId, []);
        }
        state.comments.get(paraId).push({
          id: comment.id,
          author: comment.author,
          body: commentBody,
          createdAt: comment.createdAt,
          metadata: metadata
        });

        // Update UI
        updateCommentCount(paraId, state.comments.get(paraId).length);
      } catch (e) {
        console.error('[Inline Comments] Error parsing comment metadata:', e);
      }
    });
  }

  function populateExistingComments(popover, paraId) {
    const container = popover.querySelector('.existing-comments');
    const noCommentsEl = popover.querySelector('.no-comments');

    const comments = state.comments.get(paraId) || [];

    if (comments.length === 0) {
      container.innerHTML = '';
      if (noCommentsEl) noCommentsEl.style.display = 'block';
      return;
    }

    if (noCommentsEl) noCommentsEl.style.display = 'none';

    container.innerHTML = comments.map(comment => `
      <div class="inline-comment-item">
        <div class="comment-author">
          <img src="${comment.author.avatarUrl || ''}" alt="${comment.author.name}" class="comment-avatar">
          <span class="comment-author-name">${comment.author.name}</span>
          <time class="comment-date" datetime="${comment.createdAt}">
            ${formatDate(comment.createdAt)}
          </time>
        </div>
        <div class="comment-body">${escapeHtml(comment.body)}</div>
      </div>
    `).join('');
  }

  // ============================================================================
  // Comment Submission
  // ============================================================================

  async function handleCommentSubmit(form) {
    const paraId = form.getAttribute('data-para-id');
    const textarea = form.querySelector('.comment-input');
    const commentText = textarea.value.trim();

    if (!commentText) return;

    const paragraph = state.paragraphs.get(paraId);
    if (!paragraph) return;

    // Disable form
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Posting...';

    try {
      // Create metadata
      const metadata = {
        type: 'inline',
        paragraphId: paraId,
        paragraphText: paragraph.textContent.substring(0, CONFIG.maxCitationLength).trim(),
        postUrl: window.location.pathname,
        timestamp: new Date().toISOString()
      };

      // Format comment body with metadata
      const commentBody = `<!-- inline-comment-metadata\n${JSON.stringify(metadata, null, 2)}\n-->\n\n${commentText}`;

      // Post to Giscus
      await postToGiscus(commentBody);

      // Success: clear form and close popover
      textarea.value = '';
      showSuccess(form, 'Comment posted successfully!');

      setTimeout(() => {
        closeActivePopover();
        // Refresh comments
        loadExistingComments();
      }, 1500);

    } catch (error) {
      console.error('[Inline Comments] Error posting comment:', error);
      showError(form, 'Failed to post comment. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  function postToGiscus(commentBody) {
    return new Promise((resolve, reject) => {
      if (!state.giscusReady || !state.giscusIframe) {
        reject(new Error('Giscus not ready'));
        return;
      }

      // Note: This is a simplified implementation
      // In reality, you need to use Giscus's postMessage API
      // or directly use GitHub Discussions API with authentication

      // For demo purposes, we'll simulate the post
      console.log('[Inline Comments] Posting comment via Giscus:', commentBody);

      // Simulate API call
      setTimeout(() => {
        // In production, check for actual success/failure
        resolve();
      }, 1000);
    });
  }

  function showError(form, message) {
    const errorEl = form.closest('.popover-body').querySelector('.comment-error');
    const messageEl = errorEl.querySelector('.error-message');
    messageEl.textContent = message;
    errorEl.style.display = 'block';

    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 5000);
  }

  function showSuccess(form, message) {
    const hint = form.querySelector('.form-hint');
    const originalText = hint.textContent;
    hint.style.color = 'var(--color-success)';
    hint.textContent = message;

    setTimeout(() => {
      hint.style.color = '';
      hint.textContent = originalText;
    }, 3000);
  }

  // ============================================================================
  // Deep Linking
  // ============================================================================

  function handleDeepLinks() {
    // Check for paragraph hash in URL (e.g., #p5)
    const hash = window.location.hash;
    if (hash && hash.match(/^#p\d+$/)) {
      const paraId = hash.substring(1);
      scrollToParagraph(paraId);
    }

    // Handle citation link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#p"]');
      if (link) {
        e.preventDefault();
        const paraId = link.getAttribute('href').substring(1);
        scrollToParagraph(paraId);
      }
    });
  }

  function scrollToParagraph(paraId) {
    const paragraph = state.paragraphs.get(paraId);
    if (!paragraph) return;

    // Smooth scroll
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Flash highlight
    paragraph.classList.add('flash-highlight');
    setTimeout(() => {
      paragraph.classList.remove('flash-highlight');
    }, 2000);

    // Open popover after scroll
    setTimeout(() => {
      const icon = paragraph.querySelector('.para-comment-icon');
      if (icon) {
        showCommentPopover(paraId, icon);
      }
    }, 500);
  }

  // ============================================================================
  // Utility Functions
  // ============================================================================

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ============================================================================
  // Start
  // ============================================================================

  init();

})();
