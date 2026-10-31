# StudentHub — Practical 15 Test Report

**Project:** StudentHub Portal  
**Practical:** 15 — Final Integration, Testing, Documentation, GitHub Submission and Local Deployment  
**Environment:** XAMPP / Apache / PHP 8+ / MySQL / Chrome or Firefox  
**Date:** ____________________  
**Tested by:** ____________________

> Important: This is a test plan and result template. Run each test on your computer and mark the actual result. Do not claim a test passed until you have verified it.

| No. | Test case | Steps / test input | Expected result | Actual result |
|---|---|---|---|---|
| 1 | Home navigation | Open home and click Events, Login, Register | Correct page opens | Pending |
| 2 | Responsive layout | Inspect at mobile, tablet and desktop widths | Layout adapts without horizontal overflow | Pending |
| 3 | Student registration | Submit valid name, unique email, 10-digit mobile, course and password | Account created and dashboard opens | Pending |
| 4 | Invalid email | Submit malformed email | Validation message shown; no row inserted | Pending |
| 5 | Duplicate email | Register the same email twice | Duplicate account rejected | Pending |
| 6 | Password hashing | Inspect users.password_hash in phpMyAdmin | Stored value is a hash, not plain text | Pending |
| 7 | Student login | Sign in using registered account | Student dashboard opens | Pending |
| 8 | Invalid login | Use incorrect password | Generic login error shown | Pending |
| 9 | Logout | Click Logout and revisit dashboard URL | Session ends; login required | Pending |
| 10 | Session timeout | Leave session inactive for 30 minutes | Session expires and login is required | Pending |
| 11 | Role protection | Sign in as student and open `/admin/` | Access denied | Pending |
| 12 | Admin dashboard | Sign in as admin | Counts and latest registrations display | Pending |
| 13 | Student search/status | Search student list and change status | Search filters rows; status updates | Pending |
| 14 | Event create/delete | Create an event, then delete it | Event list updates in database | Pending |
| 15 | Events JSON API | Open `/api/events.php` | Valid JSON response returned | Pending |
| 16 | CSRF validation | Submit a form without valid token | Request rejected | Pending |
| 17 | SQL injection resistance | Try quote-based input in search/login | Prepared queries prevent query manipulation | Pending |
| 18 | Accessibility basics | Keyboard-tab through navigation and forms | Focus and labels are usable | Pending |
| 19 | Local deployment | Import SQL and run through Apache | Portal loads from localhost | Pending |
| 20 | GitHub repository | Push source and inspect repository | Source, README and SQL dump present; no secrets | Pending |

## Evidence to capture
1. Home page at desktop and mobile sizes.
2. Registration success and validation error.
3. Student login and dashboard.
4. Admin dashboard and student management.
5. Event create/list screen.
6. API JSON response in browser.
7. phpMyAdmin database tables.
8. GitHub repository page and latest commit.
9. XAMPP Apache/MySQL running.

## Final test summary
- Total test cases: 20
- Passed: ______
- Failed: ______
- Not tested: ______
- Defects/fixes: ______________________________________
