"use client";

import { db } from "@/app/firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); 
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [Allappointments, setAllAppointments] = useState([]);
  // Use useRef to store lastVisibleDoc to avoid unnecessary re-renders
  const lastVisibleDocRef = useRef(null);

  // Fetch total appointment count for pagination
  useEffect(() => {
    const fetchTotalAppointments = async () => {
      try {
        const snapshot = await getDocs(collection(db, "appointments"));
        setTotalAppointments(snapshot.size);
      } catch (error) {
        console.error("Error fetching total appointments: ", error);
        setError("Failed to fetch total appointments.");
      }
    };

    fetchTotalAppointments();
  }, []);

  // Fetch appointments for the current page
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(""); // Clear any previous errors

      const q = query(
        collection(db, "appointments"),
        orderBy("createdAt", "desc"),
        limit(pageSize),
        ...(currentPage > 1 && lastVisibleDocRef.current
          ? [startAfter(lastVisibleDocRef.current)]
          : [])
      );

      try {
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(data);

        // Update lastVisibleDocRef with the last document from the current page
        lastVisibleDocRef.current = snapshot.docs[snapshot.docs.length - 1];
      } catch (error) {
        console.error("Error fetching appointments: ", error);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentPage]); 

  // Cancel Appointment Function
  const cancelAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error("Error canceling appointment: ", error);
      setError("Failed to cancel the appointment.");
    }
  };

    // Filter appointments based on search query and selected date
    const filteredAppointments = appointments.filter((appointment) => {
      const matchesNameOrPhone =
        appointment.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.phone?.includes(searchQuery);
  
      const matchesDate = !selectedDate || appointment.date === selectedDate;
  
      return matchesNameOrPhone && matchesDate;
    });

      const totalPages = Math.ceil(totalAppointments / pageSize);

  return (
    <section className="bg-gray-50 py-10 px-6 md:px-12 lg:px-24">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Appointments Dashboard
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            {/* Search by Name or Phone */}
            <input
              type="text"
              placeholder="Search by Name or Phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Filter by Date */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      {/* Error Message */}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <Loading/>
        ) : appointments.length === 0 ? (
          <div className="text-center py-8">No appointments found.</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-medium">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Reason for Visit</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Book Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Time</th>
                <th className="px-6 py-3 text-center text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {appointment.createdAt?.toDate().toLocaleDateString() || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{appointment.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.reason}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.time}</td>
                  <td className="px-6 py-4 text-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently delete the appointment.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === pageIndex + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminAppointments;
