// UserProfile Section
export interface UserProfile {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    dateOfBirth: string;
  }
  
  // ContactInfo Section
  export interface ContactInfo {
    phoneNumber: string;
    alternatePhoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  // EmploymentInfo Section
  export interface EmploymentInfo {
    currentJobTitle: string;
    employmentStatus: string;
    companyName: string;
    yearsOfExperience: number | null;
    resume: FileList | null;
  }
  
  // FinancialInfo Section
  export interface FinancialInfo {
    monthlyIncome: number | null;
    loanStatus: string;
    loanAmount: number | null ;
    creditScore: number | null;
  }
  
  // Preferences Section
  export interface Preferences {
    preferredContactMode: string;
    hobbies: string[];
    newsletter: boolean;
  }
  
  // Main State Interface
  export interface FormState {
    userProfile: UserProfile;
    contactInfo: ContactInfo;
    employmentInfo: EmploymentInfo;
    financialInfo: FinancialInfo;
    preferences: Preferences;
  }