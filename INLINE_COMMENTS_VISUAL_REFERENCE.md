# Inline Comments - Visual Reference

This document provides a visual guide to the inline commenting system's UI components and interactions.

## Component Overview

### 1. Comment Icon (Desktop)

```
┌────────────────────────────────────────────┐
│                                             │
│  💬 ← This is a paragraph with a comment   │
│     icon that appears on hover.             │
│                                             │
│     Icon shows in left margin (default).    │
│     Fades in smoothly on paragraph hover.   │
│                                             │
└────────────────────────────────────────────┘

States:
- Hidden (default)
- Visible (on paragraph hover)
- Hover (icon grows slightly, changes color)
- Focus (keyboard navigation, outline visible)
- Has comments (shows count badge)
```

**With Comment Count:**
```
┌────────────────────────────────────────────┐
│                                             │
│  💬³ ← This paragraph has 3 comments        │
│     Badge shows number of comments          │
│                                             │
└────────────────────────────────────────────┘
```

### 2. Comment Icon (Mobile)

```
┌────────────────────────────────┐
│                                 │
│  💬 This is a paragraph with    │
│  a comment icon that is always  │
│  visible on mobile devices.     │
│                                 │
│  Tap the icon to open modal.   │
│                                 │
└────────────────────────────────┘

Always visible (not hidden)
Positioned inline with text
Touch-optimized size
```

### 3. Paragraph with Comments (Highlighted)

```
┌────────────────────────────────────────────┐
│                                             │
┃  💬³ This paragraph has comments!           ┃
┃     It gets a blue left border and          ┃
┃     subtle background highlight.            ┃
│                                             │
└────────────────────────────────────────────┘
      ↑
   Blue border (3px solid)
   Subtle blue background gradient
```

### 4. Inline Comment Popover (Desktop)

```
Paragraph text here...  →  ┌─────────────────────────────┐
                           │ Comment on this paragraph  ✕ │
                           ├─────────────────────────────┤
                           │                             │
                           │ 👤 John Doe - 2h ago        │
                           │ Great point! I agree with   │
                           │ your analysis here.         │
                           │                             │
                           │ 👤 Jane Smith - 1h ago      │
                           │ Could you elaborate on      │
                           │ this section?               │
                           │                             │
                           ├─────────────────────────────┤
                           │                             │
                           │ ┌─────────────────────────┐ │
                           │ │ Add your comment...     │ │
                           │ │                         │ │
                           │ └─────────────────────────┘ │
                           │                             │
                           │   [Cancel]   [💬 Comment]   │
                           │                             │
                           └─────────────────────────────┘
                            ◀ Arrow points to paragraph

Width: 380px (default)
Position: Right of paragraph (auto-flips if needed)
Shadow: Large drop shadow
Animation: Fade in + slide
```

### 5. Inline Comment Modal (Mobile)

```
Full width modal from bottom:

┌─────────────────────────────────────────┐
│                 Screen                   │
│                                          │
│  Overlay (semi-transparent black)        │
│  ↓ Tap to close                          │
│  ▼                                       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Comment on this paragraph           ✕   │ ← Header
├─────────────────────────────────────────┤
│                                          │
│ 👤 John Doe - 2h ago                     │
│ Great point! I agree with your           │
│ analysis here.                           │
│                                          │
│ 👤 Jane Smith - 1h ago                   │
│ Could you elaborate on this section?     │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Add your comment...                │  │
│ │                                    │  │
│ └────────────────────────────────────┘  │
│                                          │
│    [Cancel]            [💬 Comment]      │
│                                          │
└─────────────────────────────────────────┘
         ↑
    Slides up from bottom
    Rounded top corners
    Max height: 80vh
    Scrollable content
```

### 6. Comment Citation in Comments Section

```
Regular comment:
┌────────────────────────────────────────┐
│ 👤 User Name - 3h ago                  │
│ This is a regular comment on the post. │
└────────────────────────────────────────┘

Inline comment citation:
┌────────────────────────────────────────┐
│ 👤 User Name - 2h ago                  │
│                                        │
│ 📌 Commented on paragraph:             │ ← Citation header
│ ┌────────────────────────────────────┐ │
│ │ "This is the first 200 characters  │ │ ← Quoted paragraph
│ │  of the paragraph being commented  │ │
│ │  on. The text is shown in italic   │ │
│ │  with a gray background..."        │ │
│ │                                    │ │
│ │  View in context ↗                 │ │ ← Deep link
│ └────────────────────────────────────┘ │
│                                        │
│ This is the actual comment text that   │ ← Comment body
│ the user wrote about that paragraph.   │
└────────────────────────────────────────┘
      ↑
   Blue left border (4px solid)
   Subtle gradient background
```

### 7. Flash Highlight Animation

When clicking "View in context" link:

```
Step 1: Scroll to paragraph
┌────────────────────────────────────────┐
│  Smooth scroll animation...            │
└────────────────────────────────────────┘

Step 2: Flash highlight
┌────────────────────────────────────────┐
│  💬 Target paragraph briefly flashes   │ ← Bright highlight
│     with a bright blue background      │
└────────────────────────────────────────┘
         ↓ (2 seconds)
┌────────────────────────────────────────┐
│  💬 Highlight fades back to normal     │ ← Fades out
└────────────────────────────────────────┘

Step 3: Popover opens
┌────────────────────────────────────────┐
│  💬 Paragraph text...  →  [Popover]    │
└────────────────────────────────────────┘
```

## Color Scheme

### Light Mode

```
Icon color:           #64748b (gray)
Icon hover:           #2563eb (blue)
Border (has-comments): #2563eb (blue)
Background highlight:  rgba(37, 99, 235, 0.05) (light blue)
Popover background:    #ffffff (white)
Popover border:        #e2e8f0 (light gray)
Text:                  #1e293b (dark)
Muted text:            #64748b (gray)
```

### Dark Mode

```
Icon color:           #94a3b8 (light gray)
Icon hover:           #2563eb (blue)
Border (has-comments): #2563eb (blue)
Background highlight:  rgba(37, 99, 235, 0.1) (light blue)
Popover background:    #0f172a (dark blue-gray)
Popover border:        #334155 (gray)
Text:                  #f1f5f9 (light)
Muted text:            #94a3b8 (light gray)
```

## Spacing and Typography

```
Comment Icon:
- Size: 16×16px
- Position: -2rem from left edge (desktop)
- Margin: 0.5rem from paragraph top
- Count badge: 16×16px circle, 10px font

Popover:
- Width: 380px (desktop), 100% (mobile)
- Padding: 1rem (16px)
- Border radius: 0.75rem (12px)
- Shadow: Large (0 10px 15px rgba)

Typography:
- Popover title: 1rem (16px), semibold
- Comment author: 0.875rem (14px), medium
- Comment body: 0.875rem (14px), regular
- Comment date: 0.75rem (12px), regular
- Form hint: 0.75rem (12px), regular
```

## Interactive States

### Button States

```
Primary Button (Comment):
┌─────────────────┐
│ 💬 Comment      │  ← Default (blue)
└─────────────────┘

┌─────────────────┐
│ 💬 Comment      │  ← Hover (darker blue)
└─────────────────┘

┌─────────────────┐
│ ⟳ Posting...    │  ← Loading (disabled)
└─────────────────┘

Secondary Button (Cancel):
┌─────────────────┐
│ Cancel          │  ← Default (transparent)
└─────────────────┘

┌─────────────────┐
│ Cancel          │  ← Hover (blue background)
└─────────────────┘
```

### Input States

```
Textarea (Default):
┌──────────────────────────────┐
│ Add your comment...          │
│                              │
│                              │
└──────────────────────────────┘

Textarea (Focus):
┌══════════════════════════════┐ ← Blue border + shadow
│ Add your comment...          │
│                              │
│                              │
└══════════════════════════════┘

Textarea (Error):
┌──────────────────────────────┐ ← Red border
│ Add your comment...          │
│ ⚠ This field is required     │
└──────────────────────────────┘
```

## Responsive Breakpoints

```
Desktop (≥768px):
- Icons on hover only
- Popover positioned next to paragraph
- Max width 380px
- Arrow pointing to paragraph

Mobile (<768px):
- Icons always visible
- Full-width modal from bottom
- Rounded top corners
- No arrow
- Overlay behind modal
```

## Animation Timeline

### Opening Popover (Desktop)

```
0ms:   opacity: 0, translateY(-10px)
       [Popover invisible, slightly above]

10ms:  Class 'open' added
       [Trigger animation]

250ms: opacity: 1, translateY(0)
       [Popover fades in and slides down]
       [Focus on textarea]
```

### Opening Modal (Mobile)

```
0ms:   translateY(100%)
       [Modal off-screen below]

10ms:  Class 'open' added
       Overlay fades in

300ms: translateY(0)
       [Modal slides up]
       [Focus on textarea]
```

### Flash Highlight

```
0ms:   background: transparent

1000ms: background: rgba(37, 99, 235, 0.15)
        [Peak highlight]

2000ms: background: transparent
        [Fade back to normal]
```

## Keyboard Navigation

```
Tab order:
1. Comment icon (role="button")
   - Press Enter or Space to activate
   ↓
2. Popover close button (×)
   - Press Enter to close
   ↓
3. Textarea
   - Type comment
   ↓
4. Cancel button
   - Press Enter to cancel
   ↓
5. Comment button
   - Press Enter to submit

Press Escape at any time → Close popover
```

## Accessibility Features

```
Comment Icon:
- role="button"
- aria-label="Comment on this paragraph"
- tabindex="0"
- Keyboard activatable

Count Badge:
- aria-live="polite" (announces changes)
- Visually hidden "comments" label for screen readers

Popover:
- role="dialog"
- aria-modal="true"
- aria-labelledby="popover-title"
- Focus trap (can't tab outside)

Form:
- Label for textarea (visually hidden)
- aria-required="true"
- aria-describedby for hints
- aria-live for error messages
```

## Print Styles

```
When printing:
- Comment icons: hidden
- Popovers: hidden
- Has-comments indicator: black border (not blue)
- Background highlights: removed
- Citations: preserved (with page break protection)
```

## Edge Cases

### Popover Near Viewport Edge

```
Default (space on right):
Paragraph → [Popover]

Near right edge:
[Popover] ← Paragraph  (flips to left)

Near top:
Paragraph
   ↓
[Popover]  (shifts down)

Near bottom:
[Popover]
   ↑
Paragraph  (shifts up)
```

### Long Comments

```
Popover with many comments:
┌─────────────────────────┐
│ Comment 1               │
│ Comment 2               │ ← Scrollable
│ Comment 3               │    area
│ ...                     │
│ Comment 10              │
└─────────────────────────┘
       ↕
Max height: 400px (desktop)
            calc(80vh - 80px) (mobile)
```

### No Comments Yet

```
┌─────────────────────────────┐
│ Comment on this paragraph  ✕│
├─────────────────────────────┤
│                             │
│  ℹ️ Be the first to comment │ ← Empty state
│     on this paragraph.      │
│                             │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ Add your comment...     │ │
│ └─────────────────────────┘ │
│   [Cancel]   [💬 Comment]   │
└─────────────────────────────┘
```

### Loading State

```
┌─────────────────────────────┐
│ Comment on this paragraph  ✕│
├─────────────────────────────┤
│                             │
│          ⟳                  │ ← Spinning loader
│    Loading comments...      │
│                             │
└─────────────────────────────┘
```

### Error State

```
┌─────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │ Add your comment...     │ │
│ └─────────────────────────┘ │
│   [Cancel]   [💬 Comment]   │
├─────────────────────────────┤
│ ⚠️ Failed to post comment.  │ ← Error message
│    Please try again.        │    (red background)
└─────────────────────────────┘
```

## Code Examples

### HTML Structure (Auto-generated by JS)

```html
<!-- Paragraph with comment icon -->
<p class="commentable-paragraph has-comments" data-para-id="p5">
  <span class="para-comment-icon" data-target-para="p5" role="button" tabindex="0">
    <svg class="icon-comment">...</svg>
    <span class="comment-count" data-count="3">3</span>
  </span>
  This is the paragraph text that can be commented on.
</p>

<!-- Popover (created dynamically) -->
<div class="inline-comment-popover open" data-para-id="p5" role="dialog">
  <div class="popover-header">
    <h4 class="popover-title">Comment on this paragraph</h4>
    <button class="popover-close">×</button>
  </div>
  <div class="popover-body">
    <div class="existing-comments">...</div>
    <div class="new-comment-form">...</div>
  </div>
  <div class="popover-arrow"></div>
</div>
```

### CSS Example

```scss
// Paragraph with comments
.commentable-paragraph.has-comments {
  border-left: 3px solid var(--color-primary);
  padding-left: 1rem;
  background: linear-gradient(
    to right,
    rgba(37, 99, 235, 0.05) 0%,
    transparent 100%
  );
}

// Comment icon
.para-comment-icon {
  position: absolute;
  left: -2rem;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover {
    color: var(--color-primary);
    transform: scale(1.1);
  }
}

// Show icon on paragraph hover
.commentable-paragraph:hover .para-comment-icon {
  opacity: 1;
}
```

## Summary

This visual reference covers:
- ✅ All UI components and states
- ✅ Desktop and mobile layouts
- ✅ Light and dark mode colors
- ✅ Animations and transitions
- ✅ Interactive states
- ✅ Accessibility features
- ✅ Edge cases and error states
- ✅ Code structure examples

Use this as a reference when customizing or troubleshooting the inline commenting system!
