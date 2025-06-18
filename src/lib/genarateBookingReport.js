import jsPDF from "jspdf";

function generateBookingReport({ booking, guest, room, billing }) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Booking Confirmation Report", 10, 15);

  doc.setFontSize(12);
  doc.text(`Booking Reference: ${booking.reference || "N/A"}`, 10, 30);
  doc.text(`Booking Date: ${new Date().toLocaleString()}`, 10, 38);

  doc.text("Guest Information:", 10, 50);
  doc.text(`Name: ${guest.firstName} ${guest.lastName}`, 12, 58);
  doc.text(`Email: ${guest.email}`, 12, 66);
  doc.text(`Phone: ${guest.phone}`, 12, 74);
  doc.text(
    `Address: ${guest.address1} ${guest.address2}, ${guest.city}, ${guest.state}`,
    12,
    82
  );

  doc.text("Room Details:", 10, 96);
  doc.text(`Room Number: ${room.roomNumber}`, 12, 104);
  doc.text(`Category: ${room.category.name}`, 12, 112);
  doc.text(`Features: ${room.category.features?.join(", ") || "N/A"}`, 12, 120);

  doc.text("Stay Details:", 10, 134);
  doc.text(`Check-in: ${booking.checkInDate}`, 12, 142);
  doc.text(`Check-out: ${booking.checkOutDate}`, 12, 150);
  doc.text(
    `Adults: ${booking.numberOfAdults}, Children: ${booking.numberOfChildren}`,
    12,
    158
  );

  doc.text("Billing:", 10, 172);
  doc.text(`Total Price: ₹${booking.totalPrice}`, 12, 180);
  doc.text(
    `Payment Method: ${
      billing.cardNumber ? "Card (" + billing.cardNumber.slice(-4) + ")" : "N/A"
    }`,
    12,
    188
  );
  doc.text(
    `Billing Address: ${billing.address}, ${billing.city}, ${billing.state}, ${billing.zip}`,
    12,
    196
  );

  doc.text("Hotel Policy:", 10, 210);
  doc.text("Check-in after 2:00 PM. Cancellation policy applies.", 12, 218);

  doc.save("booking-report.pdf");
}

export default generateBookingReport;
