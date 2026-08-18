const autoFillData = {
    name: "Abu Hasan",
    name_bn: "আবু হাসান",
    father: "Motiar Rahman",
    father_bn: "মতিয়ার রহমান",
    mother: "Swapna begum",
    mother_bn: "স্বপ্না বেগম",
    dob: "2001-10-20",

    nationality: "Bangladeshi",
    religion: "1",
    gender: "Male",

    nid: "1",
    nid_no: "3760912760",

    breg: "1",
    breg_no: "20011018877114792",

    passport: "1",
    passport_no: "A07493271",

    marital_status: "Married",
    spouse_name: "MST. SALMA KHATUN",

    mobile: "01816583642",
    confirm_mobile: "01816583642",
    email: "dev.abuhasan@gmail.com",

    quota: "8",
    dep_status: "5",
    address_bn: "ধরমোকাম, শেরুয়া, শেরপুর, শেরপুর -৫৮৪০, বগুড়া",

    // Present Address
    present_careof: "Abu Saied AKNDA",
    present_village: "DHORMOKAM, SERUA, SHERPUR, SHERPUR - 5840, BOGURA",
    present_district: "10",
    present_upazila: "74",
    present_post: "Sherpur",
    present_postcode: "5840",

    // SSC
    ssc_exam: "1",
    ssc_roll: "156270",
    ssc_group: "1",
    ssc_board: "19",
    ssc_result_type: "5",
    ssc_result: "4.00",
    ssc_year: "2017",

    // HSC
    hsc_exam: "1",
    hsc_roll: "126698",
    hsc_group: "1",
    hsc_board: "19",
    hsc_result_type: "5",
    hsc_result: "3.83",
    hsc_year: "2019",

    // ===== Graduation (Replace IDs if different) =====
    gra_exam: "4",
    gra_institute: "240",
    gra_year: "2023",
    gra_subject: "108",
    gra_result_type: "4",
    gra_result: "2.78",
    gra_duration: "04",

    // Current Job
    employment_type: "8",
    designation: "Software Engineer",
    job_start_date: "2023-05-02",
    organization: "Arogga LTD",
    office_address: "AROGGA LTD. D/15-1, R-36, B-D, SEC-10",
    job_description:
        "Arogga stands as a premier e-commerce entity in Bangladesh, renowned for its online presence. As a software engineer, I develop and maintain web applications and backend services while contributing to scalable software solutions.",

    // ONLY Arogga Job
    nameType: {
        "job[0][employment_type]": "8",
        "job[0][designation]": "Software Engineer",
        "job[0][job_start_date]": "2023-05-02",
        "job[0][organization]": "Arogga LTD",
        "job[0][office_address]": "AROGGA LTD. D/15-1, R-36, B-D, SEC-10",
        "job[0][job_description]":
            "Arogga stands as a premier e-commerce entity in Bangladesh, renowned for its online presence. As a software engineer, I develop and maintain web applications and backend services while contributing to scalable software solutions."
    },

    "other_exp[0][value]": "Yes"
};

function triggerEvents(element) {
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

    console.log(`✓ ${identifier}`);
}

// Fill normal fields
for (const [id, value] of Object.entries(autoFillData)) {

    if (id === "nameType") {

        for (const [name, val] of Object.entries(value)) {

            const el = document.querySelector(`[name="${name}"]`);

            setValueForElement(el, val, name);
        }

    } else if (id.startsWith("other_exp")) {

        const el = document.querySelector(`[name="${id}"]`);

        setValueForElement(el, value, id);

    } else {

        const el = document.getElementById(id);

        setValueForElement(el, value, id);
    }
}

// Same as Present Address
const sameAddress = document.getElementById("same_as_present");

if (sameAddress) {

    sameAddress.checked = true;

    if (typeof onOffSameAsBtn === "function") {
        onOffSameAsBtn(sameAddress);
    }

    triggerEvents(sameAddress);

    console.log("✓ Same as Present Address checked");
}