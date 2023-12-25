function getProcessTime(scrapes) {

    const avgScrapeTime = 3.4043;

    let seconds = Math.round(scrapes * avgScrapeTime);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);
    hours = hours - (days * 24);

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

module.exports = getProcessTime;