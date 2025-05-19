import * as z from "zod";
import { PropertyTypeEnum, AmenityEnum, HighlightEnum } from "@/lib/constants";

export const propertySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  pricePerMonth: z.coerce.number().positive().min(0).int(),
  securityDeposit: z.coerce.number().positive().min(0).int(),
  applicationFee: z.coerce.number().positive().min(0).int(),
  isPetsAllowed: z.boolean(),
  isParkingIncluded: z.boolean(),
  photoUrls: z
    .array(z.instanceof(File))
    .min(1, "At least one photo is required"),
  amenities: z
    .array(z.enum(AmenityEnum))
    .min(1, "At least one amenity is required"),
  highlights: z
    .array(z.enum(HighlightEnum))
    .min(1, "At least one highlight is required"),

  beds: z.coerce.number().positive().min(0).max(10).int(),
  baths: z.coerce.number().positive().min(0).max(10).int(),
  squareFeet: z.coerce.number().int().positive(),
  propertyType: z.nativeEnum(PropertyTypeEnum),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),

  yearBuilt: z.coerce.number().int().min(1800).max(new Date().getFullYear()),
  availableFrom: z.coerce.date(),
  floorNumber: z.coerce.number().int().min(0),
  totalFloors: z.coerce.number().int().min(1),
  leaseTerm: z.string().min(1, "Lease term is required"),

  availabilityStatus: z.enum(["Active", "Rented", "UnderOffer"]),

  locationDescription: z.string().optional(),
  nearbySchools: z.string().optional(),
  nearbyHospitals: z.string().optional(),
  nearbyTransit: z.string().optional(),
  nearbyShopping: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
  preferredMoveInDate: z.string().optional(),
  employmentStatus: z
    .enum(["Employed", "Unemployed", "Student", "Retired"])
    .optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  profilePhoto: z.string().url().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
