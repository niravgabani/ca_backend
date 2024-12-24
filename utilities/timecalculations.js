function timedifferenceinminutes(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    return minutes;
};
async function getMonthlyRanges(startTimestamp, endTimestamp) {
    const result = [];
    const startDate = new Date(parseInt(startTimestamp));
    const endDate = new Date(parseInt(endTimestamp));
    function getMonthStartAndEnd(date) {
        const startOfMonthObj = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonthObj = new Date(date.getFullYear(), date.getMonth() + 1, 0 , 23 , 59 , 59);
        const startOfMonthTimestamp = parseInt(startOfMonthObj.getTime());
        const endOfMonthTimestamp = parseInt(endOfMonthObj.getTime());

        return {
        startTimestamp: startOfMonthTimestamp,
        startDate: new Date(startOfMonthTimestamp),
        endTimestamp: endOfMonthTimestamp,
        endDate: new Date(endOfMonthTimestamp)
        };
    }
    let currentDate = startDate;
    while (currentDate <= endDate) {
        result.push(getMonthStartAndEnd(currentDate));
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        currentDate = new Date(parseInt(currentDate.getTime()));
    }

    return result;
};  
async function generateDateRange(startTimestamp, endTimestamp) {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const dateRange = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(0, 0, 0, 0);
        const startTimestamp = parseInt(startOfDay.getTime());
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);
        const endTimestamp = parseInt(endOfDay.getTime());

        dateRange.push({
        startTimestamp: parseInt(startTimestamp),
        endTimestamp: parseInt(endTimestamp)
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
};  
async function generateDateRangewithdifferenceof3days(startTimestamp, endTimestamp) {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const dateRange = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        let startOfDay = new Date(currentDate.getFullYear() , currentDate.getMonth() , currentDate.getDate() , 0 , 0 , 0 , 0);
        let starttimestamp = parseInt(startOfDay.getTime());
        let newStartOfDay = new Date(starttimestamp);
        let endOfDay = new Date(newStartOfDay.getFullYear() , newStartOfDay.getMonth() , newStartOfDay.getDate() + 2 , 23 , 59 , 59 , 999);
        let endtimestamp =  parseInt(endOfDay.getTime());
        let newEndOfDay = new Date(endtimestamp);
        if(newEndOfDay >= endDate){
            endtimestamp = parseInt(endTimestamp);
        }
        currentDate.setDate(new Date(starttimestamp).getDate() + 3);

        dateRange.push({
        startTimestamp: parseInt(starttimestamp),
        endTimestamp: parseInt(endtimestamp),
        });
    }

    return dateRange;
};  
async function generateDateRangewithdifferenceof5days(startTimestamp, endTimestamp) {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const dateRange = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        let startOfDay = new Date(currentDate.getFullYear() , currentDate.getMonth() , currentDate.getDate() , 0 , 0 , 0 , 0);
        let starttimestamp = parseInt(startOfDay.getTime());
        let newStartOfDay = new Date(starttimestamp);
        let endOfDay = new Date(newStartOfDay.getFullYear() , newStartOfDay.getMonth() , newStartOfDay.getDate() + 4 , 23 , 59 , 59 , 999);
        let endtimestamp =  parseInt(endOfDay.getTime());
        let newEndOfDay = new Date(endtimestamp);
        if(newEndOfDay >= endDate){
        endtimestamp = parseInt(endTimestamp);
        }
        currentDate.setDate(new Date(starttimestamp).getDate() + 5);

        dateRange.push({
        startTimestamp: parseInt(starttimestamp),
        endTimestamp: parseInt(endtimestamp)
        });
    }

    return dateRange;
};
module.exports = { timedifferenceinminutes , getMonthlyRanges , generateDateRange , generateDateRangewithdifferenceof3days , generateDateRangewithdifferenceof5days };