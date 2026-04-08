# 🎯 Demo Credentials - ScanSetu

## Quick Reference for Demo/Testing

### 👨‍💼 Admin Accounts

| Email | Password | Role | Notes |
|-------|----------|------|-------|
| `admin@college.edu` | `Admin@123` | Admin | Main administrator |
| `lab.manager@college.edu` | `LabMgr@123` | Admin | Lab manager |
| `prof.sharma@college.edu` | `Prof@123` | Admin | Faculty account |

### 👨‍🎓 Student Accounts (With Active Assignments)

| Name | Email | Password | Currently Has |
|------|-------|----------|---------------|
| Rahul Sharma | `rahul.sharma@college.edu` | `Rahul@123` | Digital Multimeter (DMM003) |
| Priya Patel | `priya.patel@college.edu` | `Priya@123` | Oscilloscope (OSC002) |
| Amit Kumar | `amit.kumar@college.edu` | `Amit@123` | Arduino Uno (ARD002) |
| Sneha Reddy | `sneha.reddy@college.edu` | `Sneha@123` | Arduino Uno (ARD003) |
| Vikram Singh | `vikram.singh@college.edu` | `Vikram@123` | Raspberry Pi (RPI001) |
| Ananya Iyer | `ananya.iyer@college.edu` | `Ananya@123` | Soldering Station (SOLD002) |
| Rohan Gupta | `rohan.gupta@college.edu` | `Rohan@123` | Breadboard (BB002) |
| Kavya Nair | `kavya.nair@college.edu` | `Kavya@123` | Breadboard (BB003) |
| Arjun Mehta | `arjun.mehta@college.edu` | `Arjun@123` | Ultrasonic Sensor (SENS002) |
| Divya Krishnan | `divya.krishnan@college.edu` | `Divya@123` | Screwdriver Set (TOOL002) |

### 👥 Additional Students (No Items Assigned)

| Name | Email | Password |
|------|-------|----------|
| Karthik Rao | `karthik.rao@college.edu` | `Karthik@123` |
| Meera Joshi | `meera.joshi@college.edu` | `Meera@123` |
| Siddharth Verma | `siddharth.verma@college.edu` | `Siddharth@123` |
| Aisha Khan | `aisha.khan@college.edu` | `Aisha@123` |
| Nikhil Desai | `nikhil.desai@college.edu` | `Nikhil@123` |

---

## 🎬 Demo Scenarios

### Scenario 1: Admin Login & Dashboard
```
Email: admin@college.edu
Password: Admin@123
```
**What to show:**
- Full dashboard with statistics
- All inventory items
- Issue/Return functionality
- Add new products
- Barcode scanning

### Scenario 2: Student Login
```
Email: rahul.sharma@college.edu
Password: Rahul@123
```
**What to show:**
- Student dashboard (limited view)
- Currently borrowed items (DMM003)
- Due dates
- Return request

### Scenario 3: Issue Item Flow
```
Login as: admin@college.edu
Scan barcode: ARD001 (Arduino Uno - Available)
Assign to: Karthik Rao (karthik.rao@college.edu)
```

### Scenario 4: Return Item Flow
```
Login as: admin@college.edu
Scan barcode: DMM003 (Currently with Rahul)
Process return
```

---

## 📋 Sample Barcodes for Demo

### Available Items (Ready to Issue)
- `DMM001` - Digital Multimeter
- `DMM002` - Digital Multimeter
- `OSC001` - Oscilloscope
- `ARD001` - Arduino Uno
- `ARD004` - Arduino Uno
- `RPI002` - Raspberry Pi 4GB
- `BB001` - Breadboard 830 Points
- `SOLD001` - Soldering Station

### Issued Items (Can Demo Return)
- `DMM003` - With Rahul Sharma
- `ARD002` - With Amit Kumar
- `RPI001` - With Vikram Singh
- `BB002` - With Rohan Gupta

---

## ⚠️ IMPORTANT: First Time Setup

**These accounts don't exist yet!** You need to create them:

### Option 1: Manual Registration (Recommended for Demo)
1. Go to http://localhost:5173
2. Click "Register" for each account
3. Use the emails and passwords from the table above
4. Admin emails will automatically get admin role

### Option 2: Bulk Account Creation Script
Run this in Supabase SQL Editor (requires service_role key):

```sql
-- Note: This is a simplified example
-- Actual password hashing requires Supabase Auth API
-- Use the app's registration form instead for proper setup
```

---

## 🎯 Quick Demo Flow (5 minutes)

1. **Login as Admin** (`admin@college.edu` / `Admin@123`)
   - Show dashboard with stats
   - Navigate to Inventory page
   - Show all items with status

2. **Issue an Item**
   - Go to Issue page
   - Scan/Enter barcode: `ARD001`
   - Select student: Karthik Rao
   - Set due date: 7 days from now
   - Submit

3. **View Student Dashboard**
   - Logout
   - Login as Rahul (`rahul.sharma@college.edu` / `Rahul@123`)
   - Show his borrowed item (DMM003)
   - Show due date

4. **Return an Item**
   - Logout, login as Admin again
   - Go to Return page
   - Scan/Enter barcode: `DMM003`
   - Process return
   - Show item is now available

5. **Add New Product** (Optional)
   - Go to Products page
   - Add new product: "Raspberry Pi 5 8GB"
   - Add items with barcodes
   - Show in inventory

---

## 🔐 Security Notes

- **DO NOT use these credentials in production!**
- These are demo/testing credentials only
- Change all passwords before deploying
- Use strong, unique passwords for production
- Enable email confirmation in production

---

## 📞 Support

If accounts don't work:
1. Make sure you've run `db/supabase_schema.sql`
2. Make sure you've run `db/seed_data.sql`
3. Register accounts manually through the app
4. Check Supabase Auth dashboard for created users
