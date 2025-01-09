"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { PiCalendarDotsBold } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { addDays, format } from "date-fns";
import Image from "next/image";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import fetchAvailableSlots from "../utility/fetchAvailableSlots";
import { CiEdit } from "react-icons/ci";
import { MdEditCalendar } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";

export default function AppointmentForm() {
  const [date, setDate] = useState(addDays(new Date(), 1)); // Tomorrow's date
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast()

  let allSlots = [
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ];

  const fridayExtraSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
  ];

  const isFriday = (date) => {
    const dateF = new Date(date);
    return dateF.getDay() === 5;
  };

  if (isFriday(date)) {
    allSlots = [...fridayExtraSlots, ...allSlots];
  }

  useEffect(() => {
    if (date) {
      const loadAvailableSlots = async () => {
        const slots = await fetchAvailableSlots(
          format(new Date(date), "yyyy-MM-dd")
        );
        setAvailableSlots(slots);
      };
      loadAvailableSlots();
    }
  }, [date]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be a valid number")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const dataToSubmit = {
      ...values,
      date: format(new Date(date), "yyyy-MM-dd"),
      time: selectedSlot,
    };

    if (!date || !selectedSlot) {
      setMessage("Please select a valid date and time.");
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        resetForm();
        setDate(addDays(new Date(), 1));
        setSelectedSlot("");
        setShowModal(true); 
      } else {
        setMessage(result.message || "Failed to book the appointment.");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const isPastDay = (day) => day <= new Date();

     // Lock and unlock scroll based on selectedImage state
     useEffect(() => {
      if (showModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [showModal]);

  return (
    <section id="appointment" className="p-2 lg:p-16 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-xl uppercase font-bold text-customBlue mb-4 flex items-center justify-center gap-1">
          <Image src="/logo.webp" alt="logo" width={30} height={20} />
          Appointment
        </h2>
        <h2 className="text-2xl md:text-5xl font-bold text-gray-800">
          Book Your Appointment
        </h2>
        <p className="text-gray-600 mt-2">
          Schedule your visit and achieve your best smile
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="bg-blue-50 shadow-lg rounded-lg p-10 lg:ml-8 w-full lg:w-1/2">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Fill Out the Form
          </h3>
          {/* <p className="text-sm text-red-400 text-center">{message}</p> */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              reason: "",
              time: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Full Name
                  </label>
                  <Field
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-sm text-red-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <Field
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-sm text-red-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <Field
                    name="phone"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="text-sm text-red-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reason"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Reason for Visit
                  </label>
                  <Field
                    as="select"
                    name="reason"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select a reason</option>
                    <option value="Checkup">Routine Checkup</option>
                    <option value="Cleaning">Teeth Cleaning</option>
                    <option value="Whitening">Teeth Whitening</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="reason"
                    component="span"
                    className="text-sm text-red-400"
                  />
                </div>

                <Dialog>
                  <DialogTrigger>
                    <button
                      type="button"
                      className="w-full flex gap-1 items-center py-2  text-blue-600 font-medium"
                    >
                      {selectedSlot
                        ? `Selected: ${format(
                            new Date(date),
                            "yyyy-MM-dd"
                            
                          )} ${selectedSlot}`
                        : "Set Date & Time"}
                       {selectedSlot && <CiEdit className="text-blue-500" /> }
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select Date & Time</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*date picker */}
                        <div>
                          <h2 className="flex items-center gap-2 font-semibold">
                            <PiCalendarDotsBold className="h-6 w-6 text-blue-600" />
                            Select Date
                          </h2>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={isPastDay}
                            className="rounded-md border w-full mt-3"
                          />
                        </div>
                        <div>
                          <h2 className="flex items-center gap-2 font-semibold">
                            <FiClock className="h-6 w-6 text-blue-600" />
                            Select Time Slot
                          </h2>
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            {allSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                disabled={!availableSlots.includes(slot)}
                                className={`py-2 px-3 border rounded-md font-semibold ${
                                  selectedSlot === slot
                                    ? "bg-blue-600 text-white"
                                    : "border-gray-300 "
                                } ${
                                  availableSlots.includes(slot)
                                    ? ""
                                    : "text-gray-300 border-gray-200 disabled:cursor-not-allowed"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-customBlue text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  {isSubmitting ? "Booking..." : "Book Appointment"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="flex flex-col items-center my-auto lg:w-1/2">
          <Image
            src="/schedule-doctor-appointment.png"
            alt="Dentist illustration"
            width={400}
            height={400}
          />
          <h3 className="text-2xl font-bold text-customBlue mt-6">
            Convenient Timings
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            Our clinic is open from <strong>Saturday to Thursday</strong> at{" "}
            <strong>4:00 PM to 10:00 PM</strong> and <strong>Friday</strong> at{" "} <strong>10:00 AM to 1:00 PM</strong> And <strong>5:00 PM to 10:00 PM</strong> on weekdays.
          </p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Image src="/animated-check.gif" height={80} width={80} alt="successful" className="mx-auto"/>
            <h2 className="text-lg font-bold mb-4 text-gray-700">Your Appointment booked successfully!</h2>
            <h2 className="text-sm font-medium mb-4 text-gray-500">We have sent your booking information to your email address.</h2>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>

    // <form
    //   onSubmit={handleSubmit}
    //   className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    // >
    //   <h2 className="text-3xl font-bold text-center mb-8">
    //     Book Your Appointment
    //   </h2>
    //   <h2 className="text-base text-center font-bold mb-4">
    //     Select a convenient time for your visit
    //   </h2>
    //   {message && <p className="mb-4 text-center text-red-500">{message}</p>}

    //   <div className="mb-4">
    //     <label className="block mb-2 font-medium">Name</label>
    //     <input
    //       type="text"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       required
    //       className="w-full p-2 border border-gray-300 rounded-md"
    //     />
    //   </div>

    //   <div className="mb-4">
    //     <label className="block mb-2 font-medium">Email</label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //       className="w-full p-2 border border-gray-300 rounded-md"
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block mb-2 font-medium">Phone Number</label>
    //     <input
    //       type="text"
    //       name="phone"
    //       value={formData.phone}
    //       onChange={handleChange}
    //       required
    //       className="w-full p-2 border border-gray-300 rounded-md"
    //     />
    //   </div>
    //   {date && selectedSlot && (
    //     <div className="mb-4 bg-blue-100 p-3 rounded-md border border-blue-300">
    //       <p className="text-sm font-medium text-blue-800">
    //         Selected Date & Time:
    //       </p>
    //       <p className="text-lg font-semibold text-blue-900">
    //         {format(new Date(date), 'yyyy-MM-dd')} {selectedSlot}
    //       </p>
    //     </div>
    //   )}
    //   <Dialog>
    //     <DialogTrigger>
    //       <button
    //         type="button"
    //         className="py-2 px-4  text-customBlue font-bold rounded-md flex items-center justify-center gap-3"
    //       >
    //         Set Date & Time
    //        <TbSelector />
    //       </button>
    //     </DialogTrigger>
    //     <DialogContent>
    //       <DialogHeader>
    //         <DialogTitle>
    //           {date && selectedSlot
    //             ? "Select Date & Time"
    //             : "Change Date & Time"}
    //         </DialogTitle>
    //       </DialogHeader>
    //       <DialogDescription>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
    //           {/* Date Picker */}
    //           <div className="flex flex-col gap-3">
    //             <h2 className="flex items-center gap-2 font-semibold">
    //               <PiCalendarDotsBold className="h-6 w-6 text-blue-600" />
    //               Select Date
    //             </h2>
    //             <Calendar
    //               mode="single"
    //               selected={date}
    //               onSelect={setDate}
    //               disabled={isPastDay}
    //               className="rounded-md border w-full"
    //             />
    //           </div>

    //           {/* Time Slot Selection */}
    //           <div>
    //             <h2 className="flex items-center gap-2 font-semibold">
    //               <FiClock className="h-6 w-6 text-blue-600" />
    //               Select Time Slot
    //             </h2>
    //             <div className="grid grid-cols-3 gap-2 mt-3">
    //               {allSlots.map((slot) => (
    //                 <button
    //                   type="button"
    //                   disabled={!availableSlots.includes(slot)}
    //                   key={slot}
    //                   onClick={() => setSelectedSlot(slot)}
    //                   className={`py-2 px-3 border rounded-md font-semibold ${
    //                     selectedSlot === slot
    //                       ? "bg-blue-600 text-white"
    //                       : "border-gray-300"
    //                   } ${availableSlots.includes(slot) ? "" : "text-gray-300 border-gray-200 disabled:cursor-not-allowed"}`}
    //                 >
    //                   {slot}
    //                 </button>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </DialogDescription>
    //     </DialogContent>
    //   </Dialog>

    //   <button
    //     type="submit"
    //     className="w-full p-3 bg-customBlue text-white font-bold rounded-md mt-8"
    //   >
    //     Book Appointment
    //   </button>
    // </form>
  );
}
