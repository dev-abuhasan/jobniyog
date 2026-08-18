const autoFillData = {
    // ===== Personal Information =====
    name: "Abu Hasan",
    bn_name: "আবু হাসান",
    fathername: "Motiar Rahman",
    bn_father: "মতিয়ার রহমান",
    mothername: "Swapna begum",
    bn_mother: "স্বপ্না বেগম",

    // ===== Date of Birth =====
    b_day: "20",
    b_month: "10",
    b_year: "2001",

    // ===== Gender & Status =====
    sex: "1",
    ffq: "4",
    nationality: "Bangladeshi",
    nid: "1",
    mstatus: "1",

    // ===== Present Address =====
    present_care: "Abu Saied AKNDA",
    present_vill: "DHORMOKAM, SERUA, SHERPUR, SHERPUR - 5840, BOGURA",
    menu_one: "10",
    present_post: "Sherpur",
    present_pcode: "5840",

    // ===== Permanent Address =====
    permanent_care: "Abu Saied AKNDA",
    permanent_vill: "DHORMOKAM, SERUA, SHERPUR, SHERPUR - 5840, BOGURA",
    menu_two: "10",
    permanent_post: "Sherpur",
    permanent_pcode: "5840",

    // ===== Contact =====
    mobileno: "01816583642",
    confirmmobile: "01816583642",

    // ===== SSC =====
    exam1: "1",
    institute1: "3",
    roll1: "156270",
    reg1: "1412782415",
    result1: "5",
    result_gpa1: "4.00",
    subject1: "1",
    year1: "2017",

    // ===== HSC =====
    exam2: "1",
    institute2: "3",
    roll2: "126698",
    reg2: "1412782415",
    result2: "5",
    result_gpa2: "3.83",
    year2: "2019",

    // ===== Graduation =====
    exam3: "4",
    institute3: "131",
    year3: "2023",
    result3: "4",
    result_gpa3: "2.78",
    duration3: "04",

    // ===== Current Job =====
    total_exp: "1",
    employed: "8",
    organization: "Arogga LTD",
    job_post: "Software Engineer",
    job_address: "AROGGA LTD. D/15-1, R-36, B-D, SEC-10",
    t_month: "May",
    t_year: "2023",
    f_month: "0",
    f_year: "0",
    till_date: "1",
    salary: "72600",
    pay_scale: "37800",
    jgrade: "06",

    // ===== Bengali Additional Information =====
    bn_address: "ধরমোকাম, শেরুয়া, শেরপুর, শেরপুর -৫৮৪০, বগুড়া",

    // ===== Exam Centre =====
    exam_centre: "1",
};

// Helper function to trigger events
function triggerEvents(element) {
    if (!element) return;
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
    element.dispatchEvent(new Event("blur", { bubbles: true }));
}

function setValueForElement(element, value, identifier) {
    if (!element) {
        console.warn(`Not Found: ${identifier}`);
        return;
    }
    element.value = value;
    triggerEvents(element);
    console.log(`✓ ${identifier} = ${value}`);
}

// Fill all fields
for (const [id, value] of Object.entries(autoFillData)) {
    const el = document.getElementById(id);
    if (el) {
        setValueForElement(el, value, id);
    } else {
        console.warn(`Element with ID "${id}" not found`);
    }
}

// ===== Special Handlers with Delays =====

// 1. Same as Present Address
const copyCheckbox = document.getElementById("copy");
if (copyCheckbox) {
    copyCheckbox.checked = true;
    triggerEvents(copyCheckbox);
    if (typeof fd === "function") fd();
    console.log("✓ Same as present address checked");
}

// 2. Married status + Spouse Name
const marriedRadio = document.getElementById("mstatus_01");
if (marriedRadio) {
    marriedRadio.checked = true;
    triggerEvents(marriedRadio);
    setTimeout(() => {
        const spouseField = document.querySelector('input[name="s_name"]');
        if (spouseField) {
            spouseField.value = "MST. SALMA KHATUN";
            triggerEvents(spouseField);
            console.log("✓ Married status set with spouse name");
        }
    }, 300);
}

// 3. NID + NID Number
const nidYes = document.getElementById("nid_01");
if (nidYes) {
    nidYes.checked = true;
    triggerEvents(nidYes);
    setTimeout(() => {
        const nidField = document.querySelector('input[name="nid_no"]');
        if (nidField) {
            nidField.value = "3760912760";
            triggerEvents(nidField);
            console.log("✓ NID set");
        }
    }, 300);
}

// 4. Set Ethnic Minority to "No"
const ethnicNo = document.getElementById("tribal2");
if (ethnicNo) {
    ethnicNo.checked = true;
    triggerEvents(ethnicNo);
    console.log("✓ Ethnic Minority - No");
}

// 5. Set Physically Handicapped to "No"
const handicapNo = document.getElementById("phc2");
if (handicapNo) {
    handicapNo.checked = true;
    triggerEvents(handicapNo);
    console.log("✓ Physically Handicapped - No");
}

// 6. Set HSC Group to "Science" (with delay)
setTimeout(() => {
    const hscGroup = document.getElementById("subject2");
    if (hscGroup) {
        let found = false;
        for (let i = 0; i < hscGroup.options.length; i++) {
            if (hscGroup.options[i].value === "1") {
                hscGroup.selectedIndex = i;
                found = true;
                triggerEvents(hscGroup);
                console.log("✓ HSC Group - Science");
                break;
            }
        }
        if (!found) {
            console.warn("HSC Group 'Science' not found");
        }
    }
}, 500);

// 7. Set Present Upazila to "Sherpur"
const presentDistrict = document.getElementById("menu_one");
if (presentDistrict) {
    presentDistrict.value = "10";
    triggerEvents(presentDistrict);
    console.log("✓ Present District - Bogura");
    
    setTimeout(() => {
        const upazilaDropdown = document.getElementById("menu_one_list");
        if (upazilaDropdown) {
            let found = false;
            for (let i = 0; i < upazilaDropdown.options.length; i++) {
                if (upazilaDropdown.options[i].value === "Sherpur") {
                    upazilaDropdown.selectedIndex = i;
                    found = true;
                    triggerEvents(upazilaDropdown);
                    console.log("✓ Present Upazila - Sherpur");
                    break;
                }
            }
            if (!found) {
                console.warn("Present Upazila 'Sherpur' not found");
            }
        }
    }, 800);
}

// 8. Set Permanent Upazila to "Sherpur"
const permanentDistrict = document.getElementById("menu_two");
if (permanentDistrict) {
    permanentDistrict.value = "10";
    triggerEvents(permanentDistrict);
    console.log("✓ Permanent District - Bogura");
    
    setTimeout(() => {
        const permUpazilaDropdown = document.getElementById("menu_two_list");
        if (permUpazilaDropdown) {
            let found = false;
            for (let i = 0; i < permUpazilaDropdown.options.length; i++) {
                if (permUpazilaDropdown.options[i].value === "Sherpur") {
                    permUpazilaDropdown.selectedIndex = i;
                    found = true;
                    triggerEvents(permUpazilaDropdown);
                    console.log("✓ Permanent Upazila - Sherpur");
                    break;
                }
            }
            if (!found) {
                console.warn("Permanent Upazila 'Sherpur' not found");
            }
        }
    }, 800);
}

// 9. Set Graduation Subject to "Bangla"
const examSelect = document.getElementById("exam3");
if (examSelect) {
    examSelect.value = "4";
    triggerEvents(examSelect);
    console.log("✓ Graduation Exam - Honours");
    
    setTimeout(() => {
        const subjectDropdown = document.getElementById("subject3");
        if (subjectDropdown) {
            let found = false;
            for (let i = 0; i < subjectDropdown.options.length; i++) {
                if (subjectDropdown.options[i].value === "108") {
                    subjectDropdown.selectedIndex = i;
                    found = true;
                    triggerEvents(subjectDropdown);
                    console.log("✓ Graduation Subject - Bangla [108]");
                    break;
                }
            }
            if (!found) {
                console.warn("Subject 'Bangla [108]' not found");
            }
        }
    }, 800);
}

// 10. Masters (unchecked)
const mastersCheckbox = document.getElementById("masters");
if (mastersCheckbox) {
    mastersCheckbox.checked = false;
    triggerEvents(mastersCheckbox);
    console.log("✓ Masters - Not applicable");
}

// 11. Job Experience
const jobCheckbox = document.getElementById("job_no");
if (jobCheckbox) {
    jobCheckbox.checked = true;
    triggerEvents(jobCheckbox);
    setTimeout(() => {
        if (typeof jfd === "function") jfd();
        console.log("✓ Job experience - Yes");
    }, 300);
}

// 12. Till Date
const tillDateCheckbox = document.getElementById("till_date");
if (tillDateCheckbox) {
    tillDateCheckbox.checked = true;
    triggerEvents(tillDateCheckbox);
    console.log("✓ Current job - Till Date");
}

// 13. Validation Code
try {
    const iframe = document.querySelector('iframe[name="t_img"]');
    if (iframe) {
        setTimeout(() => {
            try {
                const frameDoc = iframe.contentDocument || iframe.contentWindow.document;
                const codeElement = frameDoc.querySelector('body');
                if (codeElement) {
                    const code = codeElement.textContent.trim();
                    const validationField = document.getElementById("validation");
                    if (validationField) {
                        validationField.value = code;
                        triggerEvents(validationField);
                        console.log(`✓ Validation code: ${code}`);
                    }
                }
            } catch (e) {
                console.log("ℹ️ Enter validation code manually");
            }
        }, 1000);
    }
} catch (e) {
    console.log("ℹ️ Enter validation code manually");
}

// 14. Agreement & Submit
const agreeCheckbox = document.getElementById("info_yes");
if (agreeCheckbox) {
    agreeCheckbox.checked = true;
    triggerEvents(agreeCheckbox);
    setTimeout(() => {
        const submitBtn = document.getElementById("button01");
        if (submitBtn) {
            submitBtn.disabled = false;
            console.log("✓ Submit button enabled");
        }
    }, 300);
}

// 15. Final Summary (with delay to ensure all fields are set)
setTimeout(() => {
    console.log("✅ ===== AUTOFILL COMPLETED ===== ✅");
    console.log("📋 Personal: Abu Hasan (Male, Born: 20-10-2001)");
    console.log("📋 Married to: MST. SALMA KHATUN");
    console.log("📋 NID: 3760912760");
    console.log("📋 Mobile: 01816583642");
    console.log("📋 Address: DHORMOKAM, SERUA, SHERPUR, BOGURA - 5840");
    console.log("📋 District: Bogura, Upazila: Sherpur");
    console.log("📋 SSC: 2017, Roll: 156270, GPA: 4.00 (Rajshahi Board) - Science");
    console.log("📋 HSC: 2019, Roll: 126698, GPA: 3.83 (Rajshahi Board) - Science");
    console.log("📋 Graduation: 2023, CGPA: 2.78 (National University) - Bangla");
    console.log("📋 Current Job: Arogga LTD (May 2023 - Present)");
    console.log("📋 Salary: 72,600 Taka, Pay Scale: 37,800, Grade: 06");
    console.log("⚠️  PLEASE VERIFY ALL INFORMATION BEFORE SUBMITTING!");
}, 1500);