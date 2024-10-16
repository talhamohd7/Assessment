export function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  // Get the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year
  const todayMonth = today.getMonth();
  const birthMonth = birthDate.getMonth();

  if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Handle NaN or negative age
  return isNaN(age) || age < 0 ? 0 : age;
}

export const getDayName = (day) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
};

export const getDayIndex = (dayAbbreviation) => {
  switch (dayAbbreviation) {
    case "Sun":
      return 0;
    case "Mon":
      return 1;
    case "Tue":
      return 2;
    case "Wed":
      return 3;
    case "Thu":
      return 4;
    case "Fri":
      return 5;
    case "Sat":
      return 6;
    default:
      return -1;
  }
};

export const changeAppoitmentStatus = (status) =>{
  switch (status) {
    case "1":
      return { status: "Pending", color: "#4A4159" };
    case "2":
      return {status: "Complete", color:"#79A808"};
    default:
      return {status: "", color:"#000000"};
  }
}

export function getReportType(value) {
  switch (value) {
      case 1:
          return "Brief";
      case 2:
          return "Intervention";
      case 3:
          return "Assessment";
      case 4:
          return "Activities";
      default:
          return "Unknown MB Type";
  }
}

export function convertTo12HourFormat(time24) {
  if(!time24){
    return time24;
  }
  const [hours, minutes] = time24.split(':');

  let hours12 = parseInt(hours, 10);
  const ampm = hours12 >= 12 ? 'PM' : 'AM';
  hours12 = hours12 % 12 || 12;

  const time12 = `${hours12}:${minutes} ${ampm}`;
  
  return time12;
}

export function getformatedDate(inputDate) {
  const dateObject = new Date(inputDate);
  
  if (isNaN(dateObject.getTime())) {
    return 'Invalid date';
  }

  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(dateObject.getFullYear());

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export function getNamedDate(dateString) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const parts = dateString.split("-");
  const day = parseInt(parts[2], 10);
  const monthIndex = parseInt(parts[1], 10) - 1; // Adjust month index to match array
  const year = parseInt(parts[0], 10);

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;
  return formattedDate;
}