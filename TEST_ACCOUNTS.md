# Test Accounts for ScanSetu

## Admin Accounts

After running `db/seed_data.sql`, these emails are configured as admins. You need to **register** through the app with these emails:

| Email | Role | Purpose |
|-------|------|---------|
| `admin@college.edu` | Admin | Main administrator account |
| `lab.manager@college.edu` | Admin | Lab manager account |
| `prof.sharma@college.edu` | Admin | Faculty/Professor account |

**To create admin accounts:**
1. Go to your app (http://localhost:5173)
2. Click "Register"
3. Use one of the admin emails above
4. Create any password you want
5. The account will automatically get admin role

## Student Accounts (Pre-populated in database)

These students already have items assigned to them in the seed data:

| Name | Email | Currently Has |
|------|-------|---------------|
| Rahul Sharma | rahul.sharma@college.edu | Digital Multimeter (DMM003) |
| Priya Patel | priya.patel@college.edu | Oscilloscope (OSC002) |
| Amit Kumar | amit.kumar@college.edu | Arduino Uno (ARD002) |
| Sneha Reddy | sneha.reddy@college.edu | Arduino Uno (ARD003) |
| Vikram Singh | vikram.singh@college.edu | Raspberry Pi (RPI001) |
| Ananya Iyer | ananya.iyer@college.edu | Soldering Station (SOLD002) |
| Rohan Gupta | rohan.gupta@college.edu | Breadboard (BB002) |
| Kavya Nair | kavya.nair@college.edu | Breadboard (BB003) |
| Arjun Mehta | arjun.mehta@college.edu | Ultrasonic Sensor (SENS002) |
| Divya Krishnan | divya.krishnan@college.edu | Screwdriver Set (TOOL002) |

**Additional students (no items assigned yet):**
- Karthik Rao (karthik.rao@college.edu)
- Meera Joshi (meera.joshi@college.edu)
- Siddharth Verma (siddharth.verma@college.edu)
- Aisha Khan (aisha.khan@college.edu)
- Nikhil Desai (nikhil.desai@college.edu)

## Quick Test Workflow

1. **Setup Database:**
   ```sql
   -- Run in Supabase SQL Editor
   -- First: db/supabase_schema.sql
   -- Then: db/seed_data.sql
   ```

2. **Create Your Admin Account:**
   - Register with `admin@college.edu` (or any admin email)
   - Choose a password (e.g., `Admin123!`)
   - You'll automatically get admin role

3. **Test as Admin:**
   - View all inventory items
   - Issue items to students
   - Return items
   - Add new products
   - Scan barcodes

4. **Test as Student (Optional):**
   - Register with any student email
   - View your assigned items
   - See due dates

## Sample Barcodes to Test

Available items (in stock):
- `DMM001`, `DMM002`, `DMM005` - Digital Multimeters
- `OSC001`, `OSC003` - Oscilloscopes
- `ARD001`, `ARD004`, `ARD005`, `ARD007`, `ARD008` - Arduino Uno
- `RPI002`, `RPI004` - Raspberry Pi
- `BB001`, `BB004`, `BB005`, `BB007-BB010` - Breadboards

Issued items (test returns):
- `DMM003` - Issued to Rahul
- `ARD002` - Issued to Amit
- `RPI001` - Issued to Vikram

## Notes

- **Passwords are NOT pre-created** - You must register accounts through the app
- Admin role is automatically assigned based on email in `admin_emails` table
- Students in the `users` table are for tracking assignments, not for auth
- If students want to login, they need to register with their email addresses
