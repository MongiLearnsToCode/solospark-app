# SoloSpark MVP Design Task List

This document provides a detailed, step-by-step plan for building the UI/UX of the SoloSpark MVP. Each task is small, testable, and focused on a single concern, enabling incremental development and easy validation. The tasks reflect the design philosophy of simplicity and clarity, prioritize mobile-first usability, and meet performance and accessibility goals.

---

## Task List

### 1. Set Up Tailwind CSS with Custom Theme
- **Description**: Configure Tailwind CSS with SoloSpark’s color palette and typography.
- **Steps**:
  - Install Tailwind CSS in the Next.js project.
  - Update `tailwind.config.ts` with custom colors: Amber Gold (`#F59E0B`), Sky Blue (`#0EA5E9`), Indigo (`#6366F1`), Off-White (`#F9FAFB`), Slate Gray (`#475569`).
  - Set font families: Inter (body), Poppins (headings).
  - Define responsive font sizes: base 16px (desktop), 14px (mobile); H1 32px/24px, H2 24px/20px, H3 20px/16px.
- **Test**: Apply a custom color and font to a test component and confirm styles render correctly.

---

### 2. Install and Configure Shadcn UI
- **Description**: Set up Shadcn UI for reusable, customizable components.
- **Steps**:
  - Install Shadcn UI in the Next.js project per its documentation.
  - Initialize Shadcn UI to generate the component library.
- **Test**: Render a Shadcn UI button and verify it displays properly.

---

### 3. Create Global Styles
- **Description**: Define global CSS with Tailwind directives and base styles.
- **Steps**:
  - In `styles/globals.css`, add `@tailwind base`, `@tailwind components`, and `@tailwind utilities`.
  - Set base styles for `body` (Inter, Slate Gray), headings (Poppins), and links (Sky Blue).
- **Test**: Load a test page and check that global styles apply to text and links.

---

### 4. Create Layout Component
- **Description**: Build a reusable layout for consistent page structure.
- **Steps**:
  - Create `components/common/Layout.tsx` with header, main, and footer sections.
  - Apply Tailwind classes for responsive flex or grid layout.
- **Test**: Wrap a test page in the Layout component and ensure all sections appear.

---

### 5. Build Landing Page Structure
- **Description**: Set up the Landing Page’s basic structure.
- **Steps**:
  - In `pages/index.tsx`, use the Layout component.
  - Add Hero, Features, and CTA sections with placeholder content.
- **Test**: Load the page and confirm all three sections render in order.

---

### 6. Style Hero Section
- **Description**: Style the Hero section per the design system.
- **Steps**:
  - Add a Poppins headline and an Amber Gold CTA button.
  - Use Tailwind for layout (e.g., `flex`, `items-center`) and spacing.
- **Test**: Check that the headline and button are styled and positioned correctly.

---

### 7. Add Feature Highlights
- **Description**: Create feature cards for the Features section.
- **Steps**:
  - Use Shadcn UI cards or Tailwind-styled divs.
  - Add Heroicons and placeholder text for each feature.
- **Test**: Verify cards display responsively with icons and text.

---

### 8. Implement CTA Section
- **Description**: Add a styled CTA section to the Landing Page.
- **Steps**:
  - Create an Amber Gold button with microcopy (e.g., “Start Now”).
  - Style with Tailwind for prominence.
- **Test**: Ensure the CTA button stands out and text is readable.

---

### 9. Create Login Page
- **Description**: Build the Login page with a simple form.
- **Steps**:
  - In `pages/auth/login.tsx`, use Shadcn UI for email and password inputs.
  - Add inline validation placeholders (e.g., “Email required”).
- **Test**: Render the page and confirm form fields are present.

---

### 10. Create Signup Page
- **Description**: Build the Signup page with a form.
- **Steps**:
  - In `pages/auth/signup.tsx`, add email, password, and confirmation fields using Shadcn UI.
  - Include inline validation placeholders.
- **Test**: Load the page and check that all fields render correctly.

---

### 11. Set Up Dashboard Layout
- **Description**: Create the Dashboard layout with sidebar and content area.
- **Steps**:
  - In `pages/dashboard.tsx`, use the Layout component.
  - Add a sidebar with links (Home, Calendar, Analytics, Settings) and a main area.
- **Test**: Verify the sidebar and main area display side-by-side on desktop.

---

### 12. Add Create Post Button
- **Description**: Add a prominent “Create Post” button to the Dashboard.
- **Steps**:
  - Use a Shadcn UI button with Amber Gold styling.
  - Place it in the header or main area.
- **Test**: Confirm the button is visible and styled as a primary CTA.

---

### 13. Create PostEditor Component Structure
- **Description**: Set up the PostEditor’s basic form structure.
- **Steps**:
  - In `components/post/PostEditor.tsx`, add fields: caption, media URL, platforms, scheduledAt.
  - Use Shadcn UI for inputs and checkboxes.
- **Test**: Render the component and ensure all fields are visible.

---

### 14. Implement Platform Toggles
- **Description**: Add platform selection toggles to the PostEditor.
- **Steps**:
  - Use Shadcn UI checkboxes for Instagram, X, and LinkedIn.
  - Add logic to require at least one selection.
- **Test**: Toggle platforms and confirm selection works.

---

### 15. Add Platform Previews
- **Description**: Show real-time previews for selected platforms.
- **Steps**:
  - Create preview components for each platform.
  - Update previews based on caption input.
- **Test**: Type in the caption and verify previews reflect changes.

---

### 16. Integrate AI Caption Suggestions
- **Description**: Add a button for AI caption suggestions.
- **Steps**:
  - Add a “Suggest Caption” button in PostEditor.
  - Display mock suggestions on click (e.g., “Boost your reach!”).
- **Test**: Click the button and check that suggestions appear.

---

### 17. Set Up CalendarView Component
- **Description**: Create a calendar for scheduled posts.
- **Steps**:
  - In `components/calendar/CalendarView.tsx`, use `react-big-calendar`.
  - Style with Tailwind CSS.
- **Test**: Render the calendar and confirm it displays.

---

### 18. Implement Drag-and-Drop for Calendar
- **Description**: Add drag-and-drop to reschedule posts.
- **Steps**:
  - Enable drag-and-drop in the calendar library.
  - Add a handler to update post times.
- **Test**: Drag a post and verify the new time is set.

---

### 19. Create AnalyticsDashboard Component
- **Description**: Set up the Analytics layout.
- **Steps**:
  - In `components/analytics/AnalyticsDashboard.tsx`, add placeholders for metrics (e.g., likes).
  - Use Shadcn UI cards.
- **Test**: Render with mock data and check layout.

---

### 20. Add Hover Effects to Buttons
- **Description**: Add hover effects to buttons.
- **Steps**:
  - Apply Tailwind `hover:scale-105` to buttons.
- **Test**: Hover over a button and confirm it scales.

---

### 21. Implement Fade-In Animations
- **Description**: Add fade-in animations for alerts.
- **Steps**:
  - Use Framer Motion for a <300ms fade-in on alerts.
- **Test**: Trigger an alert and verify the animation.

---

### 22. Make Layout Responsive
- **Description**: Ensure layouts work on mobile (<768px).
- **Steps**:
  - Use Tailwind responsive classes to stack elements on mobile.
- **Test**: Check mobile view in dev tools.

---

### 23. Add ARIA Labels and Keyboard Navigation
- **Description**: Improve accessibility.
- **Steps**:
  - Add ARIA labels to buttons and inputs.
  - Test keyboard navigation (e.g., Tab key).
- **Test**: Navigate with keyboard only and verify accessibility.

---

### 24. Implement Lazy Loading for Below-the-Fold Content
- **Description**: Optimize performance with lazy loading.
- **Steps**:
  - Use `next/image` with `loading="lazy"` for images.
- **Test**: Check network tab to confirm lazy loading works.

---

## Notes
- **Consistency**: Use Tailwind and Shadcn UI for all styling.
- **Microcopy**: Add guidance (e.g., “Let’s schedule it!”) where helpful.
- **Performance**: Test Lighthouse scores after major updates.
- **Testing**: Validate each task manually before proceeding.

This plan ensures a focused, testable build process for SoloSpark’s MVP UI/UX.