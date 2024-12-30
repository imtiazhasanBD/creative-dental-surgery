import { Firestore } from "firebase/firestore";


const COLLECTION_NAME = 'appointments'; // Firestore collection

export default async function handler(req, res) {
  try {
    const collection = Firestore.collection(COLLECTION_NAME);

    if (req.method === 'POST') {
      const { name, email, date, time } = req.body;

      // Validate input
      if (!name || !email || !date || !time) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      const appointmentSlot = `${date} ${time}`;

      // Check if the slot is already booked
      const existing = await collection.where('slot', '==', appointmentSlot).get();
      if (!existing.empty) {
        return res.status(400).json({ message: 'This slot is already booked.' });
      }

      // Save the appointment
      await collection.add({
        name,
        email,
        date,
        time,
        slot: appointmentSlot,
        confirmed: false, // To confirm manually by admin
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({ message: 'Appointment booked successfully!' });
    }

    if (req.method === 'GET') {
      const snapshot = await collection.get();
      const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(appointments);
    }

    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
