export type NavTab = 'inicio' | 'viajes' | 'vuelos' | 'golf' | 'pasajeros' | 'invitados' | 'mapa' | 'concierge' | 'perfil';

export interface UserProfile {
  name: string;
  vipStatus: string;
  email: string;
  avatarUrl: string;
  passportExp: string;
  visas: string[];
  credentialStatus: string;
  preferredSeat: string;
  favoriteAirlines: string[];
  hotelChains: string[];
  dietaryRequirements: string;
  emergencyContactsCount: number;
  locationSharingActive: boolean;
  flightAlerts: boolean;
  globalSecurityAlerts: boolean;
  promotions: boolean;
}

export interface FlightInfo {
  flightNumber: string;
  seat: string;
  classType: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  remainingTime: string;
  status: 'En Vuelo' | 'A tiempo' | 'Demorado';
  gate: string;
  securityNote: string;
  gateChangeNote?: string;
  aircraftType?: string;
  airline?: string;
  priceUsd?: number;
  duffelOfferId?: string;
  altitudeFt?: number;
  speedKmh?: number;
}

export interface DuffelOffer {
  id: string;
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  aircraft: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  priceUsd: number;
  classType: 'First Class' | 'Business' | 'VIP Private Jet FBO';
  baggageIncluded: string;
  loungeAccess: boolean;
  helipadTransferAvailable: boolean;
  securityStatus: string;
}

export interface GolfCourseItem {
  id: string;
  name: string;
  destinationCity: string;
  destinationCode: string;
  rating: number;
  holes: number;
  par: number;
  yardage: number;
  slopeRating: string;
  distanceFromCity: string;
  greenFeeUsd: number;
  helipadAccess: boolean;
  securityRating: string;
  imageUrl: string;
  description: string;
  handicapLimit: number;
  caddieAvailable: boolean;
  dressCode: string;
}

export interface PassengerDoc {
  id: string;
  name: string;
  role: string;
  passportNumber: string;
  passportCountry: string;
  passportExpDate: string;
  daysToPassportExp: number;
  visaType: string;
  visaStatus: 'Válida' | 'En trámite' | 'Vencida';
  estaOrSchengenStatus: 'Aprobado' | 'No Requerido' | 'Pendiente';
  biometricClearance: 'Aprobado AeroGuard' | 'Pendiente';
  dietaryOrMedical: string;
  overallStatus: 'Completo' | 'Atención Requerida' | 'Pendiente FBO';
  isFamilyRbs?: boolean;
  familyRelationship?: 'Principal (RBS)' | 'Esposa de RBS' | 'Hijo(a) de RBS' | 'Familiar Directo RBS';
  isGuest?: boolean;
  guestCategory?: 'Socio Comercial' | 'Consultor Especial' | 'Acompañante Delegación' | 'Inversionista VIP';
  invitedBy?: string;
  sourceSheetUrl?: string;
  lastSyncedFromSheets?: string;
}

export interface ItineraryItem {
  id: string;
  day: string;
  time: string;
  title: string;
  subtitle: string;
  status: 'Seguro' | 'Precaución Zonal' | 'Monitoreado';
  type: 'flight' | 'shuttle' | 'hotel' | 'meeting' | 'dinner' | 'golf' | 'custom';
  icon: string;
  completed?: boolean;
}

export interface HotelItem {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  distance: string;
  status: 'Zona segura' | 'Recomendado VIP';
  imageUrl: string;
  description: string;
}

export interface RestaurantItem {
  id: string;
  name: string;
  distance: string;
  priceRange: string;
  badge: string;
  badgeType: 'michelin' | 'star';
  description: string;
  imageUrl: string;
  privacyLevel: string;
}

export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
  richCard?: {
    type: 'reservation' | 'route-change';
    title: string;
    subtitle: string;
    timeOrDetails: string;
    imageUrl?: string;
    statusBadge?: string;
    routeInfo?: {
      original: string;
      newRoute: string;
    };
  };
}
