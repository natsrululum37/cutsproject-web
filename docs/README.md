# CutsProject Database - Entity Relationship Diagram (ERD)

This directory contains the ERD documentation for the CutsProject barbershop management system.

## Files

- `cutsproject-erd.png` - Complete Entity Relationship Diagram showing all database entities and their relationships

## Database Entities

The CutsProject system consists of the following main entities:

### Core Entities

1. **ADMIN** - System administrators who manage the application
   - Manages all other entities (CRUD operations)
   - Attributes: id (PK), name, email, password, photo, role, timestamps

2. **USER** - Customers/clients of the barbershop
   - Can make reservations and write reviews
   - Attributes: id (PK), name, email, password, phone, photo, role, timestamps

3. **SERVICE** - Barbershop services offered
   - Can be booked multiple times by different users
   - Attributes: id (PK), name, description, price, category, duration, image_url, timestamps

4. **BOOKING** - Reservation/appointment records
   - Links users to services with scheduling information
   - Attributes: id (PK), name, email, phone, date, time, service_id (FK), user_id (FK), status, timestamps

### Supporting Entities

5. **TEAM** - Development team member information
   - Stores information about project team members
   - Attributes: id (PK), nama, nim, peran, tugas, github, image, timestamps

6. **REVIEW** - Customer testimonials and ratings
   - Users can write multiple reviews
   - Attributes: id (PK), name, rating, comment, user_id (FK), timestamps

7. **GALLERY** - Photo gallery of barbershop work
   - Showcase portfolio images
   - Attributes: id (PK), title, image, timestamps

8. **BUSINESS_INFO** - Business information and settings
   - Store business details like location, hours, contact info
   - Attributes: id (PK), name, address, phone, email, hours, description, timestamps

## Key Relationships

- **USER → BOOKING** (1:M) - One user can make multiple bookings
- **SERVICE → BOOKING** (1:M) - One service can be booked multiple times
- **USER → REVIEW** (1:M) - One user can write multiple reviews
- **ADMIN manages all entities** - Admins have CRUD access to all data

## Notes

- Primary Keys (PK) are highlighted in yellow
- Foreign Keys (FK) are highlighted in light red
- All entities include created_at and updated_at timestamps for audit trails
- The BOOKING entity serves as the main transaction table linking users and services