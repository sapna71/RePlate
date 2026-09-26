# FoodShare - Food Waste Management Platform

FoodShare is a comprehensive food waste management platform that connects food donors with people in need. The application facilitates the reduction of food wastage by enabling donors (individuals, restaurants, and organizations) to share surplus food with receivers through a streamlined, secure, and efficient platform.

## Table of Contents

- [Design System](#design-system)
- [Application Structure](#application-structure)
- [Core Pages](#core-pages)
- [Key Components](#key-components)
- [Feature Modules](#feature-modules)
- [Authentication & User Management](#authentication--user-management)
- [Verification System](#verification-system)
- [Support Infrastructure](#support-infrastructure)
- [UI Components](#ui-components)
- [Styling](#styling)

## Design System

### Color Scheme
FoodShare uses a **dark theme** with orange/coral accents:
- **Background Colors**: `gray-900`, `gray-800`
- **Accent Colors**: `orange-400`, `orange-500`, `orange-600`
- **Text Colors**: White and gray variations for optimal contrast
- **Status Colors**: Green for success, red for urgent/danger

### Typography
Custom typography is defined in `styles/globals.css` with carefully selected font sizes, weights, and line heights for each HTML element. Components should not override these defaults unless specifically required.

## Application Structure

### Main Entry Point
- **`App.tsx`**: The main application component that handles routing, user authentication state, and navigation between different pages. It manages the global application state including user type (donor/receiver), authentication status, and current page rendering.

### File Organization
```
├── components/          # All React components
│   ├── ui/             # ShadCN UI components (buttons, dialogs, forms, etc.)
│   ├── figma/          # Image handling components
│   └── *.tsx           # Feature components
├── guidelines/         # Documentation
├── styles/            # Global CSS and Tailwind configuration
└── App.tsx            # Main application entry
```

## Core Pages

### 1. Landing Page (`LandingPage.tsx`)
The public-facing homepage for unauthenticated users featuring:
- Hero section with call-to-action
- Platform features overview
- Statistics showcase
- How it works section
- Community impact highlights
- Footer with quick links

**Navigation**: `LandingNavigation.tsx` - Simplified navigation for public pages

### 2. Home Page (`HomePage.tsx`)
The authenticated user's dashboard entry point that displays:
- Welcome message
- Quick action cards
- Recent activity overview
- Navigation to donor/receiver dashboards

**Navigation**: `AuthenticatedNavigation.tsx` - Full navigation for logged-in users with user account menu

### 3. Donor Dashboard (`DonorDashboard.tsx`)
Primary interface for food donors featuring:
- **Active Listings Tab**: View and manage current food donations
- **Add New Listing Form**: Create new food donation listings with:
  - Food name and description
  - Category selection (Cooked Food, Packaged Food, Fruits & Vegetables, Bakery, Other)
  - Quantity and unit specification
  - Urgency flag for time-sensitive items
  - Pickup time window
  - Location details
- **Edit Functionality**: Modify existing listings via `FoodListingEditOverlay.tsx`
- **QR Code Generation**: Automatic QR code creation for pickup verification
- Real-time listing status updates

### 4. Receiver Dashboard (`ReceiverDashboard.tsx`)
Primary interface for food receivers featuring:
- **Browse Tab**: Search and filter available food listings
  - Search by food name
  - Filter by category
  - Filter by urgency status
  - Location-based results
- **Food Cards**: Visual display of available food with details
- **Request System**: Book food items with confirmation dialogs
- **Active Requests**: Track ongoing food requests
- Real-time availability updates

### 5. My Profile (`MyProfile.tsx`)
Unified user profile management page with:
- **Personal Information Section**:
  - Name, email, phone number
  - Profile picture upload
  - Account verification status with badge or verification button
- **Address Management**: Location details for pickup/delivery coordination
- **Account Type Display**: Shows donor/receiver status
- **Settings Link**: Quick access to account settings

### 6. Account Settings (`AccountSettings.tsx`)
Comprehensive settings management including:
- **Notification Preferences**:
  - Email notifications toggle
  - SMS alerts toggle
  - Push notifications toggle
- **Privacy Controls**:
  - Profile visibility settings
  - Data sharing preferences
- **Account Management**:
  - Password change
  - Account deactivation option
  - Data export request

### 7. About Page (`AboutPage.tsx`)
Information about the platform featuring:
- Mission and vision statement
- How FoodShare works
- Impact statistics
- Team information
- Partner organizations

## Key Components

### User Type Selection
- **`UserTypeSelection.tsx`**: Main component for selecting donor or receiver role
- **`DonorTypeSelection.tsx`**: Specific selection for donor subcategories (Individual, Restaurant, Organization)
- **`ReceiverTypeSelection.tsx`**: Specific selection for receiver subcategories
- **`UserTypeSelectionFooter.tsx`**: Reusable footer for type selection screens

### Food Management
- **`FoodCard.tsx`**: Reusable card component displaying food listing details including:
  - Food image
  - Name and description
  - Category badge
  - Urgency indicator
  - Quantity and location
  - Action buttons (Request/View Details for receivers, Edit/QR Code for donors)

- **`FoodListingEditOverlay.tsx`**: Modal overlay for editing existing food listings with form validation and real-time updates

### History & Tracking
- **`DonorHistory.tsx`**: Historical record of all donations with:
  - Completed donations list
  - Cancelled donations
  - Donation statistics
  - Receiver feedback

- **`ReceiverHistory.tsx`**: Historical record of all received food with:
  - Completed pickups list
  - Cancelled requests
  - Saved favorites
  - Donation impact metrics

- **`LocationTracker.tsx`**: Real-time location tracking component for:
  - Pickup coordination
  - Distance calculations
  - Map integration
  - Turn-by-turn directions

## Feature Modules

### QR Code Verification System
A robust pickup verification system ensuring secure food transfers:

- **`QRCodeVerification.tsx`**: Main verification flow controller
- **`QRCodeDisplay.tsx`**: Generates and displays QR codes for donors with:
  - Unique QR code per listing
  - 4-digit verification code backup
  - Expiration timer
  - Regeneration capability

- **`QRCodeScanner.tsx`**: Scanner interface for receivers to:
  - Scan QR codes using device camera
  - Enter 4-digit codes manually
  - Validate pickup authorization
  - Confirm successful pickup

**Verification Flow**:
1. Donor creates listing → QR code generated
2. Receiver requests food → Booking confirmed
3. At pickup → Receiver scans QR code or enters 4-digit code
4. System validates → Marks transaction complete
5. Both parties receive confirmation

### Booking & Request System
- **`BookingConfirmationDialog.tsx`**: Confirms receiver's food request with:
  - Food details summary
  - Pickup information
  - Terms acceptance
  - Final confirmation

- **`RequestConfirmationOverlay.tsx`**: Additional confirmation layer for special requests

- **`CancellationPopup.tsx`**: Handles cancellation requests with:
  - Reason selection
  - Confirmation prompt
  - Notification to other party

- **`CancellationConfirmedPopup.tsx`**: Confirms successful cancellation

### Notification System
- **`NotificationPopup.tsx`**: In-app notification display for:
  - New food availability alerts
  - Booking confirmations
  - Pickup reminders
  - System updates

- **`SMSNotificationPopup.tsx`**: SMS/WhatsApp alert configuration:
  - Phone number verification
  - Notification preferences
  - Message history
  - Opt-in/opt-out management

### Authentication Components
- **`ForgotPassword.tsx`**: Password reset request interface with:
  - Email input form
  - Loading states
  - Success confirmation
  - Troubleshooting tips
  - Direct link to reset password (demo purposes)
  - Back to login option

- **`ResetPassword.tsx`**: Password reset form featuring:
  - New password input with show/hide toggle
  - Confirm password input with show/hide toggle
  - Real-time password strength indicator
  - Visual requirements checklist
  - Password validation with detailed error messages
  - Success state with auto-redirect
  - Responsive design with modern UI

### Navigation Components
- **`Navigation.tsx`**: Base navigation component
- **`LandingNavigation.tsx`**: Public pages navigation (landing, about, contact)
- **`AuthenticatedNavigation.tsx`**: Logged-in user navigation with:
  - Dashboard links
  - Profile access
  - History views
  - Settings
  - Help center
  - Logout option

- **`UserAccountMenu.tsx`**: Dropdown menu for authenticated users featuring:
  - Profile picture
  - User name and type
  - Quick links to profile and settings
  - Logout button

## Authentication & User Management

### Authentication Features
- **Login with Email/Password**: Standard authentication with email and password
- **Remember Me**: Option to stay logged in for future sessions
- **Forgot Password Flow**: Secure password reset process
- **Google Sign-In**: Quick authentication via Google account
- **Account Verification**: Optional phone/email verification for enhanced security

### Password Reset System
The application includes a comprehensive password reset flow:

1. **Forgot Password (`ForgotPassword.tsx`)**:
   - User enters their email address
   - System sends password reset link
   - Confirmation message with troubleshooting tips
   - Option to try different email if needed
   - Link to contact support

2. **Reset Password (`ResetPassword.tsx`)**:
   - Secure password reset interface
   - Password strength indicator with real-time feedback
   - Password requirements validation:
     - Minimum 8 characters
     - At least one uppercase letter
     - At least one lowercase letter
     - At least one number
     - At least one special character (!@#$%^&*)
   - Visual checklist showing met/unmet requirements
   - Show/hide password toggle
   - Confirmation password field
   - Success confirmation with auto-redirect to login

### User Flows
1. **New User Registration**:
   - Select user type (Donor/Receiver)
   - Complete profile information
   - Verify phone number (optional)
   - Access dashboard

2. **Password Reset Flow**:
   - Click "Forgot password?" on login page
   - Enter email address
   - Receive reset confirmation
   - Navigate to reset password page
   - Create new password meeting security requirements
   - Automatically redirected to login
   - Login with new password

3. **Donor Flow**:
   - Create food listings
   - Generate QR codes
   - Manage active donations
   - Verify pickups
   - View donation history

4. **Receiver Flow**:
   - Browse available food
   - Request food items
   - Scan QR codes for pickup
   - Track request status
   - View received food history

### Account Verification
- **`VerificationPopup.tsx`**: Phone/email verification interface
- Located in Personal Information section of My Profile
- Shows "Verified Account" badge when complete
- Shows "Verify Account" button when pending
- Enhances trust and security

## Support Infrastructure

### Help & Support
- **`HelpCentre.tsx`**: Comprehensive help center with:
  - FAQ sections
  - Troubleshooting guides
  - Video tutorials
  - Search functionality
  - Category-based help articles

- **`ContactUs.tsx`**: Contact form for user inquiries:
  - Multiple contact methods
  - Support ticket system
  - Response time estimates
  - Emergency contact for urgent issues

### Legal & Safety
- **`PrivacyPolicy.tsx`**: Detailed privacy policy covering:
  - Data collection practices
  - User rights
  - Data security measures
  - Third-party integrations
  - Cookie policy

- **`SafetyGuidelines.tsx`**: Safety guidelines for:
  - Food handling best practices
  - Pickup safety tips
  - Quality assessment guidelines
  - Health and hygiene standards
  - Emergency procedures

## UI Components

### ShadCN Component Library (`components/ui/`)
FoodShare uses ShadCN UI components for consistent, accessible interface elements:

**Form Components**:
- `button.tsx` - Primary action buttons
- `input.tsx` - Text input fields
- `textarea.tsx` - Multi-line text input
- `checkbox.tsx` - Checkbox selections
- `radio-group.tsx` - Radio button groups
- `select.tsx` - Dropdown selections
- `switch.tsx` - Toggle switches
- `slider.tsx` - Range sliders
- `calendar.tsx` - Date picker
- `form.tsx` - Form wrapper with validation

**Display Components**:
- `card.tsx` - Content containers
- `badge.tsx` - Status indicators
- `avatar.tsx` - User profile images
- `alert.tsx` - Notification messages
- `table.tsx` - Data tables
- `separator.tsx` - Visual dividers

**Overlay Components**:
- `dialog.tsx` - Modal dialogs
- `alert-dialog.tsx` - Confirmation dialogs
- `sheet.tsx` - Side panels
- `drawer.tsx` - Bottom sheets
- `popover.tsx` - Contextual popovers
- `tooltip.tsx` - Helpful hints

**Navigation Components**:
- `tabs.tsx` - Tab navigation
- `navigation-menu.tsx` - Menu systems
- `breadcrumb.tsx` - Breadcrumb trails
- `pagination.tsx` - Page navigation

**Advanced Components**:
- `accordion.tsx` - Collapsible sections
- `carousel.tsx` - Image/content carousels
- `chart.tsx` - Data visualizations
- `progress.tsx` - Progress indicators
- `skeleton.tsx` - Loading placeholders
- `scroll-area.tsx` - Custom scrollbars

### Utility Components
- **`ImageWithFallback.tsx`**: Image component with fallback handling for broken images
- **`utils.ts`**: Utility functions for className merging and common operations
- **`use-mobile.ts`**: Hook for responsive mobile detection

## Styling

### Global Styles (`styles/globals.css`)
Contains:
- Tailwind CSS v4.0 imports
- Custom CSS variables for theming
- Typography defaults (font-size, font-weight, line-height)
- Component-specific styles
- Responsive breakpoints
- Dark theme configuration

### Tailwind Usage Guidelines
- **Do not override** default typography (font-size, font-weight, line-height) unless specifically needed
- Use predefined color scheme (gray-900/800 backgrounds, orange-400/500/600 accents)
- Leverage utility classes for spacing, layout, and responsive design
- Maintain consistency with existing component patterns

## Key Features Summary

### 1. Food Categorization
- Cooked Food
- Packaged Food
- Fruits & Vegetables
- Bakery
- Other

### 2. Urgent Listings
- Priority flag for time-sensitive donations
- Visual indicators (red badges)
- Filtered search results

### 3. Search & Filtering
- Text-based search
- Category filters
- Urgency filters
- Location-based matching

### 4. Location Matching
- Proximity-based food discovery
- Address management
- Distance calculations
- Map integration

### 5. Verification System
- QR code generation for each listing
- 4-digit backup codes
- Scanner functionality
- Pickup confirmation

### 6. Notification System
- In-app notifications
- SMS alerts
- WhatsApp integration
- Email notifications
- Real-time updates

### 7. Account Management
- Profile customization
- Verification status
- Settings configuration
- Privacy controls
- Account security

### 8. History & Analytics
- Donation history
- Received food history
- Impact metrics
- Activity statistics

## Development Notes

### State Management
The application uses React's built-in state management (useState, useContext) for handling:
- User authentication state
- Active page/view
- Form data
- UI interactions

### Data Structure
Mock data is used throughout the application. In production, this would be replaced with:
- API calls to backend services
- Database queries
- Real-time data synchronization

### Future Enhancements
- Backend integration with Supabase or similar
- Real-time messaging between donors and receivers
- Advanced analytics dashboard
- Mobile app development
- Multi-language support
- Payment/donation features
- Rating and review system

## Support & Documentation

- **Guidelines**: See `/guidelines/Guidelines.md` for additional documentation
- **Attributions**: See `/Attributions.md` for third-party credits

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**License**: Proprietary

For questions, issues, or contributions, please contact the FoodShare development team.
