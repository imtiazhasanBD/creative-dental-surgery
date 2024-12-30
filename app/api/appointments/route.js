import { NextResponse } from "next/server";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import nodemailer from "nodemailer";

const COLLECTION_NAME = "appointments";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Error: 'date' parameter is missing in the request URL." },
      { status: 400 }
    );
  }

  try {
    const collectionRef = collection(db, COLLECTION_NAME);
    const appointmentsSnapshot = await getDocs(
      query(collectionRef, where("date", "==", date))
    );

    const appointments = appointmentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Error fetching appointments." },
      { status: 500 }
    );
  }
}




export async function POST(request) {
  try {
    const collectionRef = collection(db, COLLECTION_NAME);
    const body = await request.json();
    const { name, email, date, time } = body;

    // Check for existing appointments
    const existingAppointments = await getDocs(
      query(collectionRef, where('date', '==', date), where('email', '==', email))
    );

    if (!existingAppointments.empty) {
      return NextResponse.json(
        { message: 'You already booked an appointment for that date.' },
        { status: 400 }
      );
    }

    // Add appointment to Firestore
    await addDoc(collectionRef, {
      ...body,
      createdAt: new Date(),
    });

    // Configure email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL_USER,
      to: email,
      subject: 'Appointment Confirmation',
      text: `Dear ${name},\n\nYour appointment has been booked successfully!\n\nDate: ${date}\nTime: ${time}\n\nThank you!\nDental Clinic`,
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Appointment created and email sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the appointment.' },
      { status: 500 }
    );
  }
}