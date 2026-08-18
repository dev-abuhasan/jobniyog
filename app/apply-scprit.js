const autoFillData = {
    name: "Abu Hasan",
    name_bn: "আবু হাসান",
    father: "Motiar Rahman",
    father_bn: "মতিয়ার রহমান",
    mother: "Swapna begum",
    mother_bn: "স্বপ্না বেগম",
    dob: "2001-10-20",
    nationality: "Bangladeshi",
    religion: "1", // Islam
    gender: "Male",
    nid: "1", // Yes
    nid_no: "3760912760",
    breg: "1", // Yes
    breg_no: "20011018877114792",
    passport: "1", // Yes
    passport_no: "A07493271",
    marital_status: "Married",
    spouse_name: "MST. SALMA KHATUN",
    mobile: "01816583642",
    confirm_mobile: "01816583642",
    email: "dev.abuhasan@gmail.com",
    quota: "8", // Not Applicable
    dep_status: "5", // Not Applicable
    present_careof: "Abu saied AKNDA",
    present_village: "DHORMOKAM, SERUA, SHERPUR, SHERPUR - 5840, BOGURA",
    present_district: "10", // Bogura
    present_upazila: "74", // Sherpur
    present_post: "Sherpur",
    present_postcode: "5840",
    ssc_exam: "1", // S.S.C
    ssc_roll: "156270",
    ssc_group: "1", // Science
    ssc_board: "19", // Rajshahi
    ssc_result_type: "5", // GPA
    ssc_result: "4.00",
    ssc_year: "2017",
    hsc_exam: "1", // H.S.C
    hsc_roll: "126698",
    hsc_group: "1", // Science
    hsc_board: "19", // Rajshahi
    hsc_result_type: "5", // GPA
    hsc_result: "3.83",
    hsc_year: "2019",
    employment_type: "8", // Private Organization
    designation: "Software Engineer",
    job_start_date: "2023-05-02",
    organization: "Arogga LTD",
    office_address: "AROGGA LTD. D/15-1, R-36, B-D, SEC-10",
    job_description: "Arogga stands as a premier e-commerce entity in Bangladesh, renowned for its online presence. As a seasoned software developer dedicated to enhancing Arogga's digital landscape, I specialize in crafting cutting-edge solutions spanning websites, mobile applications, and beyond.",
    nameType: {
        "job[1][employment_type]": "8", // Private Organization
        "job[1][designation]": "Software Engineer",
        "job[1][job_start_date]": "2022-02-01",
        "job[1][job_end_date]": "2023-04-30",
        "job[1][organization]": "TechStone LTD",
        "job[1][office_address]": "Flat 11-A, House11, Road: 14, Sobhanbag Dhanmondi, Dhaka-1209",
        "job[1][job_description]": "TechStone is a leading ITES Company in Bangladesh, working for the Digital Automaton of Education. It serves Educational Institutes Such as School, College, Madrasha through its own Developed web/Cloud software D Campus",
    },
    "other_exp[0][value]": "Yes"
};


const setValueForElement = (element, value, identifier) => {
    if (element) {
        console.log(`Setting value for: ${identifier}`);
        element.value = value;
        element.dispatchEvent(new Event("change"));
    } else {
        console.warn(`Element with identifier "${identifier}" not found`);
    }
};

for (const [id, value] of Object.entries(autoFillData)) {
    if (id === "nameType") {
        for (const [name, nameValue] of Object.entries(value)) {
            const element = document.querySelector(`[name="${name}"]`);
            setValueForElement(element, nameValue, name);
        }
    } else {
        const element = document.getElementById(id);
        setValueForElement(element, value, id);
    }
}

