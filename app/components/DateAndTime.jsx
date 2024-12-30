"use client";
import React, { useState } from "react";
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
import { isPast } from "date-fns";

const DateAndTime = () => {
    const [date, setDate] = useState(new Date());
    const allSlots = [
      "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", 
      "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM","8:30 PM", "9:00 PM","9:30 PM", "10:00 PM"
    ];
    const [selectedSlot, setSelectedSlot] = useState("");

    const isPastDay = (day) => {
      return day<=new Date();
    };
  return (
    <Dialog>
      <DialogTrigger>
        <button className="py-4 px-6 text-lg text-white bg-customBlue font-semibold">
          Set Date & Time
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>

          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {/* Date */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex items-center gap-2  font-semibold">
                    <PiCalendarDotsBold className="h-6 w-6 text-customBlue" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border w-full"
                  />
                </div>
                {/* Time */}
                <div>
                <h2 className="flex items-center gap-2  font-semibold">
                    <FiClock className="h-6 w-6 text-customBlue" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mt-3 md:border md:p-3">
                    {allSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 border font-semibold rounded-md ${ selectedSlot === slot ? "bg-customBlue text-white" : "border-gray-300"}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DateAndTime;
