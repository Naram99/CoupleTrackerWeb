console.log("start");

function loadFromLocalStorage() {
    const rawData = localStorage.getItem("coupleTrackerData");
    console.log(rawData);

    if (rawData) {
        const { yourname, partnername, date } = JSON.parse(rawData);

        const chosenDate = new Date(parseInt(date));

        document.querySelector("#yourname").value = yourname;
        document.querySelector("#partnername").value = partnername;
        document.querySelector(
            "#date"
        ).value = `${chosenDate.getFullYear()}-${chosenDate.getMonth()}-${chosenDate.getDate()}`;

        document.querySelector("#you").textContent = yourname;
        document.querySelector("#partner").textContent = partnername;

        document.querySelector(".names-container").classList.add("active");
        document.querySelector(".days-container").classList.add("active");
    }
}

loadFromLocalStorage();

const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", () => {
    const setDate = document.querySelector("#date").value;
    if (setDate === "") {
        return;
    }

    const date = getUTCFromDate(new Date(setDate));

    const data = {
        yourname: document.querySelector("#yourname").value,
        partnername: document.querySelector("#partnername").value,
        date: date.getTime(),
    };

    saveToLocalStorage(data);

    document.querySelector("#you").textContent = data.yourname;
    document.querySelector("#partner").textContent = data.partnername;

    document.querySelector("#day-num").textContent = Math.floor(
        calculateDaysDiff(date)
    );
    calcuelateYMDDiff(date);

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

function calcuelateYMDDiff(date = new Date()) {}

function getUTCFromDate(date = new Date()) {
    const UTCDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    return UTCDate;
}
