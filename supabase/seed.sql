-- Seed data for West Gate Realty Services

-- Ensure we can insert UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Properties
INSERT INTO public.properties (id, property_code, name, description, price, price_label, property_type, status, is_featured, lot_area, floor_area, bedrooms, bathrooms, garage, location, barangay, city, province, features, amenities) VALUES
(uuid_generate_v4(), 'WG-2024-001', 'Modern House in Laoag', 'Beautiful newly built modern house with spacious garden and premium finishes. Perfect for a growing family.', 8500000.00, '₱8.5M', 'house_and_lot', 'available', true, 250.00, 180.00, 4, 3, 2, 'Laoag City Proper', 'Brgy. 1', 'Laoag City', 'Ilocos Norte', '["24/7 Security", "Water System", "Flood-free", "Corner Lot"]', '["Clubhouse", "Swimming Pool", "Playground"]'),
(uuid_generate_v4(), 'WG-2024-002', 'Commercial Space near Paoay Church', 'Prime commercial lot suitable for restaurants, cafes, or retail businesses. High foot traffic area.', 12000000.00, '₱12M', 'commercial', 'available', false, 500.00, null, null, null, null, 'Near Paoay Church', 'San Agustin', 'Paoay', 'Ilocos Norte', '["High Foot Traffic", "Highway Access", "Titled"]', '[]'),
(uuid_generate_v4(), 'WG-2024-003', 'Affordable Lot in Batac', 'Residential lot ready for construction. Peaceful neighborhood with access to main roads.', 1500000.00, '₱1.5M', 'lot_only', 'available', false, 150.00, null, null, null, null, 'Subdivision Area', 'Tabug', 'Batac', 'Ilocos Norte', '["Gated Community", "Paved Roads"]', '[]'),
(uuid_generate_v4(), 'WG-2024-004', 'Luxury Townhouse in Bacarra', 'Elegant townhouse unit with modern amenities and sleek design.', 5500000.00, '₱5.5M', 'townhouse', 'available', true, 100.00, 120.00, 3, 2, 1, 'Near Town Plaza', 'Brgy. 2', 'Bacarra', 'Ilocos Norte', '["Built-in Cabinets", "Balcony", "Carport"]', '[]'),
(uuid_generate_v4(), 'WG-2024-005', 'Farm Lot in Pasuquin', 'Expansive farm lot ideal for agricultural business or a rest house. With fruit-bearing trees.', 4000000.00, '₱4M', 'farm_lot', 'available', false, 5000.00, null, null, null, null, 'Rural Area', 'Poblacion', 'Pasuquin', 'Ilocos Norte', '["Irrigation Source", "Fruit-bearing trees", "Fenced"]', '[]'),
(uuid_generate_v4(), 'WG-2024-006', 'Beachfront Property in Pagudpud', 'Stunning beachfront property with white sand. Perfect for a resort or private villa.', 25000000.00, '₱25M', 'lot_only', 'available', true, 1000.00, null, null, null, null, 'Saud Beach', 'Saud', 'Pagudpud', 'Ilocos Norte', '["White Sand", "Sunset View", "Titled"]', '[]'),
(uuid_generate_v4(), 'WG-2024-007', 'Warehouse in San Nicolas', 'Spacious warehouse near the national highway. Ideal for logistics or storage.', 18000000.00, '₱18M', 'warehouse', 'available', false, 1200.00, 800.00, null, 2, 5, 'Industrial Zone', 'Brgy. 3', 'San Nicolas', 'Ilocos Norte', '["High Ceiling", "Truck Access", "3-Phase Power"]', '[]'),
(uuid_generate_v4(), 'WG-2024-008', 'Condominium Unit in Laoag', 'Studio unit in the heart of Laoag City. Close to malls, hospitals, and schools.', 3500000.00, '₱3.5M', 'condominium', 'available', false, 0.00, 35.00, 1, 1, 0, 'City Center', 'Brgy. 5', 'Laoag City', 'Ilocos Norte', '["Fully Furnished", "Elevator Access", "City View"]', '["Gym", "Pool", "Lobby"]');

-- Testimonials
INSERT INTO public.testimonials (id, client_name, client_title, content, rating, is_published, sort_order) VALUES
(uuid_generate_v4(), 'Maria Santos', 'Homeowner', 'West Gate Realty helped us find our dream home in Laoag. Their team is very professional and accommodating. Highly recommended!', 5, true, 1),
(uuid_generate_v4(), 'Juan Dela Cruz', 'Business Owner', 'I bought a commercial space through them and the transaction was seamless. They handled all the paperwork efficiently.', 5, true, 2),
(uuid_generate_v4(), 'Elena Garcia', 'Investor', 'Excellent service and great property recommendations. They really know the Ilocos real estate market well.', 4, true, 3),
(uuid_generate_v4(), 'Mark Reyes', 'First-time Buyer', 'As a first-time buyer, I had a lot of questions. West Gate guided me every step of the way. Thank you!', 5, true, 4),
(uuid_generate_v4(), 'Sofia Villanueva', 'Seller', 'They sold my property in just a few weeks at a very good price. Their marketing strategies are top-notch.', 5, true, 5);

-- CMS Content
INSERT INTO public.cms_content (section, title, subtitle, content) VALUES
('hero', 'Your Premier Real Estate Partner in Ilocos', 'Discover the finest properties across the region with West Gate Realty Services.', '{"button_text": "View Properties", "button_link": "/properties", "secondary_button_text": "Book a Viewing", "secondary_button_link": "/contact"}'),
('about', 'About West Gate Realty Services', 'Your Full-Package Real Estate Marketing & Transaction Management Partner', '{"mission": "To provide exceptional real estate services that build trust, deliver value, and foster long-term relationships with our clients.", "vision": "To be the leading and most trusted real estate marketing firm in Northern Luzon."}'),
('services', 'Our Services', 'Comprehensive real estate solutions tailored to your needs.', '{"services_list": [{"title": "Strategic Property Marketing", "description": "We employ advanced marketing techniques to ensure your property reaches the right buyers."}]}'),
('contact', 'Get in Touch', 'We are here to assist you with your real estate inquiries.', '{"address": "Laoag City, Ilocos Norte, Philippines", "email": "info@westgaterealty.com", "phone": "+63 917 123 4567"}');
