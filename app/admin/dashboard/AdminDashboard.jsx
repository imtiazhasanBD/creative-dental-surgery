"use client";

import { db } from "@/app/firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminRoute from "./AdminRoute";
import Link from "next/link";
import Image from "next/image";
import Loading from "./Loading";
import AdminAppointments from "./AdminAppointments";


const AdminDashBoard = () => {
  const [stats, setStats] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0,
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [activeSection, SetActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const today = new Date();
        const startOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const appointmentsRef = collection(db, "appointments");

        // Fetch total counts
        const [todayCount, weekCount, monthCount, yearCount] =
          await Promise.all([
            getDocs(
              query(
                appointmentsRef,
                where("date", "==", format(new Date(), "yyyy-MM-dd"))
              )
            ).then((snap) => snap.size),
            getDocs(
              query(
                appointmentsRef,
                where("date", ">=", format(startOfWeek, "yyyy-MM-dd"))
              )
            ).then((snap) => snap.size),
            getDocs(
              query(
                appointmentsRef,
                where("date", ">=", format(startOfMonth, "yyyy-MM-dd"))
              )
            ).then((snap) => snap.size),
            getDocs(
              query(
                appointmentsRef,
                where("date", ">=", format(startOfYear, "yyyy-MM-dd"))
              )
            ).then((snap) => snap.size),
          ]);

        setStats({
          today: todayCount,
          thisWeek: weekCount,
          thisMonth: monthCount,
          thisYear: yearCount,
        });

        // Fetch today's appointments
        const todaySnapshot = await getDocs(
          query(
            appointmentsRef,
            where("date", "==", format(new Date(), "yyyy-MM-dd"))
          )
        );
        setTodayAppointments(
          todaySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        // Fetch recent appointments
        const recentSnapshot = await getDocs(
          query(appointmentsRef, orderBy("createdAt", "desc"), limit(5))
        );
        setRecentAppointments(
          recentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminRoute>
      <main className="bg-gray-100 max-w-[1400px] mx-auto h-screen">
        <header className="bg-gray-900 px-6 md:px-12 lg:px-24 py-4 space-x-10 flex items-center">
          {/* Logo Section */}
          <Link
            onClick={() => SetActiveSection("dashboard")}
            href="/admin/dashboard"
          >
            <div className="flex items-center">
              <Image src="/logo.webp" alt="logo" width={40} height={40} />
            </div>
          </Link>
          <div className="flex gap-8">
            <h2
              onClick={() => SetActiveSection("dashboard")}
              className={`text-base font-medium text-white ${
                activeSection === "dashboard"
                  ? "border-b-2 border-customBlue"
                  : ""
              } cursor-pointer`}
            >
              Dashboard
            </h2>
            <h2
              onClick={() => SetActiveSection("appointments")}
              className={`text-base font-medium text-white ${
                activeSection === "appointments"
                  ? "border-b-2 border-customBlue"
                  : ""
              } cursor-pointer`}
            >
              Appointments
            </h2>
          </div>
        </header>
        {activeSection === "dashboard" && (
          <section className="p-6 space-y-6 px-6 md:px-12 lg:px-24">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-blue-100 text-customBlue">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    {stats.today}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-center">
                    Today's Appointments
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-100 text-customBlue">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    {stats.thisWeek}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-center">This Week</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-100 text-customBlue">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    {stats.thisMonth}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-center">This month</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-100 text-customBlue">
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    {stats.thisYear}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-center">This Year</p>
                </CardContent>
              </Card>
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Appointments Table */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-customBlue">
                      Today's Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {todayAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        No appointments found.
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Reason</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {todayAppointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell>{appointment.name}</TableCell>
                              <TableCell>{appointment.phone}</TableCell>
                              <TableCell>{appointment.time}</TableCell>
                              <TableCell>{appointment.reason}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recently Booked Appointments Table */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-customBlue">
                      Recently Booked Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.name}</TableCell>
                            <TableCell>{appointment.date}</TableCell>
                            <TableCell>{appointment.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
        {activeSection === "appointments" && <AdminAppointments />}
      </main>
    </AdminRoute>
  );
};

export default AdminDashBoard;
