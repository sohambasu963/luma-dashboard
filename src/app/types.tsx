export interface UserEvents {
  query: string;
  calendars: any[];
  events: Event[];
  teams: any[];
}

export interface Event {
  event: EventData;
  cover_image: CoverImage;
  calendar: Calendar;
  start_at: string;
  hosts: Host[];
  guest_count: number;
  ticket_info: TicketInfo;
  featured_guests: any[];
  role: Role;
}

export interface EventData {
  api_id: string;
  calendar_api_id: string;
  can_register_for_multiple_tickets: boolean;
  cover_url: string;
  created_at: string;
  crypto_token_requirements: any[];
  duration_interval: string;
  end_at: string;
  eth_address_requirement: any;
  event_type: string;
  font_title: any;
  hide_rsvp: boolean;
  location_type: string;
  min_ticket_price_cents: number;
  name: string;
  one_to_one: boolean;
  phone_number_requirement: any;
  recurrence_id: any;
  registration_questions: RegistrationQuestion[];
  require_rsvp_approval: boolean;
  series_registration_mode: any;
  session_count_future: any;
  session_count_total: any;
  session_price_cents: any;
  show_guest_list: boolean;
  solana_address_requirement: any;
  start_at: string;
  theme: string;
  theme_meta: any;
  ticket_currency: string;
  ticket_price_cents: any;
  timezone: string;
  tint_color: any;
  url: string;
  user_api_id: string;
  visibility: string;
  waitlist_enabled: boolean;
  featured_user_ids: string[];
  ticket_info: TicketInfo;
  spots_remaining: number;
  virtual_info: VirtualInfo;
  geo_longitude: string;
  geo_latitude: string;
  geo_address_visibility: string;
  geo_address_info: GeoAddressInfo;
  is_capped: boolean;
}

export interface RegistrationQuestion {
  id: string;
  label: string;
  required: boolean;
  question_type: string;
  options?: string[];
}

export interface TicketInfo {
  require_approval: boolean;
}

export interface VirtualInfo {
  has_access: boolean;
  raw_join_url: any;
  zoom_id: any;
  password: any;
}

export interface GeoAddressInfo {
  city: string;
  type: string;
  region: string;
  address: string;
  country: string;
  place_id: string;
  city_state: string;
  description: string;
  full_address: string;
  mode: string;
}

export interface CoverImage {
  vibrant_color: any;
  colors: string[];
}

export interface Calendar {
  api_id: string;
  avatar_url: string;
  description_short?: string;
  instagram_handle?: string;
  is_personal: boolean;
  linkedin_handle: any;
  name: string;
  personal_user_api_id?: string;
  slug?: string;
  tiktok_handle: any;
  twitter_handle?: string;
  website?: string;
  youtube_handle?: string;
}

export interface Host {
  api_id: string;
  avatar_url: string;
  bio_short?: string;
  instagram_handle?: string;
  last_online_at?: string;
  linkedin_handle?: string;
  name: string;
  tiktok_handle: any;
  timezone: string;
  twitter_handle?: string;
  url?: string;
  username?: string;
  website?: string;
  youtube_handle?: string;
  event_api_id: string;
  access_level: string;
}

export interface Role {
  type: string;
  access_level: string;
  is_manager: boolean;
  num_guests_approved: number;
}
