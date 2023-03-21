
const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'John', 'Katie', 'Leo', 'Mary', 'Nick', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sarah', 'Tom', 'Ursula', 'Victoria', 'Wendy', 'Xander', 'Yara', 'Zach'];
const lastNames = ['Anderson', 'Brown', 'Chen', 'Davis', 'Evans', 'Fisher', 'Garcia', 'Harris', 'Isaacs', 'Johnson', 'Kim', 'Lopez', 'Miller', 'Nguyen', 'Owens', 'Patel', 'Robinson', 'Smith', 'Taylor', 'Unger', 'Vargas', 'White', 'Xiong', 'Yang', 'Zhang'];
const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Moscow', 'Mumbai', 'Rio de Janeiro', 'Toronto', 'Shanghai', 'Seoul', 'Dubai', 'Singapore', 'Hong Kong', 'Barcelona', 'Rome', 'Los Angeles', 'San Francisco', 'Cape Town', 'Vancouver', 'Zurich', 'Amsterdam', 'Vienna', 'Buenos Aires', 'Bangkok', 'Istanbul', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Dublin', 'Edinburgh', 'Brussels', 'Madrid', 'Lisbon', 'Athens', 'Prague', 'Krakow', 'Budapest', 'Warsaw', 'Dubrovnik', 'Reykjavik', 'Havana', 'Mexico City', 'Santiago', 'Bogota', 'Lima', 'Caracas', 'Kuala Lumpur', 'Phnom Penh', 'Hanoi', 'Marrakech', 'Cairo', 'Tel Aviv', 'Jerusalem', 'Beijing', 'Ho Chi Minh City', 'Manila', 'Jakarta', 'New Delhi', 'Kolkata', 'Bengaluru', 'Chennai', 'Hyderabad', 'Islamabad', 'Karachi', 'Lahore', 'Tehran', 'Baghdad', 'Riyadh', 'Jeddah', 'Abu Dhabi', 'Doha', 'Kuwait City', 'Muscat', 'Nairobi', 'Dar es Salaam', 'Cape Town', 'Johannesburg', 'Casablanca', 'Tunis', 'Algiers', 'Accra', 'Lagos', 'Nairobi', 'Dakar', 'Kinshasa', 'Luanda', 'Kigali', 'Yaounde', 'Abidjan', 'Conakry', 'Lubumbashi', 'Freetown'];
const positions = ['CEO', 'COO', 'CFO', 'CTO', 'CMO', 'VP of Sales', 'VP of Marketing', 'VP of Operations', 'Director of Finance', 'Director of HR', 'Project Manager', 'Software Engineer', 'Data Analyst', 'Sales Representative', 'Customer Service Representative'];

const generateNames = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return [firstName, lastName];
}

const generateGender = () => { return Math.round(Math.random()) }

const generateArea = () => {
    return cities[Math.floor(Math.random() * cities.length)]
}
const generatePosition = () => {
    return positions[Math.floor(Math.random() * positions.length)]
}

const generateBirthday = () => {
    const startDate = new Date(1970, 0, 1).getTime();
    const endDate = new Date(2000, 11, 31).getTime();
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    const dateString = randomDate.toISOString().slice(0, 10);

    return dateString;
}

const generateHiringdate = () => {

    const startDate = new Date(2015, 0, 1).getTime();
    const endDate = new Date(2022, 11, 31).getTime();
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    const dateString = randomDate.toISOString().slice(0, 10);

    return dateString;
}

const generateRandomNumber = (min, max) => {
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum;
}

const generatePhilhealth = () => {
    const min = 100000000000;
    const max = 999999999999;
    return generateRandomNumber(min, max);
}

const generatePagibid = () => {
    const min = 100000000000;
    const max = 999999999999;
    return generateRandomNumber(min, max);
}
const generateTin = () => {
    const min = 100000000000;
    const max = 999999999999;
    return generateRandomNumber(min, max);
}
const generateSSID = () => {
    const min = 100000000000;
    const max = 999999999999;
    return generateRandomNumber(min, max);
}
const generateCompany = () => {
    const min = 1;
    const max = 25;
    return generateRandomNumber(min, max);
}
const generateRate = () => {
    const min = 250;
    const max = 3500;
    return generateRandomNumber(min, max);
}
const generateStatus = () => {
    const status = [100, 300, 500]

    return status[Math.floor(Math.random() * status.length)]
}

module.exports = {
    names: generateNames,
    area: generateArea,
    position: generatePosition,
    birthday: generateBirthday,
    gender: generateGender,
    philhealth: generatePhilhealth,
    hiringdate: generateHiringdate,
    pagibid: generatePagibid,
    tin: generateTin,
    ssid: generateSSID,
    company: generateCompany,
    rate: generateRate,
    status: generateStatus
}