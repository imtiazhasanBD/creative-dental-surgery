const fetchAvailableSlots = async (selectedDate) => {
  try {
    const response = await fetch(`/api/appointments?date=${selectedDate}`);
    const appointments = await response.json();

    const bookedTimes = appointments.appointments.map(appt => appt.time);
    let allSlots = ["4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM",
    ];

    const fridayExtraSlots = ["10:00 AM", "10:30 AM","11:00 AM","11:30 AM","12:00 PM"];

    const isFriday = (selectedDate) => {
      const date = new Date(selectedDate); 
      return date.getDay() === 5; 
    };
    
    if (isFriday(selectedDate)) {
      allSlots = [...fridayExtraSlots, ...allSlots]; 
    }
    
    return allSlots.filter(slot => !bookedTimes.includes(slot));
  } catch (error) {
    console.error("Error fetching available slots: ", error);
    return [];
  }
};
export default fetchAvailableSlots;