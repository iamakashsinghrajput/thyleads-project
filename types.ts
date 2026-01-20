export interface Testimonial {
  id: string;
  companyName: string;
  logo: string; // Using text representation or URL for simplicity
  brandColor: string;
  quote: string;
  personName: string;
  personTitle: string;
  personImage: string;
}

export const SLIDE_DURATION = 5000; // 5 seconds per slide
