import { FormState } from "@/types/formTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState : FormState = {
  userProfile: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
  },
  contactInfo: {
    phoneNumber: "",
    alternatePhoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
  },
  employmentInfo: {
    currentJobTitle: "",
    employmentStatus: "",
    companyName: "",
    yearsOfExperience: null,
    resume: null,
  },
  financialInfo: {
    monthlyIncome: null,
    loanStatus: "",
    loanAmount: 0,
    creditScore: null,
  },
  preferences: {
    preferredContactMode: "",
    hobbies: [],
    newsletter: false,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    updateContactInfo: (state, action) => {
      state.contactInfo = action.payload;
    },
    updateEmploymentInfo: (state, action) => {
      state.employmentInfo = action.payload;
    },
    updateFinancialInfo: (state, action) => {
      state.financialInfo = action.payload;
    },
    updatePreferences: (state, action) => {
      state.preferences = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  updateUserProfile,
  updateContactInfo,
  updateEmploymentInfo,
  updateFinancialInfo,
  updatePreferences,
  resetForm,
} = formSlice.actions;
export default formSlice.reducer;
