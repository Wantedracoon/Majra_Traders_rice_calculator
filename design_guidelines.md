# Design Guidelines for Majra Traders Rice Pricing Calculator

## Design Approach
**Design System Approach**: Using a utility-focused design system (Material Design or similar) given the application's primary purpose as a productivity tool for sales calculations with data-heavy displays.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 220 15% 25% (Professional navy blue)
- Dark Mode: 220 15% 15% (Deep navy)

**Accent Colors:**
- Success: 142 76% 36% (Green for positive calculations)
- Warning: 38 92% 50% (Amber for alerts)
- Background: 220 14% 96% (Light) / 220 15% 8% (Dark)

### B. Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: font-semibold, text-xl to text-3xl
- **Body**: font-medium, text-sm to text-base
- **Numbers/Calculations**: font-mono for precise alignment

### C. Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 8, 12
- Form spacing: p-4, gap-4
- Section margins: mb-8, mt-8
- Component padding: p-2, p-4

### D. Component Library

**Login Screen:**
- Centered card with company branding
- Simple two-field form (ID/Password)
- Clean button styling with primary color

**Main Calculator Interface:**
- Header with company name and logout option
- Two-column layout: Input form (left) and Results (right)
- Tabbed interface for Poland vs Western Europe calculations

**Input Form:**
- Single price input field with USD label
- Distance calculator with slider or number input
- Clear "Calculate" button

**Results Display:**
- Professional data tables with alternating row colors
- Currency symbols clearly displayed
- Grouped sections: CIF prices, DDP prices
- Responsive cards on mobile devices

**Key UI Elements:**
- Clean form inputs with proper labels
- Professional buttons with subtle shadows
- Data tables with clear headers and borders
- Loading states for currency conversion
- Success/error states for calculations

### E. Layout Structure
1. **Authentication**: Simple centered login form
2. **Dashboard**: Header + two-panel layout (input/results)
3. **Mobile**: Stacked layout with collapsible sections

### F. Functionality Focus
- Real-time calculation updates
- Clear visual hierarchy for different price types
- Professional appearance suitable for B2B sales use
- Efficient data entry workflow
- Export/print-friendly result formatting

**No Images Required**: This is a pure utility application focused on calculations and data display.