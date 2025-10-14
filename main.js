(() => {
    const rawData = localStorage.getItem("coupleTrackerData");
    console.log(rawData);

    if (rawData) {
        const { yourname, partnername, date } = JSON.parse(rawData);

        const chosenDate = new Date(parseInt(date));
        const month = chosenDate.getMonth();
        const day = chosenDate.getDate();

        document.querySelector("#yourname").value = yourname;
        document.querySelector("#partnername").value = partnername;
        document.querySelector(
            "#date"
        ).value = `${chosenDate.getFullYear()}-${month > 9 ? month : "0" + month
        }-${day > 9 ? day : "0" + day}`;

        document.querySelector("#you").textContent = yourname;
        document.querySelector("#partner").textContent = partnername;

        document.querySelector("#day-num").textContent = Math.floor(
            calculateDaysDiff(chosenDate)
        );

        const ymd = calcuelateYMDDiff(chosenDate);
        setYMDDiff(ymd);

        document.querySelector(".names-container").classList.add("active");
        document.querySelector(".days-container").classList.add("active");
    }
})();

const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", () => {
    const setDate = document.querySelector("#date").value;
    if (setDate === "") {
        return;
    }

    const date = getUTCFromDate(new Date(setDate));

    const you = document.querySelector("#yourname").value;
    const partner = document.querySelector("#partnername").value

    const data = {
        yourname: you === "" ? "❤️" : you,
        partnername: partner === "" ? "❤️" : partner,
        date: date.getTime(),
    };

    saveToLocalStorage(data);

    document.querySelector("#you").textContent = data.yourname;
    document.querySelector("#partner").textContent = data.partnername;

    document.querySelector("#day-num").textContent = Math.floor(
        calculateDaysDiff(date)
    );

    const ymd = calcuelateYMDDiff(date);
    setYMDDiff(ymd);

    document.querySelector(".names-container").classList.add("active");
    document.querySelector(".days-container").classList.add("active");
});

function saveToLocalStorage(data = {}) {
    localStorage.setItem("coupleTrackerData", JSON.stringify(data));
}

function calculateDaysDiff(date = new Date()) {
    const currentTimeStamp = new Date().getTime();
    const chosenTimeStamp = date.getTime();
    return (currentTimeStamp - chosenTimeStamp) / 1000 / 60 / 60 / 24;
}

function calcuelateYMDDiff(date = new Date()) {
    const fromDate = date;
    const toDate = new Date();
    let years = toDate.getFullYear() - fromDate.getFullYear();
    let months = toDate.getMonth() - fromDate.getMonth();
    let days = toDate.getDate() - fromDate.getDate();

    if (days < 0) {
        months -= 1;
        // Vegyük az előző hónap utolsó napját
        const prevMonth = new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            0
        );
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}

function setYMDDiff(ymd = { years: 0, months: 0, days: 0 }) {
    document.querySelector("#y-num").textContent = ymd.years;
    document.querySelector("#m-num").textContent = ymd.months;
    document.querySelector("#d-num").textContent = ymd.days;
}

function getUTCFromDate(date = new Date()) {
    const UTCDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    return UTCDate;
}
