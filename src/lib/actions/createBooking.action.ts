"use server";

import { nanoid } from "nanoid";
import {
  CreateBookingFormDto,
  CreateBookingOutboundDto,
} from "../types/booking.type";
import { makeRequest } from "../utils/makeSTRequest.util";
import { serviceTitanConfig } from "../config/serviceTitan.config";

export async function createBooking(formData: FormData) {
  try {
    // Extract and validate form data
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const street = formData.get("street")?.toString().trim();
    const city = formData.get("city")?.toString().trim();
    const state = formData.get("state")?.toString().trim();
    const zip = formData.get("zip")?.toString().trim();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !state ||
      !zip
    ) {
      throw new Error("All fields are required.");
    }

    const bookingInboundDto: CreateBookingFormDto = {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      state,
      zip,
    };

    // Map Form DTO to outbound DTO expected by ServiceTitan API
    const bookingOutboundDto: CreateBookingOutboundDto = {
      // These additional properties are required by Service Titan
      // We can change these to be dynamic eventually, but for now, we'll hardcode them
      source: "Website",
      summary: "New booking request",
      isFirstTimeClient: true,
      externalId: nanoid(),
      // These properties are mapped from the form data
      name: `${bookingInboundDto.firstName} ${bookingInboundDto.lastName}`,
      address: {
        street: bookingInboundDto.street,
        city: bookingInboundDto.city,
        state: bookingInboundDto.state,
        zip: bookingInboundDto.zip,
        country: "USA",
      },
      contacts: [
        { type: "Email", value: bookingInboundDto.email },
        { type: "Phone", value: bookingInboundDto.phone },
      ],
    };

    // Make API request to create booking
    await makeRequest({
      url: `https://api.servicetitan.io/crm/v2/tenant/${serviceTitanConfig.tenantId}/booking-provider/${serviceTitanConfig.bookingProviderId}/bookings`,
      method: "POST",
      body: bookingOutboundDto,
    });

    // Return a success message
    return {
      success: true,
      message: "Booking created successfully.",
    };
  } catch (error: any) {
    console.error("Error creating booking:", error);

    // Return the error message to the client
    return {
      success: false,
      message: error.message || "An error occurred while creating the booking.",
    };
  }
}
