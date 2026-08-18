export interface SavedAddress {
  id: number;
  label: string;
  recipientName: string;
  phone: string;
  /** FK to locations.id — the deepest selected location (upazila or subarea). */
  locationId: number;
  /** Resolved from location hierarchy — populated by the API, not stored as text. */
  division: string;
  district: string;
  /** Upazila name (resolved from hierarchy). */
  area: string;
  subarea: string;
  /** The upazila-level locations.id — used for tree pre-selection in the form. */
  upazilaId: number;
  /** The subarea-level locations.id, or null when no subarea is selected. */
  subareaId: number | null;
  addressLine: string;
  instructions: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddressFormValues {
  label: string;
  recipientName: string;
  phone: string;
  /** Deepest selected location ID (upazila or subarea). */
  locationId: number;
  addressLine: string;
  instructions?: string;
  isDefault?: boolean;
}

export interface AddressMetaResponse {
  divisions: string[];
  districts: string[];
  areas: string[];
}