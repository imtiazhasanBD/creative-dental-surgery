"use client"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";


const page = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const snapshot = await getDocs(collection(db, "appointments"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.name} - {appt.date} - {appt.time} - {appt.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
