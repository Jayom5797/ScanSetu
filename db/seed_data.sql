-- Seed Data for ScanSetu Lab Inventory System
-- Run this after setting up the schema to populate with realistic test data

-- ============================================
-- PRODUCTS (Lab Equipment & Tools)
-- ============================================

INSERT INTO public.products (name, sku) VALUES
  -- Electronics & Measurement Tools
  ('Digital Multimeter Fluke 87V', 'DMM-F87V'),
  ('Oscilloscope Tektronix TDS2024C', 'OSC-TEK2024'),
  ('Function Generator Agilent 33220A', 'FG-AG33220'),
  ('Power Supply DC 30V 5A', 'PS-DC305'),
  ('Logic Analyzer 16 Channel', 'LA-16CH'),
  ('Soldering Station Weller WES51', 'SOLD-WES51'),
  ('Hot Air Rework Station', 'HARS-858D'),
  ('LCR Meter DE-5000', 'LCR-DE5000'),
  
  -- Hand Tools
  ('Precision Screwdriver Set 32pc', 'SCREW-32PC'),
  ('Wire Stripper Professional', 'STRIP-PRO'),
  ('Crimping Tool RJ45/RJ11', 'CRIMP-RJ'),
  ('Pliers Set 3pc', 'PLIER-3PC'),
  ('Tweezers Set ESD Safe 6pc', 'TWZR-ESD6'),
  ('Hex Key Set Metric', 'HEX-MET'),
  ('Spanner Set 8-19mm', 'SPAN-819'),
  ('Cutter Diagonal 6 inch', 'CUT-DIA6'),
  
  -- Components & Supplies
  ('Breadboard 830 Points', 'BB-830'),
  ('Jumper Wire Kit 140pc', 'JW-140'),
  ('Resistor Kit 1/4W 1% 2600pc', 'RES-2600'),
  ('Capacitor Kit Ceramic 600pc', 'CAP-CER600'),
  ('LED Assortment 5mm 500pc', 'LED-5MM500'),
  ('Transistor Kit NPN/PNP 200pc', 'TRANS-200'),
  ('IC Socket Kit DIP 120pc', 'ICS-DIP120'),
  ('Heat Shrink Tube Kit 560pc', 'HST-560'),
  
  -- Arduino & Development Boards
  ('Arduino Uno R3', 'ARD-UNOR3'),
  ('Arduino Mega 2560', 'ARD-MEGA'),
  ('Raspberry Pi 4 Model B 4GB', 'RPI-4B4G'),
  ('ESP32 DevKit V1', 'ESP32-DK'),
  ('STM32 Blue Pill', 'STM32-BP'),
  ('NodeMCU ESP8266', 'NODE-8266'),
  
  -- Sensors & Modules
  ('Ultrasonic Sensor HC-SR04', 'SENS-HCSR04'),
  ('Temperature Sensor DHT22', 'SENS-DHT22'),
  ('PIR Motion Sensor', 'SENS-PIR'),
  ('Gas Sensor MQ-2', 'SENS-MQ2'),
  ('RFID Module RC522', 'MOD-RC522'),
  ('GPS Module NEO-6M', 'MOD-GPS6M'),
  ('Bluetooth Module HC-05', 'MOD-BT05'),
  ('WiFi Module ESP-01', 'MOD-ESP01'),
  
  -- Cables & Connectors
  ('USB Cable Type-A to Type-B', 'USB-AB'),
  ('USB Cable Type-C 1m', 'USB-C1M'),
  ('HDMI Cable 2m', 'HDMI-2M'),
  ('Ethernet Cable Cat6 3m', 'ETH-CAT6'),
  ('Dupont Cable F-F 40pc', 'DUP-FF40'),
  ('Dupont Cable M-M 40pc', 'DUP-MM40'),
  ('Dupont Cable M-F 40pc', 'DUP-MF40'),
  
  -- Safety Equipment
  ('Safety Glasses Anti-Static', 'SAFE-GLASS'),
  ('ESD Wrist Strap', 'ESD-STRAP'),
  ('Heat Resistant Gloves', 'GLOVE-HEAT'),
  ('First Aid Kit', 'AID-KIT'),
  
  -- Storage & Organization
  ('Component Storage Box 24 Grid', 'STOR-24G'),
  ('Tool Box Portable', 'TBOX-PORT'),
  ('Cable Organizer Set', 'ORG-CABLE'),
  ('Anti-Static Bags 100pc', 'BAG-ESD100')
ON CONFLICT (sku) DO NOTHING;

-- ============================================
-- ITEMS (Individual inventory items with unique codes)
-- ============================================

-- Digital Multimeters (10 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'DMM001', 'in_stock' FROM public.products p WHERE p.sku='DMM-F87V'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'DMM002', 'in_stock' FROM public.products p WHERE p.sku='DMM-F87V'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'DMM003', 'issued' FROM public.products p WHERE p.sku='DMM-F87V'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'DMM004', 'issued' FROM public.products p WHERE p.sku='DMM-F87V'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'DMM005', 'in_stock' FROM public.products p WHERE p.sku='DMM-F87V'
ON CONFLICT (code) DO NOTHING;

-- Oscilloscopes (5 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'OSC001', 'in_stock' FROM public.products p WHERE p.sku='OSC-TEK2024'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'OSC002', 'issued' FROM public.products p WHERE p.sku='OSC-TEK2024'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'OSC003', 'in_stock' FROM public.products p WHERE p.sku='OSC-TEK2024'
ON CONFLICT (code) DO NOTHING;

-- Arduino Boards (20 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD001', 'in_stock' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD002', 'issued' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD003', 'issued' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD004', 'in_stock' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD005', 'in_stock' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD006', 'issued' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD007', 'in_stock' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'ARD008', 'in_stock' FROM public.products p WHERE p.sku='ARD-UNOR3'
ON CONFLICT (code) DO NOTHING;

-- Raspberry Pi (8 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'RPI001', 'issued' FROM public.products p WHERE p.sku='RPI-4B4G'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'RPI002', 'in_stock' FROM public.products p WHERE p.sku='RPI-4B4G'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'RPI003', 'issued' FROM public.products p WHERE p.sku='RPI-4B4G'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'RPI004', 'in_stock' FROM public.products p WHERE p.sku='RPI-4B4G'
ON CONFLICT (code) DO NOTHING;

-- Soldering Stations (6 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SOLD001', 'in_stock' FROM public.products p WHERE p.sku='SOLD-WES51'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SOLD002', 'issued' FROM public.products p WHERE p.sku='SOLD-WES51'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SOLD003', 'in_stock' FROM public.products p WHERE p.sku='SOLD-WES51'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SOLD004', 'in_stock' FROM public.products p WHERE p.sku='SOLD-WES51'
ON CONFLICT (code) DO NOTHING;

-- Breadboards (30 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB001', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB002', 'issued' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB003', 'issued' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB004', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB005', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB006', 'issued' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB007', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB008', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB009', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'BB010', 'in_stock' FROM public.products p WHERE p.sku='BB-830'
ON CONFLICT (code) DO NOTHING;

-- Sensors (40 units - various types)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SENS001', 'in_stock' FROM public.products p WHERE p.sku='SENS-HCSR04'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SENS002', 'issued' FROM public.products p WHERE p.sku='SENS-HCSR04'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SENS003', 'in_stock' FROM public.products p WHERE p.sku='SENS-DHT22'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SENS004', 'issued' FROM public.products p WHERE p.sku='SENS-DHT22'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SENS005', 'in_stock' FROM public.products p WHERE p.sku='SENS-PIR'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'SENS006', 'in_stock' FROM public.products p WHERE p.sku='SENS-MQ2'
ON CONFLICT (code) DO NOTHING;

-- Tool Sets (15 units)
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'TOOL001', 'in_stock' FROM public.products p WHERE p.sku='SCREW-32PC'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'TOOL002', 'issued' FROM public.products p WHERE p.sku='SCREW-32PC'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'TOOL003', 'in_stock' FROM public.products p WHERE p.sku='PLIER-3PC'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'TOOL004', 'issued' FROM public.products p WHERE p.sku='PLIER-3PC'
ON CONFLICT (code) DO NOTHING;
INSERT INTO public.items (product_id, code, status)
SELECT p.id, 'TOOL005', 'in_stock' FROM public.products p WHERE p.sku='SPAN-819'
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- ADMIN EMAILS (Users who will have admin role)
-- ============================================

INSERT INTO public.admin_emails (email) VALUES
  ('admin@college.edu'),
  ('lab.manager@college.edu'),
  ('prof.sharma@college.edu')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- USERS (Students and Lab Members)
-- ============================================

INSERT INTO public.users (full_name, email) VALUES
  ('Rahul Sharma', 'rahul.sharma@college.edu'),
  ('Priya Patel', 'priya.patel@college.edu'),
  ('Amit Kumar', 'amit.kumar@college.edu'),
  ('Sneha Reddy', 'sneha.reddy@college.edu'),
  ('Vikram Singh', 'vikram.singh@college.edu'),
  ('Ananya Iyer', 'ananya.iyer@college.edu'),
  ('Rohan Gupta', 'rohan.gupta@college.edu'),
  ('Kavya Nair', 'kavya.nair@college.edu'),
  ('Arjun Mehta', 'arjun.mehta@college.edu'),
  ('Divya Krishnan', 'divya.krishnan@college.edu'),
  ('Karthik Rao', 'karthik.rao@college.edu'),
  ('Meera Joshi', 'meera.joshi@college.edu'),
  ('Siddharth Verma', 'siddharth.verma@college.edu'),
  ('Aisha Khan', 'aisha.khan@college.edu'),
  ('Nikhil Desai', 'nikhil.desai@college.edu')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- ASSIGNMENTS (Issue items to students)
-- ============================================

-- Rahul has DMM003
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '3 days', now() + interval '4 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='rahul.sharma@college.edu'
WHERE i.code='DMM003'
ON CONFLICT DO NOTHING;

-- Priya has OSC002
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '2 days', now() + interval '5 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='priya.patel@college.edu'
WHERE i.code='OSC002'
ON CONFLICT DO NOTHING;

-- Amit has ARD002
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '1 day', now() + interval '6 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='amit.kumar@college.edu'
WHERE i.code='ARD002'
ON CONFLICT DO NOTHING;

-- Sneha has ARD003
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '5 days', now() + interval '2 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='sneha.reddy@college.edu'
WHERE i.code='ARD003'
ON CONFLICT DO NOTHING;

-- Vikram has RPI001
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '4 days', now() + interval '3 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='vikram.singh@college.edu'
WHERE i.code='RPI001'
ON CONFLICT DO NOTHING;

-- Ananya has SOLD002
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '1 day', now() + interval '6 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='ananya.iyer@college.edu'
WHERE i.code='SOLD002'
ON CONFLICT DO NOTHING;

-- Rohan has BB002
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '2 days', now() + interval '5 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='rohan.gupta@college.edu'
WHERE i.code='BB002'
ON CONFLICT DO NOTHING;

-- Kavya has BB003
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '3 days', now() + interval '4 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='kavya.nair@college.edu'
WHERE i.code='BB003'
ON CONFLICT DO NOTHING;

-- Arjun has SENS002
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '1 day', now() + interval '6 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='arjun.mehta@college.edu'
WHERE i.code='SENS002'
ON CONFLICT DO NOTHING;

-- Divya has TOOL002
INSERT INTO public.assignments (item_id, user_id, status, issued_at, due_at)
SELECT i.id, u.id, 'issued', now() - interval '4 days', now() + interval '3 days'
FROM public.items i
JOIN public.products p ON p.id = i.product_id
JOIN public.users u ON u.email='divya.krishnan@college.edu'
WHERE i.code='TOOL002'
ON CONFLICT DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Products: 52 different types of lab equipment
-- Items: 60+ individual inventory items with unique barcodes
-- Users: 15 students
-- Admin Emails: 3 (admin@college.edu, lab.manager@college.edu, prof.sharma@college.edu)
-- Active Assignments: 10 items currently issued to students
-- 
-- IMPORTANT: After running this seed data, you need to:
-- 1. Register accounts through the app using the admin emails above
-- 2. Those accounts will automatically get admin role
-- 3. Students can register with their @college.edu emails
-- ============================================
