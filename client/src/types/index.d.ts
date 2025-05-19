import { LucideIcon } from "lucide-react";
import { AuthUser } from "aws-amplify/auth";
import { Manager, Tenant, Property, Application } from "./prismaTypes";
import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

declare global {
  enum AmenityEnum {
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Dishwasher = "Dishwasher",
    HighSpeedInternet = "HighSpeedInternet",
    HardwoodFloors = "HardwoodFloors",
    WalkInClosets = "WalkInClosets",
    Microwave = "Microwave",
    Refrigerator = "Refrigerator",
    Pool = "Pool",
    Gym = "Gym",
    Parking = "Parking",
    PetsAllowed = "PetsAllowed",
    WiFi = "WiFi",

    Heating = "Heating",
    CableReady = "CableReady",
    SatelliteTV = "SatelliteTV",
    SmokeFree = "SmokeFree",
    WheelchairAccessible = "WheelchairAccessible",
    BalconyOrPatio = "BalconyOrPatio",
    Fireplace = "Fireplace",
    SecuritySystem = "SecuritySystem",
    Elevator = "Elevator",
    Furnished = "Furnished",
    Storage = "Storage",
    LaundryFacilities = "LaundryFacilities",
    CommunityLounge = "CommunityLounge",
    BusinessCenter = "BusinessCenter",
    Playground = "Playground",
    BarbecueArea = "BarbecueArea",
    TennisCourt = "TennisCourt",
    Clubhouse = "Clubhouse",
    Spa = "Spa",
    RooftopAccess = "RooftopAccess",

    FireExtinguisher = "FireExtinguisher",
    SmokeDetectors = "SmokeDetectors",
    SolarPanels = "SolarPanels",
    Garden = "Garden",
    SecurityCameras = "SecurityCameras",
  }

  enum HighlightEnum {
    HighSpeedInternetAccess = "HighSpeedInternetAccess",
    WasherDryer = "WasherDryer",
    AirConditioning = "AirConditioning",
    Heating = "Heating",
    SmokeFree = "SmokeFree",
    CableReady = "CableReady",
    SatelliteTV = "SatelliteTV",
    DoubleVanities = "DoubleVanities",
    TubShower = "TubShower",
    Intercom = "Intercom",
    SprinklerSystem = "SprinklerSystem",
    RecentlyRenovated = "RecentlyRenovated",
    CloseToTransit = "CloseToTransit",
    GreatView = "GreatView",
    QuietNeighborhood = "QuietNeighborhood",

    WheelchairAccessible = "WheelchairAccessible",
    BalconyOrPatio = "BalconyOrPatio",
    Fireplace = "Fireplace",
    PrivateEntrance = "PrivateEntrance",
    SmartHomeFeatures = "SmartHomeFeatures",
    EnergyEfficientAppliances = "EnergyEfficientAppliances",
    GatedCommunity = "GatedCommunity",
    RooftopAccess = "RooftopAccess",
    SecureParking = "SecureParking",
    OnSiteManagement = "OnSiteManagement",
    PetFriendly = "PetFriendly",

    NearSchool = "NearSchool",
    NearHospital = "NearHospital",
  }

  enum PropertyTypeEnum {
    Rooms = "Rooms",
    TinyHouse = "TinyHouse",
    Apartment = "Apartment",
    Villa = "Villa",
    Townhouse = "Townhouse",
    Cottage = "Cottage",

    Studio = "Studio",
    Duplex = "Duplex",
    Penthouse = "Penthouse",
    Bungalow = "Bungalow",
    Farmhouse = "Farmhouse",
    CoLivingSpace = "CoLivingSpace",
  }

  interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
  }

  interface ContactWidgetProps {
    onOpenModal: () => void;
  }

  interface ImagePreviewsProps {
    images: string[];
  }

  interface PropertyDetailsProps {
    propertyId: number;
  }

  interface PropertyOverviewProps {
    propertyId: number;
  }

  interface PropertyLocationProps {
    propertyId: number;
  }

  interface ApplicationCardProps {
    application: Application;
    userType: "manager" | "renter";
    children: React.ReactNode;
  }

  interface CardProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface CardCompactProps {
    property: Property;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
    showFavoriteButton?: boolean;
    propertyLink?: string;
  }

  interface HeaderProps {
    title: string;
    subtitle: string;
  }

  interface NavbarProps {
    isDashboard: boolean;
  }

  interface AppSidebarProps {
    userType: "manager" | "tenant";
  }

  interface SettingsFormProps {
    initialData: SettingsFormData;
    onSubmit: (data: SettingsFormData) => Promise<void>;
    userType: "manager" | "tenant";
  }

  interface User {
    cognitoInfo: AuthUser;
    userInfo: Tenant | Manager;
    userRole: JsonObject | JsonPrimitive | JsonArray;
  }
}

export {};
